import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// ─── Initial Seed Database ──────────────────────────────────────
const INITIAL_DB = {
  users: [
    {
      id: 'usr-1',
      name: 'Rohan Malhotra',
      email: 'rohan@example.com',
      zodiacSign: 'Libra ♎',
      birthDetails: '14 Oct 1994, 08:30 AM, New Delhi',
      streakDays: 7,
      karmaBalance: 450,
      membership: 'PLUS',
      membershipStatus: 'ACTIVE',
      membershipStartDate: '2026-08-15',
      membershipEndDate: '2026-09-15',
      consultationCredits: 100
    }
  ],

  astrologers: [
    {
      id: 'astro-1',
      name: 'Acharya Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      specialization: 'Vedic & Career Specialist',
      experience: 12,
      rating: 4.9,
      pricePerMin: 25,
      languages: ['Hindi', 'English'],
      isAvailable: true,
      bio: 'Gold Medalist Vedic Astrologer with 12+ years of experience guiding top executives in career timing and corporate decisions.',
      consultationsCount: 1420,
      astroProofStats: {
        predictionsLogged: 34,
        userConfirmed: 24,
        partiallyConfirmed: 6,
        notConfirmed: 4,
        confirmationRate: 71,
        repeatRate: 84
      }
    },
    {
      id: 'astro-2',
      name: 'Dr. Devraj Shastri',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      specialization: 'KP & Numerology',
      experience: 15,
      rating: 4.95,
      pricePerMin: 30,
      languages: ['Hindi', 'Sanskrit'],
      isAvailable: true,
      bio: 'Ph.D. in Vedic Astrology specializing in KP System and Business Partner Matching.',
      consultationsCount: 2890,
      astroProofStats: {
        predictionsLogged: 52,
        userConfirmed: 41,
        partiallyConfirmed: 7,
        notConfirmed: 4,
        confirmationRate: 79,
        repeatRate: 88
      }
    },
    {
      id: 'astro-3',
      name: 'Ananya Roy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      specialization: 'Tarot & Intuitive Reader',
      experience: 8,
      rating: 4.8,
      pricePerMin: 20,
      languages: ['English', 'Bengali'],
      isAvailable: false,
      bio: 'Certified International Tarot Master providing compassionate guidance on relationships and life paths.',
      consultationsCount: 980,
      astroProofStats: {
        predictionsLogged: 18,
        userConfirmed: 12,
        partiallyConfirmed: 4,
        notConfirmed: 2,
        confirmationRate: 67,
        repeatRate: 76
      }
    }
  ],

  predictions: [
    {
      id: 'pred-101',
      astrologerId: 'astro-1',
      astrologerName: 'Acharya Priya Sharma',
      statement: 'High probability of VP level career promotion or offer within 30-45 days during Sun-Jupiter Transit.',
      category: 'Career',
      dateLogged: '2026-07-15',
      targetDate: '2026-08-30',
      hash: 'AP-HASH-98F2A1B7C4E',
      status: 'Active',
      outcomeChoice: null,
      userReflectionNote: null,
      outcomeSubmittedAt: null,
      followUpReminderSent: true,
      timelineEvents: [
        { date: '2026-07-15', label: 'Prediction Created & Locked', icon: 'Lock' },
        { date: '2026-08-14', label: '30-Day Follow-Up Notification Sent', icon: 'Bell' }
      ]
    },
    {
      id: 'pred-102',
      astrologerId: 'astro-2',
      astrologerName: 'Dr. Devraj Shastri',
      statement: 'Favorable alignment for property purchase or real estate agreement during 10th House Transit.',
      category: 'Finance',
      dateLogged: '2026-05-10',
      targetDate: '2026-06-25',
      hash: 'AP-HASH-33E1D4A8F90',
      status: 'Verified (Confirmed)',
      outcomeChoice: 'Yes',
      userReflectionNote: 'Successfully finalized new apartment contract on June 22nd!',
      outcomeSubmittedAt: '2026-06-23T10:30:00Z',
      followUpReminderSent: true,
      timelineEvents: [
        { date: '2026-05-10', label: 'Prediction Created & Locked', icon: 'Lock' },
        { date: '2026-06-23', label: 'Outcome Confirmed: YES', icon: 'CheckCircle' }
      ]
    }
  ],

  lifeEvents: [
    {
      id: 'event-1',
      title: 'Joined Acme Corp as Senior Product Manager',
      category: 'Career',
      date: '2024-03-15',
      time: '10:00 AM',
      location: 'Gurugram',
      description: 'Accepted offer after 4 rounds of interviews during Sun 10th house transit.',
      mood: 'Very Happy 😊',
      outcome: 'Successful',
      astrologicalTransit: 'Sun-Jupiter 10th House Transit',
      userReflection: 'Preparation and high decision momentum timing aligned perfectly.',
      type: 'user'
    },
    {
      id: 'event-2',
      title: 'Relocated to Gurugram Office',
      category: 'Travel',
      date: '2024-04-01',
      time: '09:00 AM',
      location: 'Gurugram',
      description: 'Moved into new apartment during Jupiter 9th house movement.',
      mood: 'Excited 🤩',
      outcome: 'Successful',
      astrologicalTransit: '9th House Travel Aspect',
      userReflection: 'New environment unlocked new networking opportunities.',
      type: 'user'
    }
  ],

  guardEvents: [
    {
      id: 'guard-1',
      name: 'Job Interview — VP of Product',
      category: 'Job Interview',
      date: '2026-08-18',
      time: '10:00 AM',
      location: 'Gurugram / Remote Zoom',
      astrologicalTimingInsight: 'Highly favorable Jupiter 10th house aspect. Optimum pitch delivery window between 09:45 AM and 11:30 AM.'
    },
    {
      id: 'guard-2',
      name: 'Seed Pitch — Angel Investor Syndicate',
      category: 'Business Launch',
      date: '2026-08-25',
      time: '02:30 PM',
      location: 'New Delhi',
      astrologicalTimingInsight: 'Mercury direct in 5th house. Strong clarity in financial projections and partner agreement term discussion.'
    }
  ],

  notifications: [
    {
      id: 'notif-1',
      category: 'astro_guard',
      title: 'Interview Upcoming Tomorrow 💼',
      body: 'Your VP of Product interview is scheduled for 10:00 AM. Check planetary timing insight.',
      time: '2026-08-17T14:30:00Z',
      unread: true,
      actionTab: 'astro-guard',
      priority: 'high'
    },
    {
      id: 'notif-2',
      category: 'predictions',
      title: 'AstroProof Prediction Window Active ⏳',
      body: 'Priya Sharma prediction has 13 days remaining.',
      time: '2026-08-17T12:00:00Z',
      unread: false,
      actionTab: 'astro-proof',
      priority: 'normal'
    }
  ],

  notificationPreferences: {
    astrology: true,
    predictions: true,
    streaks: true,
    promotions: true,
    consultations: true,
    astro_guard: true,
    subscription: true,
    system: true
  },

  b2bClients: [
    {
      id: 'client-1',
      companyName: 'ShaadiConnect.com',
      contactEmail: 'api@shaadiconnect.com',
      industry: 'Matrimonial',
      tier: 'business',
      apiKey: 'astrolive_Rk4mN7xPqL2sYvB8wJ9dF3hT6gA1cE5',
      status: 'active',
      createdAt: '2026-04-15',
      requestsThisMonth: 4280,
      totalRequests: 28450,
      lastRequest: '2026-08-17T14:23:00Z'
    },
    {
      id: 'client-2',
      companyName: 'WedPlan Events',
      contactEmail: 'tech@wedplan.in',
      industry: 'Wedding Planning',
      tier: 'starter',
      apiKey: 'astrolive_Xt9bQ4vH7kM2nR5jY8wC1pS6dL3fA0',
      status: 'active',
      createdAt: '2026-06-01',
      requestsThisMonth: 312,
      totalRequests: 1840,
      lastRequest: '2026-08-16T09:15:00Z'
    }
  ],

  bookings: [
    {
      id: 'booking-1',
      vendorId: 'v-1',
      vendorName: 'Pt. Rameshwar Shastri Pandit Services',
      vendorCategory: 'Vedic Priest',
      eventType: 'wedding',
      eventDate: '2026-09-14',
      muhuratWindow: '10:15 AM - 12:45 PM',
      amount: 5100,
      commission: 408,
      commissionRate: 8,
      status: 'confirmed',
      userNotes: 'Vedic Vivah Puja in Gurugram',
      createdAt: '2026-08-10T12:00:00Z'
    }
  ],

  analyticsLog: [
    {
      event: 'page_view',
      category: 'engagement',
      timestamp: '2026-08-17T15:00:00Z',
      sessionId: 'session_demo123',
      page: 'home'
    }
  ]
};

// ─── Data Access & Persistence ──────────────────────────────────
class DataStore {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Error loading JSON DB, initializing seed data:', e.message);
    }
    this.save(INITIAL_DB);
    return INITIAL_DB;
  }

  save(data = this.data) {
    try {
      this.data = data;
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error writing to JSON DB:', e.message);
    }
  }

  getCollection(name) {
    return this.data[name] || [];
  }

  setCollection(name, items) {
    this.data[name] = items;
    this.save();
    return items;
  }

  find(collection, predicate) {
    return this.getCollection(collection).find(predicate);
  }

  filter(collection, predicate) {
    return this.getCollection(collection).filter(predicate);
  }

  insert(collection, item) {
    const items = this.getCollection(collection);
    items.unshift(item);
    this.setCollection(collection, items);
    return item;
  }

  update(collection, predicate, updateFn) {
    const items = this.getCollection(collection);
    const index = items.findIndex(predicate);
    if (index === -1) return null;
    const updated = typeof updateFn === 'function' ? updateFn(items[index]) : { ...items[index], ...updateFn };
    items[index] = updated;
    this.setCollection(collection, items);
    return updated;
  }

  remove(collection, predicate) {
    const items = this.getCollection(collection);
    const filtered = items.filter(i => !predicate(i));
    this.setCollection(collection, filtered);
    return true;
  }
}

export const db = new DataStore();
