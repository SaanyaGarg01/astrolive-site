/**
 * AstroLive — B2B API Management Service
 * Handles API client CRUD, key generation/revocation, usage tracking.
 * All data persisted in localStorage until backend is available.
 */

const STORAGE_KEYS = {
  CLIENTS: 'astrolive_b2b_clients',
  USAGE: 'astrolive_b2b_usage'
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function saveJSON(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* fail silently */ }
}

// ─── API Key Generation ─────────────────────────────────────────
function generateApiKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = 'astrolive_';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

// ─── API Pricing Tiers ──────────────────────────────────────────
export const API_PRICING_TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    requestsPerMonth: 1000,
    pricePerMonth: 2999,
    rateLimit: '10 req/min',
    features: ['Basic muhurat calculation', 'Single event type', 'JSON response']
  },
  {
    id: 'business',
    name: 'Business',
    requestsPerMonth: 10000,
    pricePerMonth: 9999,
    rateLimit: '50 req/min',
    features: ['All event types', 'Bulk date ranges', 'Webhook callbacks', 'Priority support']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    requestsPerMonth: -1, // unlimited
    pricePerMonth: null, // custom pricing
    rateLimit: '200 req/min',
    features: ['Unlimited requests', 'Custom integrations', 'Dedicated support', 'SLA guarantee', 'White-label option']
  }
];

// ─── Seed Clients ───────────────────────────────────────────────
const SEED_CLIENTS = [
  {
    id: 'client-1',
    companyName: 'ShaadiConnect.com',
    contactEmail: 'api@shaadiconnect.com',
    industry: 'Matrimonial',
    tier: 'business',
    apiKey: 'astrolive_Rk4mN7xPqL2sYvB8wJ9dF3hT6gA1cE5',
    status: 'active',
    createdAt: '2026-04-15',
    requestsThisMonth: 4280,
    totalRequests: 28450,
    lastRequest: '2026-08-17T14:23:00Z'
  },
  {
    id: 'client-2',
    companyName: 'WedPlan Events',
    contactEmail: 'tech@wedplan.in',
    industry: 'Wedding Planning',
    tier: 'starter',
    apiKey: 'astrolive_Xt9bQ4vH7kM2nR5jY8wC1pS6dL3fA0',
    status: 'active',
    createdAt: '2026-06-01',
    requestsThisMonth: 312,
    totalRequests: 1840,
    lastRequest: '2026-08-16T09:15:00Z'
  },
  {
    id: 'client-3',
    companyName: 'PropAuspicious Realty',
    contactEmail: 'dev@propauspicious.com',
    industry: 'Real Estate',
    tier: 'starter',
    apiKey: null,
    status: 'pending',
    createdAt: '2026-08-10',
    requestsThisMonth: 0,
    totalRequests: 0,
    lastRequest: null
  }
];

// ─── Client Management ──────────────────────────────────────────
export function getClients() {
  return loadJSON(STORAGE_KEYS.CLIENTS, SEED_CLIENTS);
}

export function getClient(clientId) {
  return getClients().find(c => c.id === clientId) || null;
}

export function createClient({ companyName, contactEmail, industry, tier = 'starter' }) {
  const clients = getClients();
  const newClient = {
    id: `client-${Date.now()}`,
    companyName,
    contactEmail,
    industry,
    tier,
    apiKey: null,
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0],
    requestsThisMonth: 0,
    totalRequests: 0,
    lastRequest: null
  };
  clients.push(newClient);
  saveJSON(STORAGE_KEYS.CLIENTS, clients);
  return newClient;
}

export function generateKeyForClient(clientId) {
  const clients = getClients();
  const idx = clients.findIndex(c => c.id === clientId);
  if (idx === -1) return null;

  const newKey = generateApiKey();
  clients[idx].apiKey = newKey;
  clients[idx].status = 'active';
  saveJSON(STORAGE_KEYS.CLIENTS, clients);
  return newKey;
}

export function revokeKeyForClient(clientId) {
  const clients = getClients();
  const idx = clients.findIndex(c => c.id === clientId);
  if (idx === -1) return false;

  clients[idx].apiKey = null;
  clients[idx].status = 'revoked';
  saveJSON(STORAGE_KEYS.CLIENTS, clients);
  return true;
}

export function updateClientTier(clientId, newTier) {
  const clients = getClients();
  const idx = clients.findIndex(c => c.id === clientId);
  if (idx === -1) return false;

  clients[idx].tier = newTier;
  saveJSON(STORAGE_KEYS.CLIENTS, clients);
  return true;
}

export function deleteClient(clientId) {
  const clients = getClients().filter(c => c.id !== clientId);
  saveJSON(STORAGE_KEYS.CLIENTS, clients);
  return true;
}

// ─── Usage Tracking ─────────────────────────────────────────────
export function getUsageStats() {
  const clients = getClients();
  const activeClients = clients.filter(c => c.status === 'active');

  return {
    totalClients: clients.length,
    activeClients: activeClients.length,
    totalRequestsThisMonth: activeClients.reduce((sum, c) => sum + c.requestsThisMonth, 0),
    totalRequestsAllTime: clients.reduce((sum, c) => sum + c.totalRequests, 0),
    estimatedRevenue: activeClients.reduce((sum, c) => {
      const tier = API_PRICING_TIERS.find(t => t.id === c.tier);
      return sum + (tier?.pricePerMonth || 0);
    }, 0)
  };
}

// ─── Mock API Response ──────────────────────────────────────────
export function generateMuhuratApiResponse(eventType, startDate, endDate, location) {
  const slots = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  const nakshatras = ['Rohini', 'Uttara Phalguni', 'Hasta', 'Swati', 'Anuradha', 'Pushya', 'Revati'];
  const choghadiyas = ['Shubh', 'Labh', 'Amrit', 'Char'];
  const timeWindows = ['06:15 AM - 08:30 AM', '09:00 AM - 11:15 AM', '10:15 AM - 12:45 PM', '02:30 PM - 05:00 PM', '04:00 PM - 06:15 PM'];

  let current = new Date(start);
  while (current <= end && slots.length < 5) {
    current.setDate(current.getDate() + Math.floor(Math.random() * 5) + 3);
    if (current > end) break;

    slots.push({
      date: current.toISOString().split('T')[0],
      timeWindow: timeWindows[Math.floor(Math.random() * timeWindows.length)],
      choghadiya: choghadiyas[Math.floor(Math.random() * choghadiyas.length)],
      nakshatra: nakshatras[Math.floor(Math.random() * nakshatras.length)],
      suitabilityScore: Math.floor(Math.random() * 15) + 84
    });
  }

  return {
    status: 'success',
    eventType,
    location: location || 'Not specified',
    dateRange: { start: startDate, end: endDate },
    planetaryStrengthScore: Math.floor(Math.random() * 10) + 88,
    recommendedSlots: slots,
    metadata: {
      calculationEngine: 'AstroLive Vedic Timing Engine v2.0',
      panchang: 'Drik Siddhanta',
      timestamp: new Date().toISOString()
    }
  };
}
