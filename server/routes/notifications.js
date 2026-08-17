import { Router } from 'express';
import { db } from '../data/store.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/notifications — Get user notifications & unread count
router.get('/', (req, res) => {
  const notifications = db.getCollection('notifications');
  const unreadCount = notifications.filter(n => n.unread).length;
  const preferences = db.data.notificationPreferences || {};
  res.json({ notifications, unreadCount, preferences });
});

// POST /api/notifications/read — Mark notifications read
router.post('/read', (req, res) => {
  const { id } = req.body;
  if (id) {
    db.update('notifications', n => n.id === id, n => ({ ...n, unread: false }));
  } else {
    // Mark all read
    const notifs = db.getCollection('notifications').map(n => ({ ...n, unread: false }));
    db.setCollection('notifications', notifs);
  }
  res.json({ success: true });
});

// PUT /api/notifications/preferences — Update preferences
router.put('/preferences', (req, res) => {
  const newPrefs = { ...db.data.notificationPreferences, ...req.body };
  db.data.notificationPreferences = newPrefs;
  db.save();
  res.json({ preferences: newPrefs });
});

export default router;
