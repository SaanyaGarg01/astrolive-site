import { Router } from 'express';
import { db } from '../data/store.js';
import { requireAuth } from '../middleware/auth.js';
import { KARMA_ACTIONS, STREAK_CONFIG, BADGE_REGISTRY, getKarmaForAction } from '../../src/data/gamificationConfig.js';

const router = Router();

// POST /api/gamification/check-in — Perform daily check-in
router.post('/check-in', requireAuth, (req, res) => {
  const user = req.user;
  const today = new Date().toISOString().split('T')[0];

  if (user.lastCheckInDate === today) {
    return res.status(400).json({ error: 'Already checked in today' });
  }

  let newStreak = 1;
  if (user.lastCheckInDate) {
    const gap = Math.floor((new Date(today) - new Date(user.lastCheckInDate)) / 86400000);
    if (gap === 1) newStreak = (user.streakDays || 0) + 1;
  }

  const multiplier = user.membership === 'PREMIUM' ? 3 : user.membership === 'PLUS' ? 2 : 1;
  const karmaEarned = getKarmaForAction('DAILY_CHECK_IN', multiplier);

  // Check for streak milestone reward
  const milestone = STREAK_CONFIG.milestones.find(m => m.days === newStreak);
  const bonusKarma = milestone ? milestone.reward : 0;
  const totalKarma = karmaEarned + bonusKarma;

  const updatedUser = db.update('users', u => u.id === user.id, u => ({
    ...u,
    streakDays: newStreak,
    lastCheckInDate: today,
    karmaBalance: (u.karmaBalance || 0) + totalKarma
  }));

  res.json({
    success: true,
    streak: newStreak,
    karmaEarned: totalKarma,
    baseKarma: karmaEarned,
    bonusKarma,
    milestoneReached: milestone || null,
    user: updatedUser
  });
});

// GET /api/gamification/me — Get user stats & transactions
router.get('/me', requireAuth, (req, res) => {
  res.json({
    streakDays: req.user.streakDays || 0,
    karmaBalance: req.user.karmaBalance || 0,
    lastCheckInDate: req.user.lastCheckInDate || null
  });
});

// GET /api/gamification/badges — Get registry & user earned badges
router.get('/badges', requireAuth, (req, res) => {
  res.json({
    badges: BADGE_REGISTRY,
    earnedBadges: ['first_check_in', 'streak_3', 'streak_7', 'early_adopter', 'subscriber']
  });
});

// GET /api/gamification/leaderboard — Leaderboard top ranks
router.get('/leaderboard', (req, res) => {
  const leaderboard = [
    { rank: 1, name: 'Arjun M.', karma: 4250, streak: 42, avatar: '🧑‍💻' },
    { rank: 2, name: 'Priya S.', karma: 3890, streak: 38, avatar: '👩‍🔬' },
    { rank: 3, name: 'Raj K.', karma: 3670, streak: 35, avatar: '👨‍💼' },
    { rank: 4, name: 'Ananya R.', karma: 3210, streak: 29, avatar: '👩‍🎨' },
    { rank: 5, name: 'Vikram T.', karma: 2980, streak: 27, avatar: '🧑‍<ctrl42>' }
  ];
  res.json({ leaderboard });
});

export default router;
