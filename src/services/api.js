/**
 * AstroLive — Frontend API Client
 * Connects the React frontend to the Node.js + Express backend server (http://localhost:5000/api).
 * Provides graceful fallbacks if the server is offline.
 */

const API_BASE_URL = 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `HTTP Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[AstroLive API Client] Error calling ${endpoint}:`, error.message);
    throw error;
  }
}

// ── Subscriptions API ───────────────────────────────────────────
export const apiSubscriptions = {
  getPlans: () => request('/subscriptions/plans'),
  getUserStatus: () => request('/subscriptions/me'),
  upgrade: (planId, isYearly) => request('/subscriptions/upgrade', { method: 'POST', body: JSON.stringify({ planId, isYearly }) }),
  cancel: () => request('/subscriptions/cancel', { method: 'POST' })
};

// ── Gamification API ────────────────────────────────────────────
export const apiGamification = {
  checkIn: () => request('/gamification/check-in', { method: 'POST' }),
  getUserStats: () => request('/gamification/me'),
  getBadges: () => request('/gamification/badges'),
  getLeaderboard: () => request('/gamification/leaderboard')
};

// ── AstroProof Predictions API ─────────────────────────────────
export const apiPredictions = {
  getAll: () => request('/predictions'),
  create: (data) => request('/predictions', { method: 'POST', body: JSON.stringify(data) }),
  submitOutcome: (id, outcomeChoice, outcomeNote) => request(`/predictions/${id}/outcome`, { method: 'POST', body: JSON.stringify({ outcomeChoice, outcomeNote }) }),
  getTrustScore: (astrologerId) => request(`/predictions/trust-score/${astrologerId}`)
};

// ── Pattern Engine API ──────────────────────────────────────────
export const apiPatterns = {
  getEvents: () => request('/patterns/events'),
  addEvent: (eventData) => request('/patterns/events', { method: 'POST', body: JSON.stringify(eventData) }),
  analyze: () => request('/patterns/analyze', { method: 'POST' })
};

// ── Notifications API ───────────────────────────────────────────
export const apiNotifications = {
  getAll: () => request('/notifications'),
  markRead: (id) => request('/notifications/read', { method: 'POST', body: JSON.stringify({ id }) }),
  updatePreferences: (prefs) => request('/notifications/preferences', { method: 'PUT', body: JSON.stringify(prefs) })
};

// ── Astro Guard API ─────────────────────────────────────────────
export const apiGuard = {
  getEvents: () => request('/guard/events'),
  registerEvent: (eventData) => request('/guard/events', { method: 'POST', body: JSON.stringify(eventData) })
};

// ── B2B Muhurat API ─────────────────────────────────────────────
export const apiB2B = {
  calculateMuhurat: (payload, apiKey) => request('/v1/muhurat/calculate', {
    method: 'POST',
    headers: { 'x-api-key': apiKey },
    body: JSON.stringify(payload)
  }),
  getClients: () => request('/b2b/clients'),
  createClient: (clientData) => request('/b2b/clients', { method: 'POST', body: JSON.stringify(clientData) }),
  generateKey: (clientId) => request(`/b2b/clients/${clientId}/key`, { method: 'POST' }),
  revokeKey: (clientId) => request(`/b2b/clients/${clientId}/key`, { method: 'DELETE' })
};

// ── Marketplace API ─────────────────────────────────────────────
export const apiMarketplace = {
  getVendors: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return request(`/marketplace/vendors${queryString ? `?${queryString}` : ''}`);
  },
  getBookings: () => request('/marketplace/bookings'),
  createBooking: (bookingData) => request('/marketplace/bookings', { method: 'POST', body: JSON.stringify(bookingData) }),
  getCommissions: () => request('/marketplace/commissions')
};

// ── Astrologers & Consultations API ─────────────────────────────
export const apiAstrologers = {
  getAll: () => request('/astrologers'),
  getById: (id) => request(`/astrologers/${id}`),
  startConsultation: (astrologerId, type) => request('/consultations/start', { method: 'POST', body: JSON.stringify({ astrologerId, type }) })
};

// ── Admin Analytics API ─────────────────────────────────────────
export const apiAdmin = {
  getDashboard: () => request('/admin/dashboard'),
  getAnalyticsLog: () => request('/admin/analytics'),
  logEvent: (event, category, properties) => request('/admin/analytics', { method: 'POST', body: JSON.stringify({ event, category, properties }) })
};

// ── Health Check ────────────────────────────────────────────────
export const checkServerHealth = async () => {
  try {
    const data = await request('/health');
    return data.status === 'ok';
  } catch {
    return false;
  }
};
