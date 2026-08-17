import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER_PROFILE,
  MOCK_ASTROLOGERS,
  INITIAL_PREDICTIONS,
  INITIAL_JOURNEY_EVENTS,
  INITIAL_PATTERNS,
  INITIAL_GUARD_EVENTS,
  SAMPLE_CONSULTATION_SUMMARY
} from '../data/mockData';
import {
  trackSubscriptionActivated,
  trackSubscriptionCancelled
} from '../services/subscriptionAnalytics';

const AstroContext = createContext(null);

// Derive credits from membership tier
function creditsForMembership(membership) {
  if (membership === 'PREMIUM') return 250;
  if (membership === 'PLUS') return 100;
  return 0;
}

export function AstroProvider({ children }) {
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILE);
  const [activeTab, setActiveTab] = useState('home');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [astrologers, setAstrologers] = useState(MOCK_ASTROLOGERS);
  const [predictions, setPredictions] = useState(INITIAL_PREDICTIONS);
  const [journeyEvents, setJourneyEvents] = useState(INITIAL_JOURNEY_EVENTS);
  const [patterns, setPatterns] = useState(INITIAL_PATTERNS);
  const [guardEvents, setGuardEvents] = useState(INITIAL_GUARD_EVENTS);
  const [consultationHistory, setConsultationHistory] = useState([SAMPLE_CONSULTATION_SUMMARY]);

  // Subscription state
  const [subscriptionBilling, setSubscriptionBilling] = useState('monthly'); // 'monthly' | 'yearly'
  const [consultationCredits, setConsultationCredits] = useState(
    creditsForMembership(INITIAL_USER_PROFILE.membership)
  );
  
  // Modals & Interactivity State
  const [activeConsultation, setActiveConsultation] = useState(null); // Astrologer being called
  const [lastConsultationSummary, setLastConsultationSummary] = useState(SAMPLE_CONSULTATION_SUMMARY);
  const [selectedAstrologerProfile, setSelectedAstrologerProfile] = useState(null);
  const [shareCardData, setShareCardData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Interview Upcoming Tomorrow 💼',
      body: 'Your VP of Product interview is scheduled for 10:00 AM. Check planetary timing insight.',
      time: '10m ago',
      unread: true,
      actionTab: 'astro-guard'
    },
    {
      id: 'notif-2',
      title: 'AstroProof Prediction Window Active ⏳',
      body: 'Priya Sharma prediction has 20 days remaining.',
      time: '2h ago',
      unread: false,
      actionTab: 'astro-proof'
    }
  ]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const enableDemoMode = () => {
    setUserProfile(INITIAL_USER_PROFILE);
    setPredictions(INITIAL_PREDICTIONS);
    setJourneyEvents(INITIAL_JOURNEY_EVENTS);
    setGuardEvents(INITIAL_GUARD_EVENTS);
    setIsDemoMode(true);
    showToast('✨ Demo Mode populated with Saanya\'s profile & journey history!', 'success');
  };

  const updateProfile = (newFields) => {
    setUserProfile((prev) => ({ ...prev, ...newFields }));
  };

  // Upgrade membership (prototype — no real payment)
  const upgradeMembership = (planId, billing = 'monthly') => {
    const planName = planId.toUpperCase();
    setUserProfile((prev) => ({ ...prev, membership: planName }));
    setSubscriptionBilling(billing);
    const credits = creditsForMembership(planName);
    setConsultationCredits(credits);
    trackSubscriptionActivated({
      planId,
      planName,
      billingCycle: billing,
      price: planId === 'plus' ? (billing === 'yearly' ? '₹1,999/yr' : '₹199/mo') : (billing === 'yearly' ? '₹3,999/yr' : '₹399/mo')
    });
    showToast(`✨ Welcome to AstroLive ${planName}! Your journey just levelled up.`, 'success');
  };

  // Cancel membership back to FREE (prototype)
  const cancelMembership = () => {
    const prevPlan = userProfile.membership;
    setUserProfile((prev) => ({ ...prev, membership: 'FREE' }));
    setConsultationCredits(0);
    trackSubscriptionCancelled({ planId: prevPlan.toLowerCase(), planName: prevPlan });
    showToast('Subscription cancelled. You\'ve been moved to the Free plan.', 'info');
  };

  const addJourneyEvent = (newEvent) => {
    const eventObj = {
      id: `event-${Date.now()}`,
      date: newEvent.date || new Date().toISOString().split('T')[0],
      month: new Date(newEvent.date || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      category: newEvent.category || 'Career',
      title: newEvent.title,
      type: newEvent.type || 'life_event',
      location: newEvent.location || '',
      mood: newEvent.mood || '😊 Positive',
      outcome: newEvent.outcome || 'Successful',
      description: newEvent.description || '',
      astrologicalContext: newEvent.astrologicalContext || `Prototype interpretation: ${newEvent.category} transit period logged.`,
      astrologicalTransit: newEvent.astrologicalTransit || `${newEvent.category} Transit Overlay`,
      userReflection: newEvent.userReflection || '',
      linkedPredictionId: newEvent.linkedPredictionId || null
    };
    setJourneyEvents((prev) => [eventObj, ...prev]);
    showToast('✨ Life Event added to your Personal Patterns journal!', 'success');
  };

  const deleteJourneyEvent = (eventId) => {
    setJourneyEvents((prev) => prev.filter((e) => e.id !== eventId));
    showToast('🗑️ Life event deleted from your journal.', 'info');
  };

  const deleteEntireJourney = () => {
    setJourneyEvents([]);
    setPatterns([]);
    showToast('🗑️ Entire personal journey & pattern data cleared.', 'info');
  };

  const savePatternReflection = (patternId, reflectionText) => {
    setPatterns((prev) =>
      prev.map((p) =>
        p.id === patternId ? { ...p, userReflection: reflectionText } : p
      )
    );
    showToast('💾 Personal reflection saved to pattern record!', 'success');
  };

  const addConsultationToJourney = (summaryData) => {
    const eventObj = {
      id: `event-consultation-${Date.now()}`,
      date: summaryData.date || new Date().toISOString().split('T')[0],
      month: new Date(summaryData.date || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      category: 'Career',
      title: `Consultation with ${summaryData.astrologerName}`,
      type: 'consultation',
      location: 'AstroLive Call',
      mood: '😊 Positive',
      outcome: 'Successful',
      description: summaryData.topic || 'Astrology consultation regarding career crossroads.',
      astrologicalContext: 'Sun & Jupiter transit aligned in 10th house of profession.',
      astrologicalTransit: 'Sun-Jupiter 10th House Transit',
      userReflection: summaryData.loggedPrediction ? `Logged prediction: "${summaryData.loggedPrediction}"` : 'Consultation logged to journey.'
    };
    setJourneyEvents((prev) => [eventObj, ...prev]);
    showToast('✨ Consultation added to your Personal Patterns timeline!', 'success');
  };

  const addPrediction = (newPred) => {
    const predObj = {
      id: `pred-${Date.now()}`,
      astrologerId: newPred.astrologerId || 'astro-1',
      astrologerName: newPred.astrologerName || 'Acharya Priya Sharma',
      astrologerAvatar: newPred.astrologerAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      dateLogged: new Date().toISOString().split('T')[0],
      predictionWindow: newPred.predictionWindow || '30 days from now',
      category: newPred.category || 'Career',
      statement: newPred.statement,
      status: 'Pending Verification',
      userNote: '',
      verifiedDate: null,
      hashId: `0x${Math.random().toString(16).substring(2, 10)}`
    };
    setPredictions((prev) => [predObj, ...prev]);
    showToast('🔒 Prediction timestamped & added to AstroProof ledger!', 'success');
  };

  const updatePredictionStatus = (predId, newStatus, userNote = '') => {
    setPredictions((prev) =>
      prev.map((item) =>
        item.id === predId
          ? {
              ...item,
              status: newStatus,
              userNote: userNote || item.userNote,
              verifiedDate: new Date().toISOString().split('T')[0]
            }
          : item
      )
    );
    showToast(`✅ AstroProof updated: ${newStatus}`, 'success');
  };

  const addGuardEvent = (newEvent) => {
    const guardObj = {
      id: `guard-${Date.now()}`,
      name: newEvent.name,
      date: newEvent.date,
      time: newEvent.time || '10:00 AM',
      location: newEvent.location || 'Remote',
      category: newEvent.category || 'Important Event',
      astrologicalTimingInsight: newEvent.astrologicalTimingInsight || 'Jupiter planetary aspect favors effective communication during this timeframe.',
      status: 'Upcoming',
      notificationSent: false
    };
    setGuardEvents((prev) => [guardObj, ...prev]);
    showToast('🛡️ Upcoming Event registered in Astro Guard!', 'success');
  };

  // Prediction Pre-fill state for Consultation -> AstroProof integration
  const [predictionPreFill, setPredictionPreFill] = useState(null);

  const openAddPrediction = (preFillData = null) => {
    setPredictionPreFill(preFillData);
    setActiveTab('astro-proof');
  };

  const claimDailyReward = (reward) => {
    if (reward.type === 'none') {
      showToast('🍀 Better luck next time! Return tomorrow for your next spin.', 'info');
    } else if (reward.type === 'coins') {
      setUserProfile((prev) => ({ ...prev, astroCoins: prev.astroCoins + reward.value }));
      showToast(`🎉 You earned ${reward.value} AstroCoins!`, 'success');
    } else {
      showToast(`🎁 Reward claimed: ${reward.label}!`, 'success');
    }
  };

  const startConsultation = (astrologer) => {
    setActiveConsultation(astrologer);
  };

  const endConsultation = (summaryData) => {
    setActiveConsultation(null);
    if (summaryData) {
      setLastConsultationSummary(summaryData);
      setConsultationHistory((prev) => [summaryData, ...prev]);
    }
    setActiveTab('summary');
  };

  return (
    <AstroContext.Provider
      value={{
        userProfile,
        updateProfile,
        activeTab,
        setActiveTab,
        isDemoMode,
        enableDemoMode,
        astrologers,
        predictions,
        addPrediction,
        updatePredictionStatus,
        journeyEvents,
        addJourneyEvent,
        deleteJourneyEvent,
        deleteEntireJourney,
        patterns,
        setPatterns,
        savePatternReflection,
        addConsultationToJourney,
        guardEvents,
        addGuardEvent,
        consultationHistory,
        lastConsultationSummary,
        activeConsultation,
        startConsultation,
        endConsultation,
        selectedAstrologerProfile,
        setSelectedAstrologerProfile,
        shareCardData,
        setShareCardData,
        claimDailyReward,
        notifications,
        toastMessage,
        showToast,
        predictionPreFill,
        setPredictionPreFill,
        openAddPrediction,
        // Subscription
        subscriptionBilling,
        setSubscriptionBilling,
        consultationCredits,
        upgradeMembership,
        cancelMembership
      }}
    >
      {children}
    </AstroContext.Provider>
  );
}

export function useAstro() {
  const context = useContext(AstroContext);
  if (!context) {
    throw new Error('useAstro must be used within an AstroProvider');
  }
  return context;
}
