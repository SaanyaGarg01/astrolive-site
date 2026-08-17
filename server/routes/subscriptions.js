import { Router } from 'express';
import { db } from '../data/store.js';
import { SUBSCRIPTION_PLANS, getAllPlans } from '../../src/data/subscriptionConfig.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/subscriptions/plans — List all plans
router.get('/plans', (req, res) => {
  res.json({ plans: getAllPlans() });
});

// GET /api/subscriptions/me — Current user subscription status
router.get('/me', requireAuth, (req, res) => {
  const user = req.user;
  const currentPlan = SUBSCRIPTION_PLANS[user.membership.toLowerCase()] || SUBSCRIPTION_PLANS.free;
  res.json({
    membership: user.membership,
    status: user.membershipStatus || 'ACTIVE',
    startDate: user.membershipStartDate,
    endDate: user.membershipEndDate,
    credits: user.consultationCredits || 0,
    plan: currentPlan
  });
});

// POST /api/subscriptions/upgrade — Upgrade plan
router.post('/upgrade', requireAuth, (req, res) => {
  const { planId, isYearly } = req.body;
  const plan = SUBSCRIPTION_PLANS[planId];
  if (!plan) return res.status(400).json({ error: 'Invalid plan ID' });

  const updatedUser = db.update('users', u => u.id === req.user.id, u => ({
    ...u,
    membership: plan.name,
    membershipStatus: 'ACTIVE',
    membershipStartDate: new Date().toISOString().split('T')[0],
    membershipEndDate: new Date(Date.now() + (isYearly ? 365 : 30) * 86400000).toISOString().split('T')[0],
    consultationCredits: (u.consultationCredits || 0) + plan.benefits.consultationCredits
  }));

  res.json({
    message: `Successfully upgraded to ${plan.displayName}!`,
    user: updatedUser
  });
});

// POST /api/subscriptions/cancel — Cancel plan
router.post('/cancel', requireAuth, (req, res) => {
  const updatedUser = db.update('users', u => u.id === req.user.id, u => ({
    ...u,
    membershipStatus: 'CANCELLED'
  }));

  res.json({
    message: 'Subscription cancelled. Access remains active until end of billing period.',
    user: updatedUser
  });
});

export default router;
