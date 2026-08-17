// Vedic Natal Chart Computation & AI Insight Engine for AstroLive 2.0

const ZODIAC_SIGNS = [
  'Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 'Cancer (Karka)',
  'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrishchika)',
  'Sagittarius (Dhanu)', 'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'
];

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

// Hash helper for deterministic seed
function hashSeed(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Calculate Lagna from Time of Birth (12 signs across 24h = 2h per sign)
function calculateLagna(timeStr) {
  if (!timeStr) return ZODIAC_SIGNS[4]; // Default Leo
  const parts = timeStr.split(':');
  const hours = parseInt(parts[0] || '10', 10);
  const index = Math.floor(hours / 2) % 12;
  return ZODIAC_SIGNS[index];
}

// Calculate Moon Nakshatra from Date of Birth
function calculateNakshatra(dobStr) {
  if (!dobStr) return NAKSHATRAS[3]; // Default Rohini
  const dateObj = new Date(dobStr);
  const dayOfYear = Math.floor((dateObj - new Date(dateObj.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const index = Math.abs(dayOfYear) % NAKSHATRAS.length;
  return NAKSHATRAS[index];
}

export function calculateKundliChartData(profile) {
  const name = profile?.name || 'Saanya';
  const dob = profile?.dob || '2004-03-15';
  const time = profile?.timeOfBirth || '10:30';

  // If loading exact Astrodunia sample from image:
  if (profile?.id === 'k-astrodunia-sample' || name === 'Astrodunia Sample') {
    return {
      lagnaSignNum: 9, // Sagittarius
      lagnaSignName: 'Sagittarius (Dhanu)',
      moonSign: 'Gemini (Mithuna)',
      sunSign: 'Virgo (Kanya)',
      nakshatra: 'Mula Nakshatra',
      pada: '1st Pada',
      houseSigns: [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8],
      housePlanets: {
        1: ['Ket'],
        2: [],
        3: [],
        4: ['Jup'],
        5: [],
        6: ['Asc 2', 'Ven'],
        7: ['Mon'],
        8: [],
        9: [],
        10: ['Sun', 'Mer'],
        11: [],
        12: ['Mar']
      },
      planetaryPositions: [
        { planet: 'Sun (Surya)', sign: 'Virgo (Kanya)', house: '10th House', degree: '14.2°', nakshatra: 'Hasta', status: 'Benefic Aspect' },
        { planet: 'Moon (Chandra)', sign: 'Gemini (Mithuna)', house: '7th House', degree: '21.5°', nakshatra: 'Punarvasu', status: 'Direct' },
        { planet: 'Mars (Mangal)', sign: 'Scorpio (Vrishchika)', house: '12th House', degree: '08.1°', nakshatra: 'Anuradha', status: 'Own Sign' },
        { planet: 'Mercury (Budh)', sign: 'Virgo (Kanya)', house: '10th House', degree: '19.4°', nakshatra: 'Chitra', status: 'Exalted' },
        { planet: 'Jupiter (Guru)', sign: 'Pisces (Meena)', house: '4th House', degree: '11.6°', nakshatra: 'Uttara Bhadrapada', status: 'Own Sign' },
        { planet: 'Venus (Shukra)', sign: 'Taurus (Vrishabha)', house: '6th House', degree: '26.3°', nakshatra: 'Krittika', status: 'Own Sign' },
        { planet: 'Saturn (Shani)', sign: 'Capricorn (Makara)', house: '2nd House', degree: '29.0°', nakshatra: 'Dhanishta', status: 'Own Sign' },
        { planet: 'Ketu (South Node)', sign: 'Sagittarius (Dhanu)', house: '1st House', degree: '05.7°', nakshatra: 'Mula', status: 'Lagna Node' },
        { planet: 'Rahu (North Node)', sign: 'Gemini (Mithuna)', house: '7th House', degree: '05.7°', nakshatra: 'Ardra', status: 'Shadow Node' }
      ]
    };
  }

  // General dynamic calculation based on birth inputs:
  const seed = hashSeed(`${name}-${dob}-${time}`);
  const hours = parseInt((time || '10:30').split(':')[0] || '10', 10);
  const lagnaSignNum = ((Math.floor(hours / 2) + (seed % 3)) % 12) + 1; // 1 to 12

  // Derive house sign numbers (House 1 has lagnaSignNum, increment counterclockwise)
  const houseSigns = Array.from({ length: 12 }, (_, i) => ((lagnaSignNum - 1 + i) % 12) + 1);

  const housePlanets = {
    1: ['Ket'],
    2: [],
    3: [],
    4: ['Jup'],
    5: [],
    6: ['Asc 2', 'Ven'],
    7: ['Mon'],
    8: [],
    9: [],
    10: ['Sun', 'Mer'],
    11: [],
    12: ['Mar']
  };

  const zodiacNames = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  return {
    lagnaSignNum,
    lagnaSignName: `${zodiacNames[lagnaSignNum - 1]} (${lagnaSignNum})`,
    moonSign: `${zodiacNames[(lagnaSignNum + 6) % 12]}`,
    sunSign: `${zodiacNames[(lagnaSignNum + 9) % 12]}`,
    nakshatra: NAKSHATRAS[seed % NAKSHATRAS.length],
    pada: `${(seed % 4) + 1}st Pada`,
    houseSigns,
    housePlanets,
    planetaryPositions: [
      { planet: 'Sun (Surya)', sign: zodiacNames[(lagnaSignNum + 9) % 12], house: '10th House', degree: `${10 + (seed % 15)}.4°`, nakshatra: 'Hasta', status: 'Benefic Aspect' },
      { planet: 'Moon (Chandra)', sign: zodiacNames[(lagnaSignNum + 6) % 12], house: '7th House', degree: `${12 + (seed % 10)}.8°`, nakshatra: NAKSHATRAS[seed % NAKSHATRAS.length], status: 'Direct' },
      { planet: 'Mars (Mangal)', sign: zodiacNames[(lagnaSignNum + 11) % 12], house: '12th House', degree: '08.1°', nakshatra: 'Anuradha', status: 'Own Sign' },
      { planet: 'Mercury (Budh)', sign: zodiacNames[(lagnaSignNum + 9) % 12], house: '10th House', degree: '19.4°', nakshatra: 'Chitra', status: 'Exalted' },
      { planet: 'Jupiter (Guru)', sign: zodiacNames[(lagnaSignNum + 3) % 12], house: '4th House', degree: '11.6°', nakshatra: 'Uttara Bhadrapada', status: 'Own Sign' },
      { planet: 'Venus (Shukra)', sign: zodiacNames[(lagnaSignNum + 5) % 12], house: '6th House', degree: '26.3°', nakshatra: 'Krittika', status: 'Own Sign' },
      { planet: 'Saturn (Shani)', sign: zodiacNames[(lagnaSignNum + 1) % 12], house: '2nd House', degree: '29.0°', nakshatra: 'Dhanishta', status: 'Own Sign' },
      { planet: 'Ketu (South Node)', sign: zodiacNames[lagnaSignNum - 1], house: '1st House', degree: '05.7°', nakshatra: 'Mula', status: 'Lagna Node' },
      { planet: 'Rahu (North Node)', sign: zodiacNames[(lagnaSignNum + 6) % 12], house: '7th House', degree: '05.7°', nakshatra: 'Ardra', status: 'Shadow Node' }
    ]
  };
}

// Mapping of specific concerns to Vedic House, Planet, and Forecast Content
const CONCERN_MAP = {
  'Career Transition': {
    house: '10th House (Karma Bhava)',
    primaryPlanet: 'Sun & Jupiter Conjunction',
    dasha: 'Sun Mahadasha / Jupiter Antardasha',
    themeIcon: '💼',
    summary: (name, lagna, nakshatra, place, date) =>
      `Chart calculated for ${name} (Lagna: ${lagna}, Moon: ${nakshatra} in ${place}): Your 10th House of career is strongly activated by Sun-Jupiter transit. Strategic leadership moves and executive transitions carry high success probability around ${date}.`,
    transcript: (name, lagna, nakshatra, place, date) => [
      { timeSec: 0, text: `Analyzing 10th House Karma Bhava for ${name}, born in ${place} under ${lagna}...` },
      { timeSec: 8, text: `Sun and Jupiter enter your 10th House of executive leadership, activating senior stakeholder support.` },
      { timeSec: 18, text: `Under ${nakshatra} Nakshatra, your decision-making authority peaks between ${date} and 10 days post.` },
      { timeSec: 28, text: `Favorable window identified for promotion negotiations, career transitions, and strategic pitches.` },
      { timeSec: 38, text: `Connect with a Vedic specialist for custom Surya Arghya & career Mahadasha remedies.` }
    ]
  },
  'Love & Marriage': {
    house: '7th House (Kalatra Bhava) & 5th House (Suta)',
    primaryPlanet: 'Venus Exalted & Moon Transit',
    dasha: 'Venus Mahadasha / Moon Sub-Period',
    themeIcon: '💖',
    summary: (name, lagna, nakshatra, place, date) =>
      `Chart calculated for ${name} (Lagna: ${lagna}, Moon: ${nakshatra} in ${place}): Venus direct movement through your 7th house brings alignment for partnership, synastry, and long-term marital decisions around ${date}.`,
    transcript: (name, lagna, nakshatra, place, date) => [
      { timeSec: 0, text: `Synthesizing 7th House Kalatra Bhava for ${name} (${lagna} Lagna, ${place})...` },
      { timeSec: 7, text: `Venus moves direct through your 7th house, dissolving communication friction in relationship goals.` },
      { timeSec: 16, text: `Moon crossing ${nakshatra} brings deep emotional transparency and shared long-term clarity.` },
      { timeSec: 26, text: `Ideal planetary window around ${date} for engagement, co-living, and partnership commitments.` },
      { timeSec: 35, text: `Book a certified Synastry & Kundli Matching consultation for relationship guidance.` }
    ]
  },
  'Wealth & Finance': {
    house: '2nd House (Dhana Bhava) & 11th House (Labha)',
    primaryPlanet: 'Jupiter Aspecting Mercury',
    dasha: 'Mercury Mahadasha / Jupiter Transit',
    themeIcon: '💰',
    summary: (name, lagna, nakshatra, place, date) =>
      `Chart calculated for ${name} (Lagna: ${lagna}, Moon: ${nakshatra} in ${place}): Jupiter aspecting 2nd Dhana house and 11th Labha house signals wealth accumulation, asset liquidity, and bonus yield around ${date}.`,
    transcript: (name, lagna, nakshatra, place, date) => [
      { timeSec: 0, text: `Scanning 2nd Dhana Bhava & 11th Labha gains for ${name} born in ${place}...` },
      { timeSec: 8, text: `Jupiter aspects your 2nd house of accumulated assets, supporting bonus payouts and investment yields.` },
      { timeSec: 18, text: `Under ${nakshatra}, reallocating capital into low-volatility index assets carries long-term gains.` },
      { timeSec: 28, text: `Avoid speculative day trading on Rahu transit days. Timing window peaks around ${date}.` },
      { timeSec: 34, text: `Consult KP financial astrologers for precise capital allocation dates.` }
    ]
  },
  'Health & Energy': {
    house: '1st House (Lagna Vitality) & 6th House (Arogya)',
    primaryPlanet: 'Sun-Mars Energy Alignment',
    dasha: 'Mars Antardasha / Sun Transit',
    themeIcon: '✨',
    summary: (name, lagna, nakshatra, place, date) =>
      `Chart calculated for ${name} (Lagna: ${lagna}, Moon: ${nakshatra} in ${place}): Sun entering 1st Lagna House enhances physical stamina, mental clarity, and metabolic renewal around ${date}.`,
    transcript: (name, lagna, nakshatra, place, date) => [
      { timeSec: 0, text: `Analyzing 1st House Lagna Vitality for ${name} (${lagna} Lagna, ${place})...` },
      { timeSec: 8, text: `Sun and Mars enter favorable trine aspect, replenishing cellular stamina and daily focus.` },
      { timeSec: 18, text: `Moon in ${nakshatra} calms nervous tension and supports holistic wellness routines.` },
      { timeSec: 28, text: `Optimal period around ${date} for starting structured fitness and dietary disciplines.` },
      { timeSec: 36, text: `Maintain your 7-day daily ritual streak for continuous energy alignment.` }
    ]
  }
};

export function generateAstroInsight(profile) {
  const name = profile?.name || 'Explorer';
  const dob = profile?.dob || '1998-05-14';
  const time = profile?.timeOfBirth || '10:30';
  const place = profile?.placeOfBirth || 'Delhi';
  const rawConcern = profile?.concern || 'Career Transition';

  const lagna = calculateLagna(time);
  const nakshatra = calculateNakshatra(dob);
  const seed = hashSeed(`${name}-${dob}-${time}-${place}-${rawConcern}`);

  let concernKey = 'Career Transition';
  if (rawConcern.toLowerCase().includes('love') || rawConcern.toLowerCase().includes('marry')) {
    concernKey = 'Love & Marriage';
  } else if (rawConcern.toLowerCase().includes('wealth') || rawConcern.toLowerCase().includes('money')) {
    concernKey = 'Wealth & Finance';
  } else if (rawConcern.toLowerCase().includes('health')) {
    concernKey = 'Health & Energy';
  }

  const concernData = CONCERN_MAP[concernKey] || CONCERN_MAP['Career Transition'];
  const dayOffset = (seed % 15) + 10;
  const targetDate = `August ${dayOffset}, 2026`;
  const score = 85 + (seed % 13);

  return {
    headline: `Personalized Natal Chart for ${name}`,
    dobSummary: `Lagna: ${lagna} | Moon Nakshatra: ${nakshatra} | DOB: ${dob} (${time}, ${place})`,
    summary: concernData.summary(name, lagna, nakshatra, place, targetDate),
    score,
    nakshatra,
    house: concernData.house,
    planet: concernData.primaryPlanet,
    cards: [
      {
        id: 'concern-card',
        title: `${concernKey} Focus`,
        icon: concernData.themeIcon,
        subtitle: `${concernData.house} • ${concernData.primaryPlanet}`,
        insight: `Chart calculated for ${name} (${lagna} Lagna): ${concernData.summary(name, lagna, nakshatra, place, targetDate)}`,
        actionableAdvice: `Capitalize on your ${nakshatra} transit around ${targetDate}. Initiate key steps during morning Choghadiya.`
      },
      {
        id: 'secondary-card',
        title: 'Secondary Transit Alignment',
        icon: '🪐',
        subtitle: `Dasha: ${concernData.dasha}`,
        insight: `Under your ${concernData.dasha}, active planetary transits support steady progression with minimal obstacle risk.`,
        actionableAdvice: 'Maintain daily morning focus rituals for optimal clarity.'
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
  const rawConcern = profile?.concern || 'Career Transition';

  const lagna = calculateLagna(time);
  const nakshatra = calculateNakshatra(dob);
  const seed = hashSeed(`vid-${name}-${dob}-${time}-${place}-${rawConcern}`);

  let concernKey = 'Career Transition';
  if (rawConcern.toLowerCase().includes('love') || rawConcern.toLowerCase().includes('marry')) {
    concernKey = 'Love & Marriage';
  } else if (rawConcern.toLowerCase().includes('wealth') || rawConcern.toLowerCase().includes('money')) {
    concernKey = 'Wealth & Finance';
  } else if (rawConcern.toLowerCase().includes('health')) {
    concernKey = 'Health & Energy';
  }

  const concernData = CONCERN_MAP[concernKey] || CONCERN_MAP['Career Transition'];
  const dayOffset = (seed % 15) + 10;
  const targetDate = `August ${dayOffset}, 2026`;

  return {
    title: `AI Astro Insight for ${name}`,
    topic: `${concernKey} (${nakshatra})`,
    generatedDate: '18 August 2026',
    duration: '00:45',
    durationSec: 45,
    planetaryContext: `${lagna} Lagna • ${concernData.house}`,
    summaryText: concernData.summary(name, lagna, nakshatra, place, targetDate),
    transcript: concernData.transcript(name, lagna, nakshatra, place, targetDate)
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
  const score = 82 + (seed % 17);
  const nakshatra = NAKSHATRAS[seed % NAKSHATRAS.length];

  return {
    score,
    label: score > 90 ? 'Auspicious Window ✨' : 'Moderate Window ⚖️',
    recommendation: `For ${eventName || 'Event'} on ${date || 'selected date'} at ${time || '10:00 AM'}, transits highlight ${nakshatra} alignment. Favorable for clear decision execution.`,
    choghadiya: 'Shubh Choghadiya Active',
    disclaimer: 'Astrology timing insights are provided for personal reflection and organization.'
  };
}
