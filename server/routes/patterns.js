import { Router } from 'express';
import { db } from '../data/store.js';
import { requireAuth } from '../middleware/auth.js';
import { detectPatterns, generatePersonalizedInsight, exportJournalData } from '../../src/services/patternEngine.js';

const router = Router();

// GET /api/patterns/events — Get life events
router.get('/events', (req, res) => {
  res.json({ events: db.getCollection('lifeEvents') });
});

// POST /api/patterns/events — Add life event
router.post('/events', requireAuth, (req, res) => {
  const { title, category, date, time, location, description, mood, outcome } = req.body;
  if (!title || !category || !date) {
    return res.status(400).json({ error: 'Title, category, and date are required' });
  }

  const newEvent = {
    id: `event-${Date.now()}`,
    title,
    category,
    date,
    time: time || '10:00 AM',
    location: location || 'Not specified',
    description: description || '',
    mood: mood || 'Happy 😊',
    outcome: outcome || 'Successful',
    astrologicalTransit: 'Sun-Jupiter 10th House Transit',
    userReflection: '',
    type: 'user'
  };

  db.insert('lifeEvents', newEvent);
  res.status(201).json({ message: 'Life event logged successfully', event: newEvent });
});

// POST /api/patterns/analyze — Run pattern detection engine
router.post('/analyze', (req, res) => {
  const events = db.getCollection('lifeEvents');
  const patterns = detectPatterns(events);
  const insight = generatePersonalizedInsight(events, req.user);
  res.json({ patterns, insight, eventCount: events.length });
});

export default router;
