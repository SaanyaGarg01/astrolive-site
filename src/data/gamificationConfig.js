/**
 * AstroLive — Gamification Configuration
 * Centralized definitions for karma, streaks, badges, and leaderboard.
 * All rules are configurable from admin panel.
 */

// ─── Karma Earning Rules ────────────────────────────────────────
export const KARMA_ACTIONS = {
  DAILY_CHECK_IN: {
    id: 'daily_check_in',
    label: 'Daily Check-In',
    icon: '☀️',
    basePoints: 10,
    description: 'Check in daily to earn karma',
    cooldown: 'daily',
    maxPerDay: 1
  },
  COMPLETE_PROFILE: {
    id: 'complete_profile',
    label: 'Complete Profile',
    icon: '👤',
    basePoints: 50,
    description: 'Fill out all profile fields',
    cooldown: 'once',
    maxPerDay: 1
  },
  PREDICTION_FEEDBACK: {
    id: 'prediction_feedback',
    label: 'Prediction Feedback',
    icon: '🔮',
    basePoints: 15,
    description: 'Submit outcome for a prediction',
    cooldown: 'none',
    maxPerDay: 10
  },
  BOOK_CONSULTATION: {
    id: 'book_consultation',
    label: 'Book Consultation',
    icon: '📞',
    basePoints: 25,
    description: 'Complete an astrologer consultation',
    cooldown: 'none',
    maxPerDay: 5
  },
  ADD_LIFE_EVENT: {
    id: 'add_life_event',
    label: 'Add Life Event',
    icon: '📝',
    basePoints: 10,
    description: 'Record a life event in journal',
    cooldown: 'none',
    maxPerDay: 5
  },
  STREAK_BONUS_7: {
    id: 'streak_bonus_7',
    label: '7-Day Streak Bonus',
    icon: '🔥',
    basePoints: 50,
    description: 'Maintained 7-day streak',
    cooldown: 'weekly',
    maxPerDay: 1
  },
  STREAK_BONUS_30: {
    id: 'streak_bonus_30',
    label: '30-Day Streak Bonus',
    icon: '💎',
    basePoints: 200,
    description: 'Maintained 30-day streak',
    cooldown: 'monthly',
    maxPerDay: 1
  },
  SHARE_PREDICTION: {
    id: 'share_prediction',
    label: 'Share Prediction',
    icon: '📤',
    basePoints: 5,
    description: 'Share a prediction card',
    cooldown: 'none',
    maxPerDay: 3
  },
  GUARD_EVENT_ADDED: {
    id: 'guard_event_added',
    label: 'Add Guard Event',
    icon: '🛡️',
    basePoints: 10,
    description: 'Register an event in Astro Guard',
    cooldown: 'none',
    maxPerDay: 5
  },
  SPIN_WHEEL: {
    id: 'spin_wheel',
    label: 'Spin the Wheel',
    icon: '🎡',
    basePoints: 5,
    description: 'Spin the daily reward wheel',
    cooldown: 'daily',
    maxPerDay: 1
  }
};

// ─── Streak Configuration ───────────────────────────────────────
export const STREAK_CONFIG = {
  graceHours: 36, // Hours before streak resets (allows for timezone flexibility)
  milestones: [
    { days: 3, reward: 25, badge: 'streak_3', label: '3-Day Flame', emoji: '🔥' },
    { days: 7, reward: 50, badge: 'streak_7', label: '7-Day Blaze', emoji: '🌟' },
    { days: 14, reward: 100, badge: 'streak_14', label: '14-Day Fire', emoji: '💫' },
    { days: 30, reward: 200, badge: 'streak_30', label: '30-Day Inferno', emoji: '💎' },
    { days: 60, reward: 500, badge: 'streak_60', label: '60-Day Legend', emoji: '👑' },
    { days: 100, reward: 1000, badge: 'streak_100', label: '100-Day Cosmic Master', emoji: '🏆' }
  ],
  resetPolicy: 'reset_to_zero' // 'reset_to_zero' | 'reduce_by_half' | 'shield_available'
};

// ─── Badge Registry ─────────────────────────────────────────────
export const BADGE_CATEGORIES = {
  ENGAGEMENT: 'Engagement',
  STREAKS: 'Streaks',
  ASTRO_PROOF: 'AstroProof',
  PATTERNS: 'Patterns',
  CONSULTATIONS: 'Consultations',
  SPECIAL: 'Special'
};

export const BADGE_REGISTRY = [
  // Engagement Badges
  {
    id: 'first_check_in',
    name: 'First Check-In',
    icon: '☀️',
    description: 'Completed your first daily check-in',
    category: BADGE_CATEGORIES.ENGAGEMENT,
    condition: { type: 'total_check_ins', threshold: 1 },
    rarity: 'common'
  },
  {
    id: 'dedicated_explorer',
    name: 'Dedicated Explorer',
    icon: '🧭',
    description: 'Checked in 10 times',
    category: BADGE_CATEGORIES.ENGAGEMENT,
    condition: { type: 'total_check_ins', threshold: 10 },
    rarity: 'common'
  },
  {
    id: 'cosmic_regular',
    name: 'Cosmic Regular',
    icon: '🌀',
    description: 'Checked in 50 times',
    category: BADGE_CATEGORIES.ENGAGEMENT,
    condition: { type: 'total_check_ins', threshold: 50 },
    rarity: 'rare'
  },
  {
    id: 'celestial_devotee',
    name: 'Celestial Devotee',
    icon: '⭐',
    description: 'Checked in 100 times',
    category: BADGE_CATEGORIES.ENGAGEMENT,
    condition: { type: 'total_check_ins', threshold: 100 },
    rarity: 'epic'
  },

  // Streak Badges
  {
    id: 'streak_3',
    name: '3-Day Flame',
    icon: '🔥',
    description: 'Maintained a 3-day check-in streak',
    category: BADGE_CATEGORIES.STREAKS,
    condition: { type: 'current_streak', threshold: 3 },
    rarity: 'common'
  },
  {
    id: 'streak_7',
    name: '7-Day Blaze',
    icon: '🌟',
    description: 'Maintained a 7-day check-in streak',
    category: BADGE_CATEGORIES.STREAKS,
    condition: { type: 'current_streak', threshold: 7 },
    rarity: 'uncommon'
  },
  {
    id: 'streak_14',
    name: '14-Day Fire',
    icon: '💫',
    description: 'Maintained a 14-day check-in streak',
    category: BADGE_CATEGORIES.STREAKS,
    condition: { type: 'current_streak', threshold: 14 },
    rarity: 'rare'
  },
  {
    id: 'streak_30',
    name: '30-Day Inferno',
    icon: '💎',
    description: 'Maintained a 30-day check-in streak',
    category: BADGE_CATEGORIES.STREAKS,
    condition: { type: 'current_streak', threshold: 30 },
    rarity: 'epic'
  },
  {
    id: 'streak_60',
    name: '60-Day Legend',
    icon: '👑',
    description: 'Maintained a 60-day check-in streak',
    category: BADGE_CATEGORIES.STREAKS,
    condition: { type: 'current_streak', threshold: 60 },
    rarity: 'legendary'
  },

  // AstroProof Badges
  {
    id: 'first_prediction',
    name: 'Prediction Pioneer',
    icon: '🔮',
    description: 'Logged your first AstroProof prediction',
    category: BADGE_CATEGORIES.ASTRO_PROOF,
    condition: { type: 'predictions_created', threshold: 1 },
    rarity: 'common'
  },
  {
    id: 'ten_predictions',
    name: 'Prediction Tracker',
    icon: '⭐',
    description: 'Recorded 10 AstroProof predictions',
    category: BADGE_CATEGORIES.ASTRO_PROOF,
    condition: { type: 'predictions_created', threshold: 10 },
    rarity: 'uncommon'
  },
  {
    id: 'outcome_reporter',
    name: 'Outcome Reporter',
    icon: '📊',
    description: 'Submitted outcomes for 5+ predictions',
    category: BADGE_CATEGORIES.ASTRO_PROOF,
    condition: { type: 'outcomes_submitted', threshold: 5 },
    rarity: 'uncommon'
  },
  {
    id: 'fifty_predictions',
    name: 'Prediction Master',
    icon: '🏆',
    description: 'Recorded 50 AstroProof predictions',
    category: BADGE_CATEGORIES.ASTRO_PROOF,
    condition: { type: 'predictions_created', threshold: 50 },
    rarity: 'epic'
  },
  {
    id: 'astroproof_explorer',
    name: 'AstroProof Explorer',
    icon: '🌟',
    description: 'Completed the full AstroProof flow end-to-end',
    category: BADGE_CATEGORIES.ASTRO_PROOF,
    condition: { type: 'full_flow_completed', threshold: 1 },
    rarity: 'rare'
  },

  // Patterns Badges
  {
    id: 'journal_starter',
    name: 'Journal Starter',
    icon: '📝',
    description: 'Added your first life event to the journal',
    category: BADGE_CATEGORIES.PATTERNS,
    condition: { type: 'life_events_created', threshold: 1 },
    rarity: 'common'
  },
  {
    id: 'pattern_seeker',
    name: 'Pattern Seeker',
    icon: '🧬',
    description: 'Ran the pattern analysis engine',
    category: BADGE_CATEGORIES.PATTERNS,
    condition: { type: 'pattern_analyses', threshold: 1 },
    rarity: 'common'
  },
  {
    id: 'consistent_logger',
    name: 'Consistent Logger',
    icon: '📚',
    description: 'Recorded 10 life events',
    category: BADGE_CATEGORIES.PATTERNS,
    condition: { type: 'life_events_created', threshold: 10 },
    rarity: 'uncommon'
  },

  // Consultation Badges
  {
    id: 'first_consultation',
    name: 'First Consultation',
    icon: '📞',
    description: 'Completed your first astrologer consultation',
    category: BADGE_CATEGORIES.CONSULTATIONS,
    condition: { type: 'consultations_completed', threshold: 1 },
    rarity: 'common'
  },
  {
    id: 'regular_seeker',
    name: 'Regular Seeker',
    icon: '🌙',
    description: 'Completed 5 consultations',
    category: BADGE_CATEGORIES.CONSULTATIONS,
    condition: { type: 'consultations_completed', threshold: 5 },
    rarity: 'uncommon'
  },

  // Special Badges
  {
    id: 'early_adopter',
    name: 'Early Adopter',
    icon: '🚀',
    description: 'Joined AstroLive during the early access period',
    category: BADGE_CATEGORIES.SPECIAL,
    condition: { type: 'manual', threshold: 0 },
    rarity: 'legendary'
  },
  {
    id: 'subscriber',
    name: 'Cosmic Subscriber',
    icon: '✨',
    description: 'Activated a Plus or Premium subscription',
    category: BADGE_CATEGORIES.SPECIAL,
    condition: { type: 'subscription_activated', threshold: 1 },
    rarity: 'rare'
  }
];

// ─── Leaderboard Configuration ──────────────────────────────────
export const LEADERBOARD_CONFIG = {
  periods: ['weekly', 'monthly', 'allTime'],
  maxDisplayed: 10,
  anonymizeAfterRank: 3, // Show full name for top 3, anonymize rest
  privacyMode: true // Only show first name + last initial
};

// ─── Karma Redemption Rules ─────────────────────────────────────
export const KARMA_REDEMPTION = [
  {
    id: 'redeem_consultation_discount',
    name: '₹50 Consultation Discount',
    icon: '📞',
    cost: 200,
    type: 'discount',
    value: 50,
    description: '₹50 off your next consultation'
  },
  {
    id: 'redeem_ai_insight',
    name: 'Free AI Insight',
    icon: '🤖',
    cost: 100,
    type: 'feature_unlock',
    value: 'ai_insight',
    description: 'Unlock one premium AI insight'
  },
  {
    id: 'redeem_priority_queue',
    name: 'Priority Queue Pass',
    icon: '⚡',
    cost: 150,
    type: 'feature_unlock',
    value: 'priority_queue',
    description: 'Skip the queue for 1 consultation'
  }
];

// ─── Helper Functions ───────────────────────────────────────────
export function getBadge(badgeId) {
  return BADGE_REGISTRY.find(b => b.id === badgeId) || null;
}

export function getBadgesByCategory(category) {
  return BADGE_REGISTRY.filter(b => b.category === category);
}

export function getStreakMilestone(days) {
  return STREAK_CONFIG.milestones.find(m => m.days === days) || null;
}

export function getNextStreakMilestone(currentStreak) {
  return STREAK_CONFIG.milestones.find(m => m.days > currentStreak) || null;
}

export function getKarmaForAction(actionId, multiplier = 1) {
  const action = KARMA_ACTIONS[actionId];
  if (!action) return 0;
  return Math.floor(action.basePoints * multiplier);
}

export function getRarityColor(rarity) {
  switch (rarity) {
    case 'common': return { bg: 'bg-slate-500/20', text: 'text-slate-300', border: 'border-slate-500/30' };
    case 'uncommon': return { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/30' };
    case 'rare': return { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/30' };
    case 'epic': return { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/30' };
    case 'legendary': return { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/30' };
    default: return { bg: 'bg-slate-500/20', text: 'text-slate-300', border: 'border-slate-500/30' };
  }
}
