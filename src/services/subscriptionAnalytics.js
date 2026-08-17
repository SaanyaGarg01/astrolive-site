/**
 * AstroLive Plus — Mock Subscription Analytics
 * Prototype analytics hooks for subscription events.
 * Replace console.log with a real analytics SDK (e.g. Mixpanel, Amplitude) in production.
 */

const LOG_PREFIX = '[AstroLive Analytics]';

function trackEvent(eventName, properties = {}) {
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    session_id: 'demo_session_' + Math.random().toString(36).substring(2, 9),
    ...properties
  };
  console.log(`${LOG_PREFIX} ${eventName}`, payload);
  return payload;
}

/** Fired when the user views the /membership pricing page */
export function trackSubscriptionViewed({ currentPlan, billingCycle }) {
  return trackEvent('subscription_viewed', { current_plan: currentPlan, billing_cycle: billingCycle });
}

/** Fired when a user clicks on a plan card to select it */
export function trackPlanSelected({ planId, planName, billingCycle, price }) {
  return trackEvent('plan_selected', { plan_id: planId, plan_name: planName, billing_cycle: billingCycle, price });
}

/** Fired when the user switches between Monthly and Yearly billing toggle */
export function trackBillingCycleChanged({ from, to }) {
  return trackEvent('billing_cycle_changed', { from_cycle: from, to_cycle: to });
}

/** Fired when Upgrade CTA button is clicked */
export function trackUpgradeClicked({ planId, planName, source }) {
  return trackEvent('upgrade_clicked', { plan_id: planId, plan_name: planName, source });
}

/** Fired when the demo checkout modal opens */
export function trackCheckoutStarted({ planId, planName, billingCycle, price }) {
  return trackEvent('checkout_started', { plan_id: planId, plan_name: planName, billing_cycle: billingCycle, price });
}

/** Fired when the subscription is confirmed (demo activated) */
export function trackSubscriptionActivated({ planId, planName, billingCycle, price }) {
  return trackEvent('subscription_activated', { plan_id: planId, plan_name: planName, billing_cycle: billingCycle, price });
}

/** Fired when the user cancels their subscription */
export function trackSubscriptionCancelled({ planId, planName }) {
  return trackEvent('subscription_cancelled', { plan_id: planId, plan_name: planName });
}
