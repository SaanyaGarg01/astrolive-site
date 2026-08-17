/**
 * Mock Analytics Service for AstroProof Feature
 * Logs structured analytics events for prototype tracking & demonstration.
 */

export function trackAstroProofViewed(data = {}) {
  console.log('[Analytics Event: astroproof_viewed]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackPredictionCreated(data = {}) {
  console.log('[Analytics Event: prediction_created]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackPredictionLocked(data = {}) {
  console.log('[Analytics Event: prediction_locked]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackPredictionReminderSent(data = {}) {
  console.log('[Analytics Event: prediction_reminder_sent]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackPredictionOutcomeSubmitted(data = {}) {
  console.log('[Analytics Event: prediction_outcome_submitted]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackPredictionShared(data = {}) {
  console.log('[Analytics Event: prediction_shared]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackAstrologerAstroProofViewed(data = {}) {
  console.log('[Analytics Event: astrologer_astroproof_viewed]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackConsultationPredictionAdded(data = {}) {
  console.log('[Analytics Event: consultation_prediction_added]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}
