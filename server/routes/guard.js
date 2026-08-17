import { Router } from 'express';
import { db } from '../data/store.js';
import { requireAuth } from '../middleware/auth.js';
import { calculateTimingInsight } from '../../src/services/astroAIService.js';

const router = Router();

// GET /api/guard/events — Get registered guard events
router.get('/events', (req, res) => {
  res.json({ events: db.getCollection('guardEvents') });
});

// POST /api/guard/events — Register event & calculate timing insight
router.post('/events', requireAuth, (req, res) => {
  const { name, category, date, time, location } = req.body;
  if (!name) return res.status(400).json({ error: 'Event name required' });

  const insight = calculateTimingInsight(name, date || '2026-08-20', time || '10:00 AM');

  const newGuardEvent = {
    id: `guard-${Date.now()}`,
    name,
    category: category || 'Job Interview',
    date: date || '2026-08-20',
    time: time || '10:00 AM',
    location: location || 'Remote Call',
    astrologicalTimingInsight: insight.recommendation
  };

  db.insert('guardEvents', newGuardEvent);
  res.status(201).json({ message: 'Astro Guard event registered', event: newGuardEvent });
});

export default router;
