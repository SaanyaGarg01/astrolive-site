/**
 * AstroLive — Marketplace Data & Configuration
 * Extended vendor data, booking states, and commission configuration.
 */

// ─── Vendor Categories by Event Type ────────────────────────────
export const VENDOR_CATEGORIES_BY_EVENT = {
  wedding: ['Vedic Priest', 'Wedding Venue', 'Photography', 'Catering', 'Decoration', 'Makeup Artist', 'Mehendi Artist'],
  housewarming: ['Vedic Priest', 'Decoration', 'Catering', 'Pooja Samagri'],
  business: ['Event Planner', 'Venue', 'Photography', 'Decoration', 'Catering'],
  office: ['Vedic Priest', 'Event Planner', 'Decoration'],
  puja: ['Vedic Priest', 'Pooja Samagri', 'Decoration'],
  vehicle: ['Vedic Priest', 'Pooja Samagri']
};

// ─── Extended Vendor Data ───────────────────────────────────────
export const MARKETPLACE_VENDORS = [
  {
    id: 'v-1',
    name: 'Pt. Rameshwar Shastri Pandit Services',
    category: 'Vedic Priest',
    eventTypes: ['wedding', 'housewarming', 'puja', 'office', 'vehicle'],
    rating: 4.9,
    reviewCount: 140,
    priceRange: '₹5,100 – ₹15,000',
    basePrice: 5100,
    image: 'https://images.unsplash.com/photo-1609101824149-4dbfb0785f95?w=300&auto=format&fit=crop&q=80',
    location: 'Delhi NCR',
    cities: ['New Delhi', 'Gurugram', 'Noida', 'Faridabad'],
    description: 'Experienced Vedic priest performing traditional ceremonies for weddings, housewarming, and corporate poojas.',
    languages: ['Hindi', 'Sanskrit'],
    availability: ['2026-09-14', '2026-09-15', '2026-09-22', '2026-09-23', '2026-10-01'],
    verified: true,
    responseTime: '< 2 hours'
  },
  {
    id: 'v-2',
    name: 'Royal Heritage Palace Venues',
    category: 'Wedding Venue',
    eventTypes: ['wedding', 'business'],
    rating: 4.85,
    reviewCount: 95,
    priceRange: '₹85,000 – ₹2,50,000 / day',
    basePrice: 85000,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300&auto=format&fit=crop&q=80',
    location: 'Gurugram',
    cities: ['Gurugram'],
    description: 'Premium heritage-style venue with traditional architecture, garden areas, and modern amenities.',
    languages: ['Hindi', 'English'],
    availability: ['2026-09-14', '2026-09-22', '2026-10-01', '2026-10-05'],
    verified: true,
    responseTime: '< 4 hours'
  },
  {
    id: 'v-3',
    name: 'Celestial Moments Photography',
    category: 'Photography',
    eventTypes: ['wedding', 'business', 'housewarming'],
    rating: 4.92,
    reviewCount: 210,
    priceRange: '₹35,000 – ₹1,50,000 / event',
    basePrice: 35000,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=300&auto=format&fit=crop&q=80',
    location: 'Delhi & Jaipur',
    cities: ['New Delhi', 'Jaipur', 'Gurugram'],
    description: 'Award-winning wedding and event photography team specializing in candid and traditional shots.',
    languages: ['Hindi', 'English'],
    availability: ['2026-09-14', '2026-09-15', '2026-09-22', '2026-10-01'],
    verified: true,
    responseTime: '< 1 hour'
  },
  {
    id: 'v-4',
    name: 'Annapurna Divine Catering',
    category: 'Catering',
    eventTypes: ['wedding', 'housewarming', 'business', 'puja'],
    rating: 4.88,
    reviewCount: 178,
    priceRange: '₹500 – ₹1,200 per plate',
    basePrice: 500,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=300&auto=format&fit=crop&q=80',
    location: 'Delhi NCR',
    cities: ['New Delhi', 'Gurugram', 'Noida'],
    description: 'Traditional vegetarian and Satvik catering for religious ceremonies and celebrations.',
    languages: ['Hindi'],
    availability: ['2026-09-14', '2026-09-15', '2026-09-22', '2026-09-23'],
    verified: true,
    responseTime: '< 3 hours'
  },
  {
    id: 'v-5',
    name: 'Shubh Sajawat Decorators',
    category: 'Decoration',
    eventTypes: ['wedding', 'housewarming', 'business', 'office', 'puja'],
    rating: 4.78,
    reviewCount: 92,
    priceRange: '₹25,000 – ₹2,00,000',
    basePrice: 25000,
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=300&auto=format&fit=crop&q=80',
    location: 'Delhi NCR',
    cities: ['New Delhi', 'Gurugram', 'Noida', 'Faridabad'],
    description: 'Floral and traditional decoration specialist for auspicious ceremonies and corporate events.',
    languages: ['Hindi', 'English'],
    availability: ['2026-09-14', '2026-09-22', '2026-10-01'],
    verified: true,
    responseTime: '< 2 hours'
  },
  {
    id: 'v-6',
    name: 'Priya Bridal Makeup Studio',
    category: 'Makeup Artist',
    eventTypes: ['wedding'],
    rating: 4.95,
    reviewCount: 245,
    priceRange: '₹15,000 – ₹50,000',
    basePrice: 15000,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&auto=format&fit=crop&q=80',
    location: 'New Delhi',
    cities: ['New Delhi', 'Gurugram'],
    description: 'Celebrity bridal makeup artist with HD airbrush techniques and traditional styling.',
    languages: ['Hindi', 'English'],
    availability: ['2026-09-14', '2026-09-15', '2026-09-22'],
    verified: true,
    responseTime: '< 1 hour'
  }
];

// ─── Booking States ─────────────────────────────────────────────
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

// ─── Commission Configuration ───────────────────────────────────
export const COMMISSION_CONFIG = {
  defaultRate: 10, // 10% commission
  categoryRates: {
    'Vedic Priest': 8,
    'Wedding Venue': 5,
    'Photography': 12,
    'Catering': 10,
    'Decoration': 12,
    'Makeup Artist': 15,
    'Mehendi Artist': 15,
    'Event Planner': 8,
    'Pooja Samagri': 10
  },
  featuredVendorFee: 2999, // Monthly fee for featured listing
  minimumBookingForCommission: 1000
};

// ─── Booking Management ─────────────────────────────────────────
const BOOKINGS_STORAGE_KEY = 'astrolive_marketplace_bookings';

export function getBookings() {
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function createBooking({ vendorId, vendorName, vendorCategory, eventType, eventDate, muhuratWindow, amount, userNotes }) {
  const bookings = getBookings();
  const commissionRate = COMMISSION_CONFIG.categoryRates[vendorCategory] || COMMISSION_CONFIG.defaultRate;

  const booking = {
    id: `booking-${Date.now()}`,
    vendorId,
    vendorName,
    vendorCategory,
    eventType,
    eventDate,
    muhuratWindow: muhuratWindow || 'To be confirmed',
    amount,
    commission: Math.round(amount * commissionRate / 100),
    commissionRate,
    status: BOOKING_STATUS.PENDING,
    userNotes: userNotes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  bookings.unshift(booking);
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  return booking;
}

export function updateBookingStatus(bookingId, newStatus) {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === bookingId);
  if (idx === -1) return null;

  bookings[idx].status = newStatus;
  bookings[idx].updatedAt = new Date().toISOString();
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  return bookings[idx];
}

export function cancelBooking(bookingId) {
  return updateBookingStatus(bookingId, BOOKING_STATUS.CANCELLED);
}

// ─── Vendor Filtering ───────────────────────────────────────────
export function filterVendors({ eventType, city, category, muhuratDate, maxPrice }) {
  let filtered = MARKETPLACE_VENDORS;

  if (eventType) {
    filtered = filtered.filter(v => v.eventTypes.includes(eventType));
  }
  if (city) {
    filtered = filtered.filter(v =>
      v.cities.some(c => c.toLowerCase().includes(city.toLowerCase()))
    );
  }
  if (category) {
    filtered = filtered.filter(v => v.category === category);
  }
  if (muhuratDate) {
    filtered = filtered.filter(v => v.availability.includes(muhuratDate));
  }
  if (maxPrice && maxPrice > 0) {
    filtered = filtered.filter(v => v.basePrice <= maxPrice);
  }

  return filtered;
}
