import React, { useState } from 'react';
import { useNotifications, NOTIFICATION_CATEGORIES } from '../context/NotificationContext';
import { Bell, X, Check, CheckCheck, Settings, Trash2, Filter } from 'lucide-react';

/**
 * NotificationCenter — Full notification inbox with category filtering,
 * user preferences, and deep linking to features.
 */
export default function NotificationCenter({ onNavigate }) {
  const {
    notifications,
    unreadCount,
    preferences,
    showCenter,
    setShowCenter,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    togglePreference,
    formatNotificationTime
  } = useNotifications();

  const [activeFilter, setActiveFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  const categories = Object.values(NOTIFICATION_CATEGORIES);

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter(n => n.category === activeFilter);

  const handleNotificationClick = (notif) => {
    markAsRead(notif.id);
    if (onNavigate && notif.actionTab) {
      onNavigate(notif.actionTab);
    }
    setShowCenter(false);
  };

  const getCategoryMeta = (categoryId) => {
    return categories.find(c => c.id === categoryId) || { icon: '📌', label: 'Other', color: 'slate' };
  };

  const priorityStyles = {
    high: 'border-l-4 border-l-red-500',
    normal: 'border-l-4 border-l-transparent',
    low: 'border-l-4 border-l-transparent opacity-80'
  };

  if (!showCenter) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setShowCenter(false)}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-[#0c1020] border-l border-slate-800 h-full overflow-hidden flex flex-col animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              title="Preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setShowCenter(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="p-4 border-b border-slate-800 bg-slate-900/60 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Notification Preferences</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => togglePreference(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                    preferences[cat.id]
                      ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                      : 'bg-slate-900 border-slate-700 text-slate-500 line-through'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => { clearAllNotifications(); setShowSettings(false); }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/10 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All Notifications
            </button>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-3 overflow-x-auto no-scrollbar border-b border-slate-800/50">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({notifications.length})
          </button>
          {categories.map(cat => {
            const count = notifications.filter(n => n.category === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                  activeFilter === cat.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.icon} {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-500">
              <Bell className="w-8 h-8 mb-2 opacity-40" />
              <p className="text-sm font-medium">No notifications</p>
              <p className="text-xs mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/50">
              {filteredNotifications.map(notif => {
                const catMeta = getCategoryMeta(notif.category);
                return (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-3 p-4 cursor-pointer transition-all hover:bg-slate-900/60 ${
                      notif.unread ? 'bg-purple-500/5' : ''
                    } ${priorityStyles[notif.priority] || ''}`}
                    onClick={() => handleNotificationClick(notif)}
                  >
                    {/* Category Icon */}
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg flex-shrink-0">
                      {catMeta.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs font-bold truncate ${notif.unread ? 'text-white' : 'text-slate-300'}`}>
                          {notif.title}
                        </h4>
                        {notif.unread && (
                          <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                        {notif.body}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-slate-500">
                          {formatNotificationTime(notif.time)}
                        </span>
                        <span className="text-[9px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded">
                          {catMeta.label}
                        </span>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                      className="p-1 text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
