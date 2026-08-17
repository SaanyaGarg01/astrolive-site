/**
 * AstroLive — Centralized Subscription Configuration
 * All plan definitions, pricing, benefits, and feature flags are driven from here.
 * Admin panel can modify these values without touching UI components.
 */

// ─── Plan Status ────────────────────────────────────────────────
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  TRIAL: 'TRIAL',
  NONE: 'NONE'
};

// ─── Plan IDs ───────────────────────────────────────────────────
export const PLAN_IDS = {
  FREE: 'free',
  PLUS: 'plus',
  PREMIUM: 'premium'
};

// ─── Subscription Plans ─────────────────────────────────────────
export const SUBSCRIPTION_PLANS = {
  [PLAN_IDS.FREE]: {
    id: PLAN_IDS.FREE,
    name: 'FREE',
    displayName: 'AstroLive Free',
    icon: '🌙',
    description: 'Basic cosmic exploration for casual updates.',
    pricing: {
      monthly: 0,
      yearly: 0,
      effectiveMonthly: 0,
      yearlySavings: 0,
      currency: '₹'
    },
    badge: null,
    badgeColor: null,
    accentColor: 'slate',
    benefits: {
      dailyHoroscope: true,
      aiInsightsPerMonth: 1,
      journeyEventsLimit: 3,
      personalPatterns: false,
      astroProof: false,
      astroGuard: false,
      dailyKarmaReward: 5,
      karmaMultiplier: 1,
      consultationDiscountPercent: 0,
      consultationCredits: 0,
      priorityMatching: false,
      premiumReports: false,
      eventReminders: false,
      exclusiveInsights: false,
      vipSupport: false
    },
    featureList: [
      'Daily horoscope',
      'Basic Astro Journey',
      'Limited AI insights (1/month)',
      'Basic astrologer discovery',
      'Daily check-in',
      'Basic rewards (5 Karma/day)'
    ],
    buttonText: 'Current Plan',
    isDefault: true
  },

  [PLAN_IDS.PLUS]: {
    id: PLAN_IDS.PLUS,
    name: 'PLUS',
    displayName: 'AstroLive Plus',
    icon: '✨',
    description: 'Personalized growth engine for active life planning.',
    pricing: {
      monthly: 199,
      yearly: 1999,
      effectiveMonthly: 167,
      yearlySavings: 389,
      currency: '₹'
    },
    badge: 'MOST POPULAR',
    badgeColor: 'amber',
    accentColor: 'amber',
    benefits: {
      dailyHoroscope: true,
      aiInsightsPerMonth: -1, // unlimited
      journeyEventsLimit: -1,
      personalPatterns: true,
      astroProof: true,
      astroGuard: true,
      dailyKarmaReward: 10,
      karmaMultiplier: 2,
      consultationDiscountPercent: 10,
      consultationCredits: 100,
      priorityMatching: true,
      premiumReports: false,
      eventReminders: true,
      exclusiveInsights: false,
      vipSupport: false
    },
    featureList: [
      'Everything in Free',
      'More personalized AI insights',
      'Advanced Astro Journey',
      'Personal pattern tracking',
      'Prediction tracking',
      'Consultation discounts (10% off)',
      'Priority astrologer matching',
      'Personalized event reminders',
      'Additional Karma (10/day)'
    ],
    buttonText: 'Upgrade to Plus'
  },

  [PLAN_IDS.PREMIUM]: {
    id: PLAN_IDS.PREMIUM,
    name: 'PREMIUM',
    displayName: 'AstroLive Premium',
    icon: '👑',
    description: 'Complete celestial companion with monthly consultation credits.',
    pricing: {
      monthly: 399,
      yearly: 3999,
      effectiveMonthly: 333,
      yearlySavings: 789,
      currency: '₹'
    },
    badge: 'BEST VALUE',
    badgeColor: 'purple',
    accentColor: 'purple',
    benefits: {
      dailyHoroscope: true,
      aiInsightsPerMonth: -1,
      journeyEventsLimit: -1,
      personalPatterns: true,
      astroProof: true,
      astroGuard: true,
      dailyKarmaReward: 15,
      karmaMultiplier: 3,
      consultationDiscountPercent: 20,
      consultationCredits: 250,
      priorityMatching: true,
      premiumReports: true,
      eventReminders: true,
      exclusiveInsights: true,
      vipSupport: true
    },
    featureList: [
      'Everything in Plus',
      'Premium astrology reports',
      'Higher consultation credits (₹250/month)',
      'Advanced personal patterns',
      'Priority support',
      'Premium astrologer matching',
      'Exclusive insights',
      'Increased Karma (15/day)'
    ],
    buttonText: 'Choose Premium'
  }
};

// ─── Feature Comparison Table ───────────────────────────────────
export const PLAN_COMPARISON = [
  { feature: 'Daily Horoscope', free: true, plus: true, premium: true },
  { feature: 'AI Insights', free: '1/month', plus: 'Unlimited', premium: 'Unlimited + Exclusive' },
  { feature: 'Astro Journey', free: 'Basic (3 events)', plus: 'Full timeline', premium: 'Full timeline' },
  { feature: 'Personal Pattern Engine', free: false, plus: true, premium: 'Advanced' },
  { feature: 'AstroProof (Prediction Tracking)', free: false, plus: true, premium: true },
  { feature: 'Astro Guard', free: false, plus: true, premium: true },
  { feature: 'Daily Karma Rewards', free: '5 Karma', plus: '10 Karma', premium: '15 Karma' },
  { feature: 'Karma Multiplier', free: '1x', plus: '2x', premium: '3x' },
  { feature: 'Consultation Discounts', free: false, plus: '10% off', premium: '20% off' },
  { feature: 'Priority Astrologer Matching', free: false, plus: true, premium: 'VIP Priority' },
  { feature: 'Premium Reports', free: false, plus: false, premium: true },
  { feature: 'Event Reminders', free: false, plus: true, premium: true }
];

// ─── Helper Functions ───────────────────────────────────────────
export function getPlan(planId) {
  return SUBSCRIPTION_PLANS[planId] || SUBSCRIPTION_PLANS[PLAN_IDS.FREE];
}

export function getPlanBenefits(planId) {
  return getPlan(planId).benefits;
}

export function getConsultationCredits(planId) {
  return getPlan(planId).benefits.consultationCredits;
}

export function getConsultationDiscount(planId) {
  return getPlan(planId).benefits.consultationDiscountPercent;
}

export function getDailyKarmaReward(planId) {
  return getPlan(planId).benefits.dailyKarmaReward;
}

export function getKarmaMultiplier(planId) {
  return getPlan(planId).benefits.karmaMultiplier;
}

export function hasFeature(planId, featureKey) {
  const benefits = getPlanBenefits(planId);
  return !!benefits[featureKey];
}

export function formatPrice(amount, currency = '₹') {
  if (amount === 0) return `${currency}0`;
  return `${currency}${amount.toLocaleString('en-IN')}`;
}

export function getDisplayPrice(planId, isYearly = false) {
  const plan = getPlan(planId);
  if (plan.pricing.monthly === 0) return `${plan.pricing.currency}0`;
  const amount = isYearly ? plan.pricing.yearly : plan.pricing.monthly;
  return formatPrice(amount, plan.pricing.currency);
}

export function getAllPlans() {
  return Object.values(SUBSCRIPTION_PLANS);
}

export function getPaidPlans() {
  return getAllPlans().filter(p => p.pricing.monthly > 0);
}
