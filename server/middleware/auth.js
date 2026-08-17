import { db } from '../data/store.js';

// Mock User Middleware (defaults to user usr-1)
export function requireAuth(req, res, next) {
  const user = db.find('users', u => u.id === 'usr-1');
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized user session' });
  }
  req.user = user;
  next();
}

// B2B API Key Authentication Middleware
export function requireApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  if (!apiKey) {
    return res.status(401).json({
      error: 'API key required',
      message: 'Provide x-api-key header or apiKey query param.'
    });
  }

  const client = db.find('b2bClients', c => c.apiKey === apiKey && c.status === 'active');
  if (!client) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid or revoked API key.'
    });
  }

  // Update request count
  db.update('b2bClients', c => c.id === client.id, c => ({
    ...c,
    requestsThisMonth: (c.requestsThisMonth || 0) + 1,
    totalRequests: (c.totalRequests || 0) + 1,
    lastRequest: new Date().toISOString()
  }));

  req.apiClient = client;
  next();
}
