import { Router } from 'express';
import { db } from '../data/store.js';
import { MOCK_ADMIN_METRICS } from '../../src/data/mockData.js';

const router = Router();

// GET /api/admin/dashboard — Executive KPI metrics & financial projections
router.get('/dashboard', (req, res) => {
  const users = db.getCollection('users');
  const activeSubs = users.filter(u => u.membershipStatus === 'ACTIVE' && u.membership !== 'FREE').length;
  const b2bClients = db.getCollection('b2bClients').filter(c => c.status === 'active').length;
  const totalPredictions = db.getCollection('predictions').length;
  const bookings = db.getCollection('bookings');

  res.json({
    metrics: {
      ...MOCK_ADMIN_METRICS,
      activeSubscriptionsCount: activeSubs,
      b2bClientsCount: b2bClients,
      totalPredictionsCount: totalPredictions,
      marketplaceBookingsCount: bookings.length
    }
  });
});

// GET /api/admin/analytics — Event audit log
router.get('/analytics', (req, res) => {
  const logs = db.getCollection('analyticsLog');
  res.json({ logs });
});

// POST /api/admin/analytics — Track custom backend analytics event
router.post('/analytics', (req, res) => {
  const { event, category, properties } = req.body;
  if (!event) return res.status(400).json({ error: 'Event name required' });

  const entry = {
    event,
    category: category || 'general',
    timestamp: new Date().toISOString(),
    ...properties
  };

  db.insert('analyticsLog', entry);
  res.status(201).json({ message: 'Event logged', entry });
});

export default router;
