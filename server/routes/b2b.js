import { Router } from 'express';
import { db } from '../data/store.js';
import { requireApiKey } from '../middleware/auth.js';
import { generateMuhuratApiResponse, API_PRICING_TIERS } from '../../src/services/b2bApiService.js';

const router = Router();

// ── Public API Endpoint (Requires x-api-key header) ─────────────
// POST /api/v1/muhurat/calculate
router.post('/v1/muhurat/calculate', requireApiKey, (req, res) => {
  const { eventType, startDate, endDate, location } = req.body;
  if (!eventType || !startDate || !endDate) {
    return res.status(400).json({
      error: 'Invalid payload',
      message: 'eventType, startDate, and endDate parameters are required.'
    });
  }

  const response = generateMuhuratApiResponse(eventType, startDate, endDate, location);
  res.json({
    ...response,
    apiClient: req.apiClient.companyName
  });
});

// ── Admin B2B Client Management Endpoints ───────────────────────

// GET /api/b2b/clients — List clients
router.get('/clients', (req, res) => {
  res.json({ clients: db.getCollection('b2bClients'), tiers: API_PRICING_TIERS });
});

// POST /api/b2b/clients — Register client
router.post('/clients', (req, res) => {
  const { companyName, contactEmail, industry, tier } = req.body;
  if (!companyName || !contactEmail) {
    return res.status(400).json({ error: 'Company name and email required' });
  }

  const newClient = {
    id: `client-${Date.now()}`,
    companyName,
    contactEmail,
    industry: industry || 'Tech',
    tier: tier || 'starter',
    apiKey: null,
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0],
    requestsThisMonth: 0,
    totalRequests: 0,
    lastRequest: null
  };

  db.insert('b2bClients', newClient);
  res.status(201).json({ message: 'B2B client created', client: newClient });
});

// POST /api/b2b/clients/:id/key — Generate API key
router.post('/clients/:id/key', (req, res) => {
  const { id } = req.params;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = 'astrolive_';
  for (let i = 0; i < 32; i++) apiKey += chars.charAt(Math.floor(Math.random() * chars.length));

  const updated = db.update('b2bClients', c => c.id === id, c => ({
    ...c,
    apiKey,
    status: 'active'
  }));

  if (!updated) return res.status(404).json({ error: 'Client not found' });
  res.json({ message: 'API key generated', apiKey, client: updated });
});

// DELETE /api/b2b/clients/:id/key — Revoke API key
router.delete('/clients/:id/key', (req, res) => {
  const { id } = req.params;
  const updated = db.update('b2bClients', c => c.id === id, c => ({
    ...c,
    apiKey: null,
    status: 'revoked'
  }));

  if (!updated) return res.status(404).json({ error: 'Client not found' });
  res.json({ message: 'API key revoked', client: updated });
});

export default router;
