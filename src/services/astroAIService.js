// Dynamic Astrological Calculation Service for AstroLive 2.0

const NAKSHATRAS = [
  'Rohini Nakshatra', 'Pushya Nakshatra', 'Uttara Phalguni', 'Ashlesha', 'Swati Nakshatra',
  'Revati Nakshatra', 'Magha Nakshatra', 'Vishakha Nakshatra', 'Anuradha', 'Purva Ashadha',
  'Shatabhisha', 'Bharani Nakshatra', 'Krittika', 'Mrigashira', 'Chitra', 'Dhanishta'
];

const HOUSES = [
  '1st House (Lagna)', '2nd House (Dhana)', '5th House (Suta)', '7th House (Kalatra)',
  '9th House (Bhagya)', '10th House (Karma)', '11th House (Labha)'
];

const PLANETS = [
  'Sun-Jupiter Conjunction', 'Venus Exalted Phase', 'Mercury Direct Motion',
  'Saturn Structural Aspect', 'Mars Energy Trine', 'Moon-Jupiter Gajakesari'
];

// Hash function to derive deterministic values from birth details
function hashSeed(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateAstroInsight(profile) {
  const name = profile?.name || 'Explorer';
  const dob = profile?.dob || '1998-05-14';
  const time = profile?.timeOfBirth || '10:30';
  const place = profile?.placeOfBirth || 'Delhi';
  const concern = profile?.concern || 'Career Transition';

  const seed = hashSeed(`${name}-${dob}-${time}-${place}-${concern}`);
  
  const nakshatra = NAKSHATRAS[seed % NAKSHATRAS.length];
  const house = HOUSES[(seed >> 2) % HOUSES.length];
  const planet = PLANETS[(seed >> 4) % PLANETS.length];
  const score = 84 + (seed % 15);

  const dayOffset = (seed % 20) + 1;
  const targetDateStr = `August ${dayOffset + 10}, 2026`;

  return {
    headline: `Personalized Natal Chart for ${name} (${place})`,
    dobSummary: `DOB: ${dob} at ${time} | Lagna Nakshatra: ${nakshatra}`,
    summary: `Your natal alignment for ${name} born in ${place} shows strong activation in your ${house} driven by ${planet}. Maximum decision momentum occurs around ${targetDateStr}.`,
    score,
    nakshatra,
    house,
    cards: [
      {
        id: 'primary',
        title: `${concern} & Key Timing`,
        icon: '💼',
        subtitle: `${planet} in ${house}`,
        insight: `For ${name}, the planetary transits calculated for ${dob} highlight favorable alignment in your ${house}. Strategic moves planned near ${targetDateStr} carry high confirmation probability.`,
        actionableAdvice: `Capitalize on your ${nakshatra} window. Initiate conversations during early morning hours.`
      },
      {
        id: 'relationship',
        title: 'Relationships & Partnerships',
        icon: '💖',
        subtitle: '7th House Venus Transit Overlay',
        insight: `Chart calculated for ${place} indicates harmonic alignment in 7th house. Communication flows smoothly when Moon crosses ${nakshatra}.`,
        actionableAdvice: 'Share personal goals openly with your partner during the upcoming weekend.'
      },
      {
        id: 'wealth',
        title: 'Asset Growth & Finance',
        icon: '💰',
        subtitle: '11th House Gain Period',
        insight: `Jupiter aspecting 11th house for your birth time (${time}) indicates strong stability and bonus eligibility.`,
        actionableAdvice: 'Maintain disciplined savings and avoid speculative trading on Rahu transit days.'
      }
    ],
    generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}

export function generateAstroVideo(profile) {
  const name = profile?.name || 'Explorer';
  const dob = profile?.dob || '1998-05-14';
  const time = profile?.timeOfBirth || '10:30';
  const place = profile?.placeOfBirth || 'Delhi';
  const concern = profile?.concern || 'Career Transition';

  const seed = hashSeed(`video-${name}-${dob}-${time}-${place}`);
  const nakshatra = NAKSHATRAS[seed % NAKSHATRAS.length];
  const house = HOUSES[(seed >> 3) % HOUSES.length];
  const planet = PLANETS[(seed >> 5) % PLANETS.length];
  const dayOffset = (seed % 18) + 5;

  return {
    title: `AI Astro Insight for ${name}`,
    topic: `${concern} (${nakshatra})`,
    generatedDate: '18 August 2026',
    duration: '00:45',
    durationSec: 45,
    planetaryContext: `${planet} in ${house}`,
    summaryText: `Chart calculated for ${name} (Born ${dob} at ${time} in ${place}): High planetary alignment in ${house} under ${nakshatra}. Key decision window: August ${dayOffset} – ${dayOffset + 12}, 2026.`,
    transcript: [
      { timeSec: 0, text: `Initializing birth chart analysis for ${name}, born ${dob} at ${time} in ${place}...` },
      { timeSec: 8, text: `Your chart reveals strong activation in the ${house} powered by ${planet}.` },
      { timeSec: 18, text: `Under ${nakshatra}, your decision clarity peaks between August ${dayOffset} and ${dayOffset + 10}.` },
      { timeSec: 28, text: `Favorable momentum detected for ${concern.toLowerCase()} applications and strategic steps.` },
      { timeSec: 38, text: `Connect with a human astrologer for custom Vedic remedies tailored to your birth chart.` }
    ]
  };
}

export function matchAstrologers(userQuery, profile, astrologersList) {
  const queryLower = (userQuery || profile?.concern || '').toLowerCase();
  
  let detectedConcern = 'Career Transition';
  if (queryLower.includes('love') || queryLower.includes('marry') || queryLower.includes('relation')) {
    detectedConcern = 'Love & Relationships';
  } else if (queryLower.includes('money') || queryLower.includes('invest') || queryLower.includes('wealth') || queryLower.includes('finance')) {
    detectedConcern = 'Wealth & Finance';
  } else if (queryLower.includes('house') || queryLower.includes('vastu') || queryLower.includes('home')) {
    detectedConcern = 'Vastu & Home';
  }

  const seed = hashSeed(`${profile?.name || 'User'}-${queryLower}`);

  return astrologersList.map((astro, index) => {
    const matchScore = Math.min(98, Math.max(78, 94 - index * 3 + (seed % 5)));
    return {
      ...astro,
      matchPercentage: Math.round(matchScore),
      extractedConcern: detectedConcern,
      extractedLanguage: profile?.language || 'Hindi • English',
      extractedBudget: '₹10–₹30/min',
      matchExplanation: `${Math.round(matchScore)}% match because ${astro.name.split(' ')[1] || astro.name} specializes in ${detectedConcern.toLowerCase()}, speaks ${astro.languages.join(' & ')}, fits your budget (₹${astro.pricePerMin}/min) and is ${astro.isAvailable ? 'available now' : 'on queue'}.`
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
  const seed = hashSeed(`${eventName}-${date}-${time}`);
  const score = 82 + (seed % 17); // 82 - 98
  const nakshatra = NAKSHATRAS[seed % NAKSHATRAS.length];

  return {
    score,
    label: score > 90 ? 'Auspicious Window ✨' : 'Moderate Window ⚖️',
    recommendation: `For ${eventName || 'Event'} on ${date || 'selected date'} at ${time || '10:00 AM'}, transits highlight ${nakshatra} alignment. Favorable for clear decision execution.`,
    choghadiya: 'Shubh Choghadiya Active',
    disclaimer: 'Astrology timing insights are provided for personal reflection and organization.'
  };
}
