/**
 * Mock Analytics Service for Personal Pattern Engine
 * Logs structured analytics events for prototype tracking & demonstration.
 */

export function trackLifeEventCreated(data = {}) {
  console.log('[Analytics Event: life_event_created]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackLifeEventViewed(data = {}) {
  console.log('[Analytics Event: life_event_viewed]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackPatternAnalysisStarted(data = {}) {
  console.log('[Analytics Event: pattern_analysis_started]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackPatternDiscovered(data = {}) {
  console.log('[Analytics Event: pattern_discovered]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackReflectionAdded(data = {}) {
  console.log('[Analytics Event: reflection_added]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackConsultationAddedToJourney(data = {}) {
  console.log('[Analytics Event: consultation_added_to_journey]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackPredictionLinkedToEvent(data = {}) {
  console.log('[Analytics Event: prediction_linked_to_event]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackPatternInsightGenerated(data = {}) {
  console.log('[Analytics Event: pattern_insight_generated]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}

export function trackPatternToConsultationClicked(data = {}) {
  console.log('[Analytics Event: pattern_to_consultation_clicked]', {
    timestamp: new Date().toISOString(),
    ...data
  });
}
