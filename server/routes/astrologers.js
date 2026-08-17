import { Router } from 'express';
import { db } from '../data/store.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/astrologers — List astrologers
router.get('/', (req, res) => {
  res.json({ astrologers: db.getCollection('astrologers') });
});

// GET /api/astrologers/:id — Get astrologer detail with trust score
router.get('/:id', (req, res) => {
  const astro = db.find('astrologers', a => a.id === req.params.id);
  if (!astro) return res.status(404).json({ error: 'Astrologer not found' });
  res.json({ astrologer: astro });
});

// POST /api/consultations/start — Start consultation session
router.post('/consultations/start', requireAuth, (req, res) => {
  const { astrologerId, type } = req.body;
  const astro = db.find('astrologers', a => a.id === astrologerId);
  if (!astro) return res.status(404).json({ error: 'Astrologer not found' });

  const session = {
    sessionId: `session-${Date.now()}`,
    astrologer: astro,
    user: req.user,
    type: type || 'chat',
    startTime: new Date().toISOString(),
    status: 'ACTIVE',
    ratePerMin: astro.pricePerMin
  };

  res.json({ message: 'Consultation session initiated', session });
});

export default router;
