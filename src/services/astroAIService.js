// Service Abstraction for AI Operations in AstroLive 2.0

export function generateAstroInsight(profile) {
  const name = profile?.name || 'Explorer';
  const concern = profile?.concern || 'Career';

  return {
    headline: `Reading your personal chart for ${name}...`,
    summary: `Your current transit chart highlights a powerful alignment in your 10th house of leadership and 5th house of strategic decisions. This phase favors action over hesitation in ${concern.toLowerCase()}.`,
    cards: [
      {
        id: 'career',
        title: 'Career & Executive Growth',
        icon: '💼',
        subtitle: 'Sun-Jupiter Sub-Transit Phase',
        insight: 'Your planetary positions indicate an upcoming transition window. Senior stakeholders and recruiters are receptive to your initiative between now and late August.',
        actionableAdvice: 'Update your portfolio and reach out for tier-1 strategic roles.'
      },
      {
        id: 'relationship',
        title: 'Relationships & Harmony',
        icon: '💖',
        subtitle: 'Venus in 7th House Alignment',
        insight: 'Clear communication resolves recent unspoken friction. Mutual long-term plans are supported by Mercury moving direct.',
        actionableAdvice: 'Initiate open discussions regarding personal timelines.'
      },
      {
        id: 'growth',
        title: 'Personal Growth & Energy',
        icon: '✨',
        subtitle: 'Saturn Structural Wisdom',
        insight: 'Discipline and structured daily habits will amplify your mental clarity. Great period for acquiring specialized certifications.',
        actionableAdvice: 'Maintain your 7-day daily ritual streak for continuous focus.'
      }
    ],
    generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}

export function generateAstroVideo(profile) {
  const concern = profile?.concern || 'Career Transition';
  return {
    title: 'Your Personal Astro Insight',
    topic: `${concern} & Planetary Timing`,
    generatedDate: '8 August 2026',
    duration: '01:45',
    videoPoster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
    summaryText: 'Your birth chart highlights a key 30-day window where career decisions carry maximum momentum. Key transits in your 10th house suggest positive reception for new opportunities.',
    transcript: [
      { time: '00:05', text: 'Analyzing birth chart alignment for Sun, Jupiter, and Saturn...' },
      { time: '00:30', text: 'Career transit indicates major decision crossroads in mid-August.' },
      { time: '01:05', text: 'Favorable timing window identified for interviews and pitch meetings.' },
      { time: '01:35', text: 'Human consultation recommended to personalize planetary remedies.' }
    ]
  };
}

export function matchAstrologers(userQuery, profile, astrologersList) {
  const queryLower = (userQuery || profile?.concern || '').toLowerCase();
  
  // Extract keywords
  let detectedConcern = 'Career Transition';
  if (queryLower.includes('love') || queryLower.includes('marry') || queryLower.includes('relation')) {
    detectedConcern = 'Love & Relationships';
  } else if (queryLower.includes('money') || queryLower.includes('invest') || queryLower.includes('wealth') || queryLower.includes('finance')) {
    detectedConcern = 'Wealth & Finance';
  } else if (queryLower.includes('house') || queryLower.includes('vastu') || queryLower.includes('home')) {
    detectedConcern = 'Vastu & Home';
  }

  // Calculate dynamic match scores based on criteria
  return astrologersList.map((astro, index) => {
    let matchScore = 85 + ((8 - index) * 1.5);
    if (index === 0) matchScore = 94; // Top match
    if (index === 1) matchScore = 91;
    if (index === 2) matchScore = 88;

    return {
      ...astro,
      matchPercentage: Math.min(Math.round(matchScore), 98),
      extractedConcern: detectedConcern,
      extractedLanguage: profile?.language || 'Hindi • English',
      extractedBudget: '₹10–₹30/min',
      matchExplanation: `${Math.min(Math.round(matchScore), 98)}% match because ${astro.name.split(' ')[1] || astro.name} specializes in ${detectedConcern.toLowerCase()}, speaks ${astro.languages.join(' & ')}, fits your budget (₹${astro.pricePerMin}/min) and is ${astro.isAvailable ? 'available now' : 'on queue'}.`
    };
  });
}

export function generateConsultationSummary(astrologer, userNotes = '') {
  return {
    topic: 'Career Transition & Strategic Growth',
    astrologerName: astrologer?.name || 'Acharya Priya Sharma',
    astrologerAvatar: astrologer?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    durationMinutes: 12,
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    keyDiscussionPoints: [
      'Reviewed current Sun-Jupiter transit alignment active through late August.',
      'Identified prime timing for interview negotiations between 09:45 AM and 11:30 AM.',
      'Discussed strategic positioning for senior role applications.',
      'Suggested daily morning Surya Arghya for vocal confidence & mental focus.'
    ],
    questionsToRevisit: [
      'How is the new interview/opportunity progressing in 30 days?',
      'Should I conduct a follow-up consultation before final contract signing?'
    ],
    loggedPrediction: 'You may receive a significant career opportunity or job offer within the next 30 days.',
    predictionWindow: '8 Aug – 7 Sep 2026',
    followUpDate: '28 August 2026'
  };
}

export function calculateTimingInsight(eventName, date, time) {
  const score = Math.floor(Math.random() * 15) + 84; // 84 - 98
  return {
    score,
    label: score > 90 ? 'Auspicious Window ✨' : 'Moderate Window ⚖️',
    recommendation: `Planetary transits show favorable momentum around ${time || '10:00 AM'}. Jupiter alignment enhances clear communication and decision clarity.`,
    choghadiya: 'Shubh Choghadiya Active',
    disclaimer: 'Astrology timing insights are provided for personal reflection and organization. For legal, financial, or medical decisions, consult qualified professionals.'
  };
}
