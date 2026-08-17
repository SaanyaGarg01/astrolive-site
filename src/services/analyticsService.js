/**
 * AstroLive — Unified Analytics Service
 * Single entry point for all analytics event tracking.
 * Replace console.log with a real SDK (Mixpanel, Amplitude, PostHog) in production.
 */

const LOG_PREFIX = '[AstroLive Analytics]';
const STORAGE_KEY = 'astrolive_analytics_log';

// ─── Event Categories ───────────────────────────────────────────
export const ANALYTICS_CATEGORIES = {
  ENGAGEMENT: 'engagement',
  REVENUE: 'revenue',
  TRUST: 'trust',
  ASTRO_GUARD: 'astro_guard',
  GAMIFICATION: 'gamification',
  NOTIFICATIONS: 'notifications',
  B2B: 'b2b',
  MARKETPLACE: 'marketplace'
};

// ─── Core Tracker ───────────────────────────────────────────────
function trackEvent(eventName, category, properties = {}) {
  const payload = {
    event: eventName,
    category,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    ...properties
  };

  // Console logging for dev
  console.log(`${LOG_PREFIX} [${category}] ${eventName}`, payload);

  // Persist to localStorage event log
  try {
    const log = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    log.unshift(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log.slice(0, 500)));
  } catch { /* quota exceeded */ }

  return payload;
}

// ─── Session ID ─────────────────────────────────────────────────
function getSessionId() {
  let sid = sessionStorage.getItem('astrolive_session_id');
  if (!sid) {
    sid = 'session_' + Math.random().toString(36).substring(2, 11);
    sessionStorage.setItem('astrolive_session_id', sid);
  }
  return sid;
}

// ─── Engagement Events ──────────────────────────────────────────
export function trackPageView(pageName) {
  return trackEvent('page_view', ANALYTICS_CATEGORIES.ENGAGEMENT, { page: pageName });
}

export function trackDailyCheckIn(data) {
  return trackEvent('daily_check_in', ANALYTICS_CATEGORIES.ENGAGEMENT, data);
}

export function trackStreakMilestone(data) {
  return trackEvent('streak_milestone', ANALYTICS_CATEGORIES.ENGAGEMENT, data);
}

export function trackNotificationEngagement(data) {
  return trackEvent('notification_engaged', ANALYTICS_CATEGORIES.NOTIFICATIONS, data);
}

// ─── Revenue Events ─────────────────────────────────────────────
export function trackSubscriptionEvent(eventType, data) {
  return trackEvent(`subscription_${eventType}`, ANALYTICS_CATEGORIES.REVENUE, data);
}

export function trackConsultationBooked(data) {
  return trackEvent('consultation_booked', ANALYTICS_CATEGORIES.REVENUE, data);
}

export function trackMarketplaceBooking(data) {
  return trackEvent('marketplace_booking', ANALYTICS_CATEGORIES.MARKETPLACE, data);
}

// ─── Trust Events ───────────────────────────────────────────────
export function trackPredictionEvent(eventType, data) {
  return trackEvent(`prediction_${eventType}`, ANALYTICS_CATEGORIES.TRUST, data);
}

export function trackAstrologerProfileView(data) {
  return trackEvent('astrologer_profile_view', ANALYTICS_CATEGORIES.TRUST, data);
}

// ─── Gamification Events ────────────────────────────────────────
export function trackKarmaEarned(data) {
  return trackEvent('karma_earned', ANALYTICS_CATEGORIES.GAMIFICATION, data);
}

export function trackKarmaRedeemed(data) {
  return trackEvent('karma_redeemed', ANALYTICS_CATEGORIES.GAMIFICATION, data);
}

export function trackBadgeUnlocked(data) {
  return trackEvent('badge_unlocked', ANALYTICS_CATEGORIES.GAMIFICATION, data);
}

// ─── Astro Guard Events ────────────────────────────────────────
export function trackGuardEventAdded(data) {
  return trackEvent('guard_event_added', ANALYTICS_CATEGORIES.ASTRO_GUARD, data);
}

export function trackGuardAlertOpened(data) {
  return trackEvent('guard_alert_opened', ANALYTICS_CATEGORIES.ASTRO_GUARD, data);
}

export function trackGuardConsultationConversion(data) {
  return trackEvent('guard_consultation_conversion', ANALYTICS_CATEGORIES.ASTRO_GUARD, data);
}

// ─── B2B Events ─────────────────────────────────────────────────
export function trackApiKeyGenerated(data) {
  return trackEvent('api_key_generated', ANALYTICS_CATEGORIES.B2B, data);
}

export function trackApiRequest(data) {
  return trackEvent('api_request', ANALYTICS_CATEGORIES.B2B, data);
}

// ─── Get Analytics Log ──────────────────────────────────────────
export function getAnalyticsLog(limit = 50) {
  try {
    const log = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return log.slice(0, limit);
  } catch { return []; }
}

export function getEventCounts() {
  const log = getAnalyticsLog(500);
  const counts = {};
  log.forEach(entry => {
    counts[entry.event] = (counts[entry.event] || 0) + 1;
  });
  return counts;
}

export function clearAnalyticsLog() {
  localStorage.removeItem(STORAGE_KEY);
}
