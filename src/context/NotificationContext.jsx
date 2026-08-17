import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const NotificationContext = createContext(null);

// ─── Notification Categories ────────────────────────────────────
export const NOTIFICATION_CATEGORIES = {
  ASTROLOGY: { id: 'astrology', label: 'Astrology', icon: '🔮', color: 'purple' },
  PREDICTIONS: { id: 'predictions', label: 'Predictions', icon: '📊', color: 'emerald' },
  STREAKS: { id: 'streaks', label: 'Streaks & Karma', icon: '🔥', color: 'amber' },
  PROMOTIONS: { id: 'promotions', label: 'Promotions', icon: '🎁', color: 'pink' },
  CONSULTATIONS: { id: 'consultations', label: 'Consultations', icon: '📞', color: 'blue' },
  ASTRO_GUARD: { id: 'astro_guard', label: 'Astro Guard', icon: '🛡️', color: 'cyan' },
  SUBSCRIPTION: { id: 'subscription', label: 'Subscription', icon: '✨', color: 'amber' },
  SYSTEM: { id: 'system', label: 'System', icon: '⚙️', color: 'slate' }
};

const STORAGE_KEY_NOTIFICATIONS = 'astrolive_notifications';
const STORAGE_KEY_PREFS = 'astrolive_notification_prefs';

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function saveJSON(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* silently fail */ }
}

// ─── Default Preferences ────────────────────────────────────────
const DEFAULT_PREFS = Object.fromEntries(
  Object.keys(NOTIFICATION_CATEGORIES).map(key => [
    NOTIFICATION_CATEGORIES[key].id, true
  ])
);

// ─── Anti-Spam Config ───────────────────────────────────────────
const MAX_NOTIFICATIONS_PER_CATEGORY_PER_DAY = 5;
const MAX_TOTAL_PER_DAY = 20;

// ─── Default Notifications ──────────────────────────────────────
const SEED_NOTIFICATIONS = [
  {
    id: 'notif-1',
    category: 'astro_guard',
    title: 'Interview Upcoming Tomorrow 💼',
    body: 'Your VP of Product interview is scheduled for 10:00 AM. Check planetary timing insight.',
    time: new Date(Date.now() - 10 * 60000).toISOString(),
    unread: true,
    actionTab: 'astro-guard',
    priority: 'high'
  },
  {
    id: 'notif-2',
    category: 'predictions',
    title: 'AstroProof Prediction Window Active ⏳',
    body: 'Priya Sharma prediction has 20 days remaining.',
    time: new Date(Date.now() - 2 * 3600000).toISOString(),
    unread: false,
    actionTab: 'astro-proof',
    priority: 'normal'
  },
  {
    id: 'notif-3',
    category: 'astrology',
    title: 'Daily Horoscope Ready 🌅',
    body: 'Your personalized Libra ♎ horoscope for today is ready. Jupiter strengthens communication.',
    time: new Date(Date.now() - 6 * 3600000).toISOString(),
    unread: true,
    actionTab: 'daily-ritual',
    priority: 'normal'
  },
  {
    id: 'notif-4',
    category: 'streaks',
    title: 'Keep Your Streak Alive! 🔥',
    body: "You're on a 7-day streak. Don't forget to check in today to maintain your momentum!",
    time: new Date(Date.now() - 8 * 3600000).toISOString(),
    unread: true,
    actionTab: 'daily-ritual',
    priority: 'normal'
  },
  {
    id: 'notif-5',
    category: 'subscription',
    title: 'Your Plus Benefits Are Active ✨',
    body: 'You have ₹100 consultation credits and 2x karma multiplier active this month.',
    time: new Date(Date.now() - 24 * 3600000).toISOString(),
    unread: false,
    actionTab: 'membership-manage',
    priority: 'low'
  },
  {
    id: 'notif-6',
    category: 'consultations',
    title: 'Follow-Up Recommended 📞',
    body: 'Your last consultation with Priya Sharma recommended a follow-up around August 28th.',
    time: new Date(Date.now() - 48 * 3600000).toISOString(),
    unread: false,
    actionTab: 'astrologers',
    priority: 'normal'
  }
];

// ─── Provider ───────────────────────────────────────────────────
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() =>
    loadJSON(STORAGE_KEY_NOTIFICATIONS, SEED_NOTIFICATIONS)
  );

  const [preferences, setPreferences] = useState(() =>
    loadJSON(STORAGE_KEY_PREFS, DEFAULT_PREFS)
  );

  const [showCenter, setShowCenter] = useState(false);

  // Persist
  useEffect(() => { saveJSON(STORAGE_KEY_NOTIFICATIONS, notifications); }, [notifications]);
  useEffect(() => { saveJSON(STORAGE_KEY_PREFS, preferences); }, [preferences]);

  // ── Derived State ─────────────────────────────────────────────
  const unreadCount = notifications.filter(n => n.unread).length;

  const notificationsByCategory = Object.fromEntries(
    Object.values(NOTIFICATION_CATEGORIES).map(cat => [
      cat.id,
      notifications.filter(n => n.category === cat.id)
    ])
  );

  // ── Anti-Spam Check ───────────────────────────────────────────
  const canSendNotification = useCallback((category) => {
    if (!preferences[category]) return false; // Category disabled

    const today = new Date().toISOString().split('T')[0];
    const todayNotifs = notifications.filter(n =>
      n.time.split('T')[0] === today
    );

    if (todayNotifs.length >= MAX_TOTAL_PER_DAY) return false;

    const categoryToday = todayNotifs.filter(n => n.category === category);
    if (categoryToday.length >= MAX_NOTIFICATIONS_PER_CATEGORY_PER_DAY) return false;

    return true;
  }, [notifications, preferences]);

  // ── Add Notification ──────────────────────────────────────────
  const addNotification = useCallback(({ category, title, body, actionTab, priority = 'normal' }) => {
    if (!canSendNotification(category)) return null;

    const newNotif = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      category,
      title,
      body,
      time: new Date().toISOString(),
      unread: true,
      actionTab: actionTab || 'home',
      priority
    };

    setNotifications(prev => [newNotif, ...prev].slice(0, 100)); // Keep last 100
    return newNotif;
  }, [canSendNotification]);

  // ── Mark as Read ──────────────────────────────────────────────
  const markAsRead = useCallback((notifId) => {
    setNotifications(prev =>
      prev.map(n => n.id === notifId ? { ...n, unread: false } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  }, []);

  // ── Delete Notification ───────────────────────────────────────
  const deleteNotification = useCallback((notifId) => {
    setNotifications(prev => prev.filter(n => n.id !== notifId));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // ── Toggle Preference ─────────────────────────────────────────
  const togglePreference = useCallback((categoryId) => {
    setPreferences(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  }, []);

  // ── Time Formatting ───────────────────────────────────────────
  const formatNotificationTime = useCallback((isoTime) => {
    const diff = Date.now() - new Date(isoTime).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(isoTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      notificationsByCategory,
      preferences,
      showCenter,
      setShowCenter,

      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAllNotifications,
      togglePreference,
      canSendNotification,
      formatNotificationTime
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
