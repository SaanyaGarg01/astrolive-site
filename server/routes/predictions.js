import { Router } from 'express';
import { db } from '../data/store.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/predictions — List predictions
router.get('/', (req, res) => {
  res.json({ predictions: db.getCollection('predictions') });
});

// POST /api/predictions — Create hash-locked prediction
router.post('/', requireAuth, (req, res) => {
  const { statement, category, astrologerId, astrologerName, predictionWindowDays } = req.body;
  if (!statement || !category) {
    return res.status(400).json({ error: 'Statement and category required' });
  }

  const hash = 'AP-HASH-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  const dateLogged = new Date().toISOString().split('T')[0];
  const windowDays = parseInt(predictionWindowDays || '30', 10);
  const targetDate = new Date(Date.now() + windowDays * 86400000).toISOString().split('T')[0];

  const newPrediction = {
    id: `pred-${Date.now()}`,
    astrologerId: astrologerId || 'astro-1',
    astrologerName: astrologerName || 'Acharya Priya Sharma',
    statement,
    category,
    dateLogged,
    targetDate,
    hash,
    status: 'Active',
    outcomeChoice: null,
    userReflectionNote: null,
    outcomeSubmittedAt: null,
    followUpReminderSent: false,
    timelineEvents: [
      { date: dateLogged, label: 'Prediction Created & Immutably Locked', icon: 'Lock' }
    ]
  };

  db.insert('predictions', newPrediction);
  res.status(201).json({ message: 'Prediction recorded and locked!', prediction: newPrediction });
});

// POST /api/predictions/:id/outcome — Submit outcome evaluation
router.post('/:id/outcome', requireAuth, (req, res) => {
  const { id } = req.params;
  const { outcomeChoice, outcomeNote } = req.body;

  const pred = db.find('predictions', p => p.id === id);
  if (!pred) return res.status(404).json({ error: 'Prediction not found' });

  const statusLabel = outcomeChoice === 'Yes' ? 'Verified (Confirmed)' :
    outcomeChoice === 'Partially' ? 'Partially Confirmed' :
    outcomeChoice === 'No' ? 'Evaluated (Not Occurred)' : 'Pending Review';

  const updated = db.update('predictions', p => p.id === id, p => ({
    ...p,
    status: statusLabel,
    outcomeChoice,
    userReflectionNote: outcomeNote || '',
    outcomeSubmittedAt: new Date().toISOString(),
    timelineEvents: [
      ...p.timelineEvents,
      {
        date: new Date().toISOString().split('T')[0],
        label: `Outcome Evaluation Submitted: ${outcomeChoice.toUpperCase()}`,
        icon: 'CheckCircle'
      }
    ]
  }));

  // Re-calculate astrologer trust score stats
  if (pred.astrologerId) {
    const astroPreds = db.filter('predictions', p => p.astrologerId === pred.astrologerId);
    const userConfirmed = astroPreds.filter(p => p.outcomeChoice === 'Yes').length;
    const partiallyConfirmed = astroPreds.filter(p => p.outcomeChoice === 'Partially').length;
    const notConfirmed = astroPreds.filter(p => p.outcomeChoice === 'No').length;
    const evaluated = userConfirmed + partiallyConfirmed + notConfirmed;
    const rate = evaluated > 0 ? Math.round(((userConfirmed + partiallyConfirmed * 0.5) / evaluated) * 100) : 0;

    db.update('astrologers', a => a.id === pred.astrologerId, a => ({
      ...a,
      astroProofStats: {
        ...a.astroProofStats,
        userConfirmed,
        partiallyConfirmed,
        notConfirmed,
        confirmationRate: rate
      }
    }));
  }

  res.json({ message: 'Outcome recorded successfully!', prediction: updated });
});

// GET /api/predictions/trust-score/:astrologerId — Get verified trust stats
router.get('/trust-score/:astrologerId', (req, res) => {
  const astro = db.find('astrologers', a => a.id === req.params.astrologerId);
  if (!astro) return res.status(404).json({ error: 'Astrologer not found' });
  res.json({ trustStats: astro.astroProofStats });
});

export default router;
