import { Router } from 'express';
import { db } from '../data/store.js';
import { requireAuth } from '../middleware/auth.js';
import { MARKETPLACE_VENDORS, COMMISSION_CONFIG, filterVendors } from '../../src/data/marketplaceData.js';

const router = Router();

// GET /api/marketplace/vendors — List & filter vendors
router.get('/vendors', (req, res) => {
  const { eventType, city, category, muhuratDate, maxPrice } = req.query;
  const filtered = filterVendors({
    eventType,
    city,
    category,
    muhuratDate,
    maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined
  });
  res.json({ vendors: filtered });
});

// GET /api/marketplace/bookings — List user bookings
router.get('/bookings', (req, res) => {
  res.json({ bookings: db.getCollection('bookings') });
});

// POST /api/marketplace/bookings — Create booking
router.post('/bookings', requireAuth, (req, res) => {
  const { vendorId, vendorName, vendorCategory, eventType, eventDate, muhuratWindow, amount, userNotes } = req.body;
  if (!vendorId || !amount) {
    return res.status(400).json({ error: 'Vendor ID and amount required' });
  }

  const commissionRate = COMMISSION_CONFIG.categoryRates[vendorCategory] || COMMISSION_CONFIG.defaultRate;
  const newBooking = {
    id: `booking-${Date.now()}`,
    vendorId,
    vendorName: vendorName || 'Vendor',
    vendorCategory: vendorCategory || 'Service',
    eventType: eventType || 'wedding',
    eventDate: eventDate || '2026-09-14',
    muhuratWindow: muhuratWindow || 'To be confirmed',
    amount,
    commission: Math.round(amount * commissionRate / 100),
    commissionRate,
    status: 'pending',
    userNotes: userNotes || '',
    createdAt: new Date().toISOString()
  };

  db.insert('bookings', newBooking);
  res.status(201).json({ message: 'Booking submitted successfully', booking: newBooking });
});

// GET /api/marketplace/commissions — Admin commission metrics
router.get('/commissions', (req, res) => {
  const bookings = db.getCollection('bookings');
  const totalGmv = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const totalCommission = bookings.reduce((sum, b) => sum + (b.commission || 0), 0);

  res.json({
    totalGmv,
    totalCommission,
    totalBookings: bookings.length,
    commissionConfig: COMMISSION_CONFIG
  });
});

export default router;
