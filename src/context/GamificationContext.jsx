import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  KARMA_ACTIONS,
  STREAK_CONFIG,
  BADGE_REGISTRY,
  getKarmaForAction,
  getNextStreakMilestone
} from '../data/gamificationConfig.js';

const GamificationContext = createContext(null);

// ─── localStorage Keys ──────────────────────────────────────────
const STORAGE_KEYS = {
  CHECK_IN: 'astrolive_checkin',
  KARMA: 'astrolive_karma',
  BADGES: 'astrolive_badges',
  LEADERBOARD: 'astrolive_leaderboard'
};

// ─── Date Helpers ───────────────────────────────────────────────
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function daysBetween(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* quota exceeded — fail silently */ }
}

// ─── Default State ──────────────────────────────────────────────
const DEFAULT_CHECKIN = {
  lastCheckInDate: null,
  currentStreak: 0,
  longestStreak: 0,
  totalCheckIns: 0,
  checkInHistory: [] // [{date, karmaEarned}]
};

const DEFAULT_KARMA = {
  balance: 450, // Match existing astroCoins
  totalEarned: 450,
  totalSpent: 0,
  transactions: [] // [{id, action, points, multiplier, timestamp, description}]
};

// ─── Mock Leaderboard ───────────────────────────────────────────
const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Arjun M.', karma: 4250, streak: 42, avatar: '🧑‍💻' },
  { rank: 2, name: 'Priya S.', karma: 3890, streak: 38, avatar: '👩‍🔬' },
  { rank: 3, name: 'Raj K.', karma: 3670, streak: 35, avatar: '👨‍💼' },
  { rank: 4, name: 'Ananya R.', karma: 3210, streak: 29, avatar: '👩‍🎨' },
  { rank: 5, name: 'Vikram T.', karma: 2980, streak: 27, avatar: '🧑‍🏫' },
  { rank: 6, name: 'Meera J.', karma: 2650, streak: 24, avatar: '👩‍⚕️' },
  { rank: 7, name: 'Suresh V.', karma: 2340, streak: 21, avatar: '👨‍🔧' },
  { rank: 8, name: 'Kavita P.', karma: 2100, streak: 18, avatar: '👩‍💻' },
  { rank: 9, name: 'Deepak N.', karma: 1890, streak: 15, avatar: '🧑‍🎓' },
  { rank: 10, name: 'Lakshmi B.', karma: 1670, streak: 12, avatar: '👩‍🏫' }
];

// ─── Provider ───────────────────────────────────────────────────
export function GamificationProvider({ children }) {
  const [checkInState, setCheckInState] = useState(() =>
    loadJSON(STORAGE_KEYS.CHECK_IN, { ...DEFAULT_CHECKIN, currentStreak: 7, totalCheckIns: 7, longestStreak: 7 })
  );

  const [karmaState, setKarmaState] = useState(() =>
    loadJSON(STORAGE_KEYS.KARMA, DEFAULT_KARMA)
  );

  const [earnedBadges, setEarnedBadges] = useState(() =>
    loadJSON(STORAGE_KEYS.BADGES, ['first_check_in', 'streak_3', 'streak_7', 'early_adopter', 'subscriber'])
  );

  const [leaderboard] = useState(MOCK_LEADERBOARD);

  // Persist on change
  useEffect(() => { saveJSON(STORAGE_KEYS.CHECK_IN, checkInState); }, [checkInState]);
  useEffect(() => { saveJSON(STORAGE_KEYS.KARMA, karmaState); }, [karmaState]);
  useEffect(() => { saveJSON(STORAGE_KEYS.BADGES, earnedBadges); }, [earnedBadges]);

  // ── Check if already checked in today ─────────────────────────
  const hasCheckedInToday = checkInState.lastCheckInDate === todayStr();

  // ── Perform Daily Check-In ────────────────────────────────────
  const performCheckIn = useCallback((karmaMultiplier = 1) => {
    if (hasCheckedInToday) return { success: false, reason: 'already_checked_in' };

    const today = todayStr();
    const lastDate = checkInState.lastCheckInDate;

    let newStreak = 1;
    if (lastDate) {
      const gap = daysBetween(lastDate, today);
      if (gap === 1) {
        newStreak = checkInState.currentStreak + 1;
      } else if (gap === 0) {
        return { success: false, reason: 'already_checked_in' };
      }
      // gap > 1 → streak resets to 1
    }

    const newLongest = Math.max(newStreak, checkInState.longestStreak);
    const baseKarma = getKarmaForAction('DAILY_CHECK_IN', karmaMultiplier);

    // Check for streak milestone bonus
    let bonusKarma = 0;
    let milestoneReached = null;
    const milestone = STREAK_CONFIG.milestones.find(m => m.days === newStreak);
    if (milestone) {
      bonusKarma = milestone.reward;
      milestoneReached = milestone;
    }

    const totalKarmaEarned = baseKarma + bonusKarma;

    setCheckInState(prev => ({
      lastCheckInDate: today,
      currentStreak: newStreak,
      longestStreak: newLongest,
      totalCheckIns: prev.totalCheckIns + 1,
      checkInHistory: [
        { date: today, karmaEarned: totalKarmaEarned },
        ...prev.checkInHistory.slice(0, 89) // keep last 90 days
      ]
    }));

    // Add karma
    const txns = [
      {
        id: `tx-${Date.now()}`,
        action: 'daily_check_in',
        points: baseKarma,
        multiplier: karmaMultiplier,
        timestamp: new Date().toISOString(),
        description: `Daily check-in (Day ${newStreak})`
      }
    ];

    if (bonusKarma > 0) {
      txns.push({
        id: `tx-${Date.now()}-bonus`,
        action: `streak_bonus_${newStreak}`,
        points: bonusKarma,
        multiplier: 1,
        timestamp: new Date().toISOString(),
        description: `🎉 ${milestone.label} streak bonus!`
      });
    }

    setKarmaState(prev => ({
      balance: prev.balance + totalKarmaEarned,
      totalEarned: prev.totalEarned + totalKarmaEarned,
      totalSpent: prev.totalSpent,
      transactions: [...txns, ...prev.transactions].slice(0, 200)
    }));

    // Check for new badges
    checkAndAwardBadges({
      totalCheckIns: checkInState.totalCheckIns + 1,
      currentStreak: newStreak
    });

    return {
      success: true,
      streak: newStreak,
      karmaEarned: totalKarmaEarned,
      milestoneReached,
      newLongestStreak: newStreak > checkInState.longestStreak
    };
  }, [hasCheckedInToday, checkInState]);

  // ── Earn Karma (generic) ──────────────────────────────────────
  const earnKarma = useCallback((actionKey, multiplier = 1, customDescription) => {
    const action = KARMA_ACTIONS[actionKey];
    if (!action) return 0;

    const points = getKarmaForAction(actionKey, multiplier);

    const txn = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      action: action.id,
      points,
      multiplier,
      timestamp: new Date().toISOString(),
      description: customDescription || action.label
    };

    setKarmaState(prev => ({
      balance: prev.balance + points,
      totalEarned: prev.totalEarned + points,
      totalSpent: prev.totalSpent,
      transactions: [txn, ...prev.transactions].slice(0, 200)
    }));

    return points;
  }, []);

  // ── Spend Karma ───────────────────────────────────────────────
  const spendKarma = useCallback((amount, description) => {
    if (karmaState.balance < amount) return false;

    const txn = {
      id: `tx-${Date.now()}-spend`,
      action: 'redemption',
      points: -amount,
      multiplier: 1,
      timestamp: new Date().toISOString(),
      description: description || 'Karma redeemed'
    };

    setKarmaState(prev => ({
      balance: prev.balance - amount,
      totalEarned: prev.totalEarned,
      totalSpent: prev.totalSpent + amount,
      transactions: [txn, ...prev.transactions].slice(0, 200)
    }));

    return true;
  }, [karmaState.balance]);

  // ── Badge Checking ────────────────────────────────────────────
  const checkAndAwardBadges = useCallback((stats = {}) => {
    const newBadges = [];

    BADGE_REGISTRY.forEach(badge => {
      if (earnedBadges.includes(badge.id)) return;
      if (badge.condition.type === 'manual') return;

      let earned = false;
      switch (badge.condition.type) {
        case 'total_check_ins':
          earned = (stats.totalCheckIns || checkInState.totalCheckIns) >= badge.condition.threshold;
          break;
        case 'current_streak':
          earned = (stats.currentStreak || checkInState.currentStreak) >= badge.condition.threshold;
          break;
        case 'predictions_created':
          earned = (stats.predictionsCreated || 0) >= badge.condition.threshold;
          break;
        case 'outcomes_submitted':
          earned = (stats.outcomesSubmitted || 0) >= badge.condition.threshold;
          break;
        case 'life_events_created':
          earned = (stats.lifeEventsCreated || 0) >= badge.condition.threshold;
          break;
        case 'consultations_completed':
          earned = (stats.consultationsCompleted || 0) >= badge.condition.threshold;
          break;
        case 'subscription_activated':
          earned = (stats.subscriptionActivated || false);
          break;
        default:
          break;
      }

      if (earned) newBadges.push(badge.id);
    });

    if (newBadges.length > 0) {
      setEarnedBadges(prev => [...new Set([...prev, ...newBadges])]);
    }

    return newBadges;
  }, [earnedBadges, checkInState]);

  // ── Award Badge Manually ──────────────────────────────────────
  const awardBadge = useCallback((badgeId) => {
    if (!earnedBadges.includes(badgeId)) {
      setEarnedBadges(prev => [...prev, badgeId]);
      return true;
    }
    return false;
  }, [earnedBadges]);

  // ── Get Badge Progress ────────────────────────────────────────
  const getBadgeProgress = useCallback((badge, stats = {}) => {
    switch (badge.condition.type) {
      case 'total_check_ins':
        return { current: stats.totalCheckIns || checkInState.totalCheckIns, target: badge.condition.threshold };
      case 'current_streak':
        return { current: stats.currentStreak || checkInState.currentStreak, target: badge.condition.threshold };
      default:
        return { current: 0, target: badge.condition.threshold };
    }
  }, [checkInState]);

  const nextMilestone = getNextStreakMilestone(checkInState.currentStreak);

  return (
    <GamificationContext.Provider value={{
      // Check-in
      checkInState,
      hasCheckedInToday,
      performCheckIn,

      // Karma
      karmaBalance: karmaState.balance,
      karmaTransactions: karmaState.transactions,
      totalKarmaEarned: karmaState.totalEarned,
      earnKarma,
      spendKarma,

      // Badges
      earnedBadges,
      checkAndAwardBadges,
      awardBadge,
      getBadgeProgress,
      allBadges: BADGE_REGISTRY,

      // Streaks
      currentStreak: checkInState.currentStreak,
      longestStreak: checkInState.longestStreak,
      totalCheckIns: checkInState.totalCheckIns,
      nextMilestone,

      // Leaderboard
      leaderboard
    }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
