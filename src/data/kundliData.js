// Kundli Analysis Data & Mock Calculations for AstroLive 2.0

export const SAMPLE_KUNDLI_PROFILE = {
  id: 'k-saanya-1503',
  name: 'Saanya',
  dob: '2004-03-15',
  dobFormatted: '15 March 2004',
  timeOfBirth: '10:30 AM',
  placeOfBirth: 'Agra, Uttar Pradesh, India',
  gender: 'Female',
  birthTimeAccuracy: 'Exact',
  relation: 'My Kundli',
  createdAt: '18 Aug 2026',
  ascendant: 'Virgo (Kanya)',
  moonSign: 'Cancer (Karka)',
  sunSign: 'Pisces (Meena)',
  nakshatra: 'Pushya Nakshatra',
  pada: '2nd Pada',
  tithi: 'Krishna Paksha Navami',
  ganam: 'Deva Gana',
  yoni: 'Mesha (Ram)',
  nadi: 'Madhya Nadi'
};

export const DEMO_SAVED_KUNDLIS = [
  SAMPLE_KUNDLI_PROFILE,
  {
    id: 'k-partner-demo',
    name: 'Rohan Sharma',
    dob: '2002-11-22',
    dobFormatted: '22 November 2002',
    timeOfBirth: '08:15 AM',
    placeOfBirth: 'Delhi, India',
    gender: 'Male',
    birthTimeAccuracy: 'Exact',
    relation: "Partner's Kundli",
    createdAt: '18 Aug 2026',
    ascendant: 'Taurus (Vrishabha)',
    moonSign: 'Scorpio (Vrishchika)',
    sunSign: 'Scorpio (Vrishchika)',
    nakshatra: 'Anuradha Nakshatra',
    pada: '3rd Pada',
    tithi: 'Shukla Paksha Ekadashi',
    ganam: 'Deva Gana',
    yoni: 'Mruga (Deer)',
    nadi: 'Madhya Nadi'
  }
];

export const NORTH_INDIAN_HOUSES = [
  { houseNum: 1, name: 'Lagna (Self & Vitality)', sign: 'Virgo', lord: 'Mercury', planets: ['Ascendant', 'Mercury'] },
  { houseNum: 2, name: 'Dhana (Wealth & Family)', sign: 'Libra', lord: 'Venus', planets: ['Venus'] },
  { houseNum: 3, name: 'Sahaja (Siblings & Courage)', sign: 'Scorpio', lord: 'Mars', planets: ['Mars'] },
  { houseNum: 4, name: 'Sukha (Home & Mother)', sign: 'Sagittarius', lord: 'Jupiter', planets: ['Rahu'] },
  { houseNum: 5, name: 'Suta (Intellect & Children)', sign: 'Capricorn', lord: 'Saturn', planets: ['Saturn'] },
  { houseNum: 6, name: 'Ari (Health & Competition)', sign: 'Aquarius', lord: 'Saturn', planets: [] },
  { houseNum: 7, name: 'Kalatra (Marriage & Partners)', sign: 'Pisces', lord: 'Jupiter', planets: ['Sun'] },
  { houseNum: 8, name: 'Randhra (Longevity & Transits)', sign: 'Aries', lord: 'Mars', planets: [] },
  { houseNum: 9, name: 'Bhagya (Fortune & Higher Wisdom)', sign: 'Taurus', lord: 'Venus', planets: ['Ketu'] },
  { houseNum: 10, name: 'Karma (Career & Reputation)', sign: 'Gemini', lord: 'Mercury', planets: ['Jupiter'] },
  { houseNum: 11, name: 'Labha (Gains & Network)', sign: 'Cancer', lord: 'Moon', planets: ['Moon'] },
  { houseNum: 12, name: 'Vyaya (Subconscious & Expenses)', sign: 'Leo', lord: 'Sun', planets: [] }
];

export const PLANETARY_POSITIONS = [
  { planet: 'Sun (Surya)', sign: 'Pisces (Meena)', house: '7th House', degree: '18.4°', nakshatra: 'Revati', status: 'Direct', isBenefic: true },
  { planet: 'Moon (Chandra)', sign: 'Cancer (Karka)', house: '11th House', degree: '12.8°', nakshatra: 'Pushya', status: 'Own Sign', isBenefic: true },
  { planet: 'Mars (Mangal)', sign: 'Scorpio (Vrishchika)', house: '3rd House', degree: '05.2°', nakshatra: 'Anuradha', status: 'Own Sign', isBenefic: true },
  { planet: 'Mercury (Budh)', sign: 'Virgo (Kanya)', house: '1st House', degree: '24.1°', nakshatra: 'Chitra', status: 'Exalted', isBenefic: true },
  { planet: 'Jupiter (Guru)', sign: 'Gemini (Mithuna)', house: '10th House', degree: '08.6°', nakshatra: 'Punarvasu', status: 'Benefic Aspect', isBenefic: true },
  { planet: 'Venus (Shukra)', sign: 'Libra (Tula)', house: '2nd House', degree: '14.3°', nakshatra: 'Swati', status: 'Own Sign', isBenefic: true },
  { planet: 'Saturn (Shani)', sign: 'Capricorn (Makara)', house: '5th House', degree: '29.0°', nakshatra: 'Dhanishta', status: 'Own Sign', isBenefic: true },
  { planet: 'Rahu (North Node)', sign: 'Sagittarius (Dhanu)', house: '4th House', degree: '03.7°', nakshatra: 'Mula', status: 'Shadow Node', isBenefic: false },
  { planet: 'Ketu (South Node)', sign: 'Taurus (Vrishabha)', house: '9th House', degree: '03.7°', nakshatra: 'Krittika', status: 'Shadow Node', isBenefic: false }
];

export const KUNDLI_PREDICTION_CATEGORIES = [
  {
    id: 'career',
    name: 'Career & Business',
    icon: '💼',
    tendency: 'Your chart is traditionally interpreted as favoring structured, analytical, and communication-heavy professional roles.',
    strengths: ['Strategic planning & data analysis', 'Clear verbal & written communication', 'High organizational focus'],
    challenges: ['Tendency to over-analyze options', 'Impatience with unstructured workflows'],
    suitableFields: 'Technology, Product Strategy, Corporate Finance, Media, Publishing, & Advisory roles.',
    upcomingPhase: 'Your upcoming 2026–2027 transit phase is favorable for professional expansion and executive recognition.',
    disclaimer: 'Astrological interpretations provide symbolic perspective and should be complemented by professional career planning.'
  },
  {
    id: 'love',
    name: 'Love & Relationships',
    icon: '❤️',
    tendency: 'According to this chart, Moon in Cancer fosters deep emotional intuition and high loyalty in personal partnerships.',
    strengths: ['Empathetic listening', 'Long-term relationship commitment', 'Strong emotional stability'],
    challenges: ['Guarded initial boundary setting', 'Sensitivity to unspoken mood changes'],
    suitableFields: 'Harmonious partnerships, shared long-term goal setting, and joint household planning.',
    upcomingPhase: 'Venus transits in late 2026 highlight a peaceful, stabilizing period for long-term relational commitment.',
    disclaimer: 'Relationship harmony depends on open communication, mutual respect, and shared effort.'
  },
  {
    id: 'finance',
    name: 'Finance & Wealth',
    icon: '💰',
    tendency: 'Jupiter aspecting the 10th house paired with Venus in the 2nd house indicates strong disciplined saving habits.',
    strengths: ['Prudent budgeting', 'Long-term asset accumulation focus', 'Aversion to reckless speculation'],
    challenges: ['Over-caution with growth opportunities'],
    suitableFields: 'Index funds, real estate assets, and steady compounding investment strategies.',
    upcomingPhase: 'Traditional interpretations suggest a positive financial consolidation window across mid-2027.',
    disclaimer: 'This section provides traditional astrological interpretations and does not constitute guaranteed returns or certified financial advice.'
  },
  {
    id: 'education',
    name: 'Education & Learning',
    icon: '🎓',
    tendency: 'Exalted Mercury in the 1st house supports rapid technical learning, research aptitude, and complex skill acquisition.',
    strengths: ['High retention of technical concepts', 'Methodical study habits', 'Curiosity for specialized domains'],
    challenges: ['Occasional perfectionist burn-out'],
    suitableFields: 'Advanced professional certifications, graduate studies, and technical domain mastery.',
    upcomingPhase: 'Excellent academic window active through late 2026 for exams, certifications, and skill upgrades.',
    disclaimer: 'Academic achievement stems from dedicated study, practice, and perseverance.'
  },
  {
    id: 'family',
    name: 'Family & Heritage',
    icon: '🏠',
    tendency: 'Moon in Pushya Nakshatra emphasizes protective family bonds and ancestral values.',
    strengths: ['Nurturing presence', 'Family event organization', 'Generational wisdom appreciation'],
    challenges: ['Carrying emotional burdens of family members'],
    suitableFields: 'Family gatherings, Griha Pravesh home Pujas, and domestic harmony.',
    upcomingPhase: 'Stable, supportive family atmosphere expected during the upcoming planetary cycle.',
    disclaimer: 'Family relationships thrive on mutual understanding and patience.'
  },
  {
    id: 'personality',
    name: 'Personality & Persona',
    icon: '🧘',
    tendency: 'Virgo Ascendant imparts a polished, articulate, and thoughtful personality with high attention to detail.',
    strengths: ['High integrity', 'Problem-solving mindset', 'Calm demeanor under pressure'],
    challenges: ['Self-critical inner dialogue'],
    suitableFields: 'Mindfulness practices, structured daily habits, and personal pattern journaling.',
    upcomingPhase: 'Personal clarity and self-confidence strengthen across your current Jupiter sub-period.',
    disclaimer: 'Personal growth is a continuous journey of self-discovery and habit cultivation.'
  },
  {
    id: 'travel',
    name: 'Travel & Relocation',
    icon: '✈️',
    tendency: '9th house Ketu transit paired with 11th house Moon favors occasional purposeful international travel.',
    strengths: ['Cultural adaptability', 'Appreciation for sacred destinations', 'Organized travel planning'],
    challenges: ['Mild travel fatigue during Rahu sub-periods'],
    suitableFields: 'Work conferences, spiritual retreats, and milestone vacations.',
    upcomingPhase: 'Short-haul travel windows active in late Q3 2026.',
    disclaimer: 'Travel plans should be made with proper logistics, safety precautions, and travel documentation.'
  }
];

export const KUNDLI_TIMELINE_STAGES = [
  { year: '2024', stage: 'Foundation Phase', theme: 'Skill consolidation & habit building under Saturn 5th house transit.', icon: '🌱' },
  { year: '2025', stage: 'Learning & Growth', theme: 'Exalted Mercury sub-period accelerating specialized technical learning.', icon: '📘' },
  { year: '2026', stage: 'Strategic Transition', theme: 'Jupiter 10th house movement favoring professional application & expansion.', icon: '⚡' },
  { year: '2027', stage: 'Consolidation & Wealth', theme: '2nd house Dhana aspect yielding accumulated stability and asset gains.', icon: '🏛️' },
  { year: '2028', stage: 'Expansion & Mastery', theme: '11th house Labha activation bringing wider network recognition and milestones.', icon: '🚀' }
];

export const UPCOMING_PERIODS = [
  { period: 'Next 30 Days', theme: 'Focus on completing unfinished projects before initiating new commitments.', highlight: 'Mercury Direct Phase' },
  { period: 'Next 3 Months', theme: 'Favorable professional development phase with high interview reception.', highlight: 'Jupiter 10th House Aspect' },
  { period: 'Next 6 Months', theme: 'Stabilization in personal relationships and home environment.', highlight: 'Venus Harmonious Transit' },
  { period: 'Next 12 Months', theme: 'Major milestone phase for long-term career positioning and financial yield.', highlight: 'Annual Mahadasha Alignment' }
];

export const SAMPLE_AI_KUNDLI_QA = [
  {
    query: 'What does my 10th house indicate for career?',
    response: 'According to the astrological interpretation of your chart, your 10th house is located in Gemini with Jupiter placed. This traditionally indicates strong aptitude for communication, product strategy, management, and technology-driven leadership.'
  },
  {
    query: 'What are my relationship tendencies?',
    response: 'Your chart features Moon in Cancer (Pushya Nakshatra) and Sun in Pisces in the 7th house. Astrological interpretations describe this as fostering deep emotional loyalty, empathy, and a preference for authentic, long-term commitment.'
  },
  {
    query: 'What does my Moon sign represent?',
    response: 'Your Moon sign is Cancer (Karka Rashi). In Vedic astrology, the Moon governs emotional processing, intuition, and inner peace. Placed in its own sign of Cancer in Pushya Nakshatra, it suggests strong emotional resilience.'
  },
  {
    query: 'What should I focus on this year?',
    response: 'Your 2026 planetary transits highlight a strong focus on professional skill consolidation (10th house Jupiter) and maintaining structured daily wellness routines.'
  }
];

export const KUNDLI_BUSINESS_KPIS = [
  { metric: 'Kundli Creation Rate', value: '42.8%', note: 'Users generating birth profile on D1' },
  { metric: 'Form Completion Rate', value: '88.4%', note: 'High completion with friendly time picker' },
  { metric: 'Daily Insight Open Rate', value: '34.2%', note: 'Personalized horoscope retention loop' },
  { metric: 'Kundli → Astrologer Conversion', value: '14.6%', note: 'Direct paid consultation conversion' },
  { metric: 'Kundli → Plus Subscription', value: '9.2%', note: 'Premium locked insight upgrades' },
  { metric: '30-Day Kundli Retention', value: '41.5%', note: 'Recurring return for transit updates' }
];
