export const INITIAL_USER_PROFILE = {
  name: 'Saanya',
  dob: '1998-10-14',
  tob: '08:30',
  city: 'New Delhi, India',
  language: 'Hindi • English',
  concern: 'Career Transition',
  zodiac: 'Libra ♎',
  ascendant: 'Scorpio Ascendant ♏',
  currentMahadasha: 'Jupiter - Saturn Dasha (Phase of Career Expansion & Structural Shifts)',
  streakDays: 7,
  astroCoins: 450,
  membership: 'PLUS', // FREE, PLUS, PREMIUM
  joinedDate: '2026-01-15'
};

export const MOCK_ASTROLOGERS = [
  {
    id: 'astro-1',
    name: 'Acharya Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    specialization: 'Vedic & Career Astrology',
    specialties: ['Career Transition', 'Job Change Timing', 'Financial Growth'],
    languages: ['Hindi', 'English'],
    experience: 12,
    rating: 4.9,
    consultationsCount: 3420,
    pricePerMin: 18,
    isAvailable: true,
    bio: 'Renowned Vedic astrologer with over 12 years of experience analyzing career transits, Dasha periods, and planetary alignments for executive growth.',
    astroProofStats: {
      predictionsLogged: 128,
      userConfirmed: 87,
      partiallyConfirmed: 21,
      notConfirmed: 20,
      confirmationRate: 68,
      repeatRate: 84
    },
    matchReason: 'Specializes in career transition questions, speaks Hindi & English, fits your budget (₹18/min), and is available now.'
  },
  {
    id: 'astro-2',
    name: 'Dr. Devraj Shastri',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    specialization: 'KP System & Numerology',
    specialties: ['Business Decisions', 'Wealth & Finance', 'Stock & Trade Timing'],
    languages: ['Hindi', 'English', 'Gujarati'],
    experience: 16,
    rating: 4.95,
    consultationsCount: 5120,
    pricePerMin: 25,
    isAvailable: true,
    bio: 'KP System pioneer with precise sub-lord calculation techniques for timing major business investments and corporate transitions.',
    astroProofStats: {
      predictionsLogged: 210,
      userConfirmed: 154,
      partiallyConfirmed: 32,
      notConfirmed: 24,
      confirmationRate: 73,
      repeatRate: 88
    },
    matchReason: 'High accuracy rate in financial timing, speaks Hindi & English, and fits budget range.'
  },
  {
    id: 'astro-3',
    name: 'Tarot Reader Ananya Roy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    specialization: 'Tarot & Relationship Intuitive',
    specialties: ['Love & Relationships', 'Marriage Compatibility', 'Personal Growth'],
    languages: ['English', 'Bengali', 'Hindi'],
    experience: 8,
    rating: 4.85,
    consultationsCount: 2150,
    pricePerMin: 15,
    isAvailable: true,
    bio: 'Empathetic intuitive Tarot reader specializing in emotional clarity, relationship dynamics, and life decision crossroads.',
    astroProofStats: {
      predictionsLogged: 95,
      userConfirmed: 62,
      partiallyConfirmed: 18,
      notConfirmed: 15,
      confirmationRate: 65,
      repeatRate: 79
    },
    matchReason: 'Ideal for relationship clarity & intuition guidance, affordable rate.'
  },
  {
    id: 'astro-4',
    name: 'Pandit Rajesh Vastu Master',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    specialization: 'Vastu Shastra & Lal Kitab',
    specialties: ['Home Vastu', 'Office Energy', 'Lal Kitab Remedies'],
    languages: ['Hindi', 'Punjabi'],
    experience: 20,
    rating: 4.92,
    consultationsCount: 6300,
    pricePerMin: 22,
    isAvailable: false,
    bio: 'Expert in non-demolition Vastu remedies and instant Lal Kitab solutions for family harmony and home energy enhancement.',
    astroProofStats: {
      predictionsLogged: 180,
      userConfirmed: 132,
      partiallyConfirmed: 28,
      notConfirmed: 20,
      confirmationRate: 73,
      repeatRate: 86
    },
    matchReason: 'Top rated for structural and energy layout guidance.'
  },
  {
    id: 'astro-5',
    name: 'Guruji K.V. Ramanathan',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    specialization: 'Nadi Astrology & Dasha Specialist',
    specialties: ['Karma Alignment', 'Life Purpose', 'Education & Travel'],
    languages: ['Tamil', 'Telugu', 'English', 'Hindi'],
    experience: 22,
    rating: 4.98,
    consultationsCount: 8900,
    pricePerMin: 30,
    isAvailable: true,
    bio: 'Senior Nadi astrology master reading ancient leaf manuscripts for exact life path directions and karmic lessons.',
    astroProofStats: {
      predictionsLogged: 340,
      userConfirmed: 268,
      partiallyConfirmed: 42,
      notConfirmed: 30,
      confirmationRate: 78,
      repeatRate: 91
    },
    matchReason: 'Master astrologer with highest verified outcome score.'
  },
  {
    id: 'astro-6',
    name: 'Acharya Meera Joshi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    specialization: 'Prashna Kundli & Horary',
    specialties: ['Urgent Decision', 'Lost Objects', 'Immediate Timing'],
    languages: ['Hindi', 'Marathi', 'English'],
    experience: 10,
    rating: 4.88,
    consultationsCount: 2890,
    pricePerMin: 16,
    isAvailable: true,
    bio: 'Specialist in instantaneous Horary (Prashna) calculations for specific time-bound questions.',
    astroProofStats: {
      predictionsLogged: 112,
      userConfirmed: 76,
      partiallyConfirmed: 20,
      notConfirmed: 16,
      confirmationRate: 67,
      repeatRate: 81
    },
    matchReason: 'Quick response expert for urgent single questions.'
  },
  {
    id: 'astro-7',
    name: 'Sunil Kumar Astro',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    specialization: 'Financial Astrology & Stock Timing',
    specialties: ['Investments', 'Business Expansion', 'Crypto & Forex'],
    languages: ['English', 'Hindi'],
    experience: 14,
    rating: 4.91,
    consultationsCount: 4100,
    pricePerMin: 28,
    isAvailable: true,
    bio: 'Combines planetary cycle models with financial market trends for high-net-worth business owners and traders.',
    astroProofStats: {
      predictionsLogged: 160,
      userConfirmed: 118,
      partiallyConfirmed: 24,
      notConfirmed: 18,
      confirmationRate: 73,
      repeatRate: 85
    },
    matchReason: 'Financial specialist for business investments.'
  },
  {
    id: 'astro-8',
    name: 'Dr. Radhika Sen',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    specialization: 'Gemology & Remedial Vedic',
    specialties: ['Gemstone Selection', 'Chakra Balancing', 'Mantra Remedies'],
    languages: ['Hindi', 'Bengali', 'English'],
    experience: 15,
    rating: 4.94,
    consultationsCount: 4800,
    pricePerMin: 20,
    isAvailable: true,
    bio: 'Certified gemologist aligning precious stones with planetary strength to mitigate negative transit effects.',
    astroProofStats: {
      predictionsLogged: 145,
      userConfirmed: 104,
      partiallyConfirmed: 23,
      notConfirmed: 18,
      confirmationRate: 71,
      repeatRate: 87
    },
    matchReason: 'Remedial science & gemstone recommendation specialist.'
  }
];

export const INITIAL_PREDICTIONS = [
  {
    id: 'pred-1',
    astrologerId: 'astro-1',
    astrologerName: 'Acharya Priya Sharma',
    astrologerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    dateLogged: '2026-07-28',
    predictionWindow: '28 Jul 2026 – 28 Aug 2026',
    category: 'Career',
    statement: 'You may receive an unexpected job opportunity or interview invitation from a tier-1 company within 30 days during your Sun-Jupiter sub-transit.',
    status: 'Pending Verification', // 'Pending Verification', 'Verified by User', 'Partially Verified', 'Not Occurred'
    userNote: '',
    verifiedDate: null,
    hashId: '0x8f9a2c3b'
  },
  {
    id: 'pred-2',
    astrologerId: 'astro-2',
    astrologerName: 'Dr. Devraj Shastri',
    astrologerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    dateLogged: '2026-05-10',
    predictionWindow: '10 May 2026 – 10 Jun 2026',
    category: 'Finance',
    statement: 'A pending financial payment or bonus approval will materialize before June 15th.',
    status: 'Verified by User',
    userNote: 'Yes — received annual bonus payout on June 12th as predicted!',
    verifiedDate: '2026-06-12',
    hashId: '0x4e7b1a9d'
  },
  {
    id: 'pred-3',
    astrologerId: 'astro-1',
    astrologerName: 'Acharya Priya Sharma',
    astrologerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    dateLogged: '2026-02-14',
    predictionWindow: '14 Feb 2026 – 31 Mar 2026',
    category: 'Career',
    statement: 'Leadership will acknowledge your team project and offer a specialized role expansion.',
    status: 'Verified by User',
    userNote: 'Promoted to Lead Product Strategist in March.',
    verifiedDate: '2026-03-24',
    hashId: '0x1c3f8e9b'
  },
  {
    id: 'pred-4',
    astrologerId: 'astro-5',
    astrologerName: 'Guruji K.V. Ramanathan',
    astrologerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    dateLogged: '2026-01-20',
    predictionWindow: '20 Jan 2026 – 28 Feb 2026',
    category: 'Travel',
    statement: 'An international travel assignment or conference invitation will be proposed.',
    status: 'Partially Verified',
    userNote: 'Travel was offered to domestic tech summit instead of international.',
    verifiedDate: '2026-02-20',
    hashId: '0x9b2a7d4c'
  },
  {
    id: 'pred-5',
    astrologerId: 'astro-3',
    astrologerName: 'Tarot Reader Ananya Roy',
    astrologerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    dateLogged: '2026-03-01',
    predictionWindow: '1 Mar 2026 – 31 Mar 2026',
    category: 'Love',
    statement: 'A meaningful conversation with a close person will open a new chapter in your emotional life within 30 days.',
    status: 'Verified by User',
    userNote: 'Had a deeply honest talk with my partner on March 18 — completely shifted our relationship dynamic.',
    verifiedDate: '2026-03-19',
    hashId: '0x3c7e1f2a'
  },
  {
    id: 'pred-6',
    astrologerId: 'astro-2',
    astrologerName: 'Dr. Devraj Shastri',
    astrologerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    dateLogged: '2026-04-05',
    predictionWindow: '5 Apr 2026 – 5 May 2026',
    category: 'Business',
    statement: 'A new business partnership proposal or collaboration offer will emerge before the end of April.',
    status: 'Not Occurred',
    userNote: 'No partnership offer came. Remained with existing team setup.',
    verifiedDate: '2026-05-06',
    hashId: '0xa1b4c8d2'
  },
  {
    id: 'pred-7',
    astrologerId: 'astro-4',
    astrologerName: 'Pt. Suresh Verma',
    astrologerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
    dateLogged: '2026-04-20',
    predictionWindow: '20 Apr 2026 – 20 May 2026',
    category: 'Education',
    statement: 'You may receive positive news about a professional certification or academic application within 30 days.',
    status: 'Verified by User',
    userNote: 'Received acceptance into the Executive Leadership Program on May 8.',
    verifiedDate: '2026-05-08',
    hashId: '0xf5d2e9b1'
  },
  {
    id: 'pred-8',
    astrologerId: 'astro-3',
    astrologerName: 'Tarot Reader Ananya Roy',
    astrologerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    dateLogged: '2026-06-01',
    predictionWindow: '1 Jun 2026 – 30 Jun 2026',
    category: 'Love',
    statement: 'A period of emotional distance may resolve and bring new warmth to an important relationship before June ends.',
    status: 'Partially Verified',
    userNote: 'Things improved but slowly — more gradual than predicted, still ongoing.',
    verifiedDate: '2026-07-01',
    hashId: '0x7e3a5c0d'
  },
  {
    id: 'pred-9',
    astrologerId: 'astro-2',
    astrologerName: 'Dr. Devraj Shastri',
    astrologerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    dateLogged: '2026-06-20',
    predictionWindow: '20 Jun 2026 – 20 Jul 2026',
    category: 'Finance',
    statement: 'A financial clarity moment or unexpected inflow of funds may occur by mid-July.',
    status: 'Not Occurred',
    userNote: 'No unexpected inflow occurred during this period.',
    verifiedDate: '2026-07-21',
    hashId: '0x2d8f6a3e'
  },
  {
    id: 'pred-10',
    astrologerId: 'astro-1',
    astrologerName: 'Acharya Priya Sharma',
    astrologerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    dateLogged: '2026-07-15',
    predictionWindow: '15 Jul 2026 – 15 Aug 2026',
    category: 'Career',
    statement: 'You may be approached for a mentorship or advisory role within your professional circle in the next 30 days.',
    status: 'Pending Verification',
    userNote: '',
    verifiedDate: null,
    hashId: '0xc4b9e7f0'
  }
];

export const INITIAL_JOURNEY_EVENTS = [
  {
    id: 'event-1',
    date: '2026-08-12',
    month: 'August 2026',
    category: 'Career',
    title: 'Job Interview — VP of Product',
    type: 'life_event',
    location: 'Gurugram / Remote Call',
    mood: '😊 Positive',
    outcome: 'Successful',
    description: 'Executive pitch interview for VP of Product role. Felt confident and well-prepared.',
    astrologicalContext: 'Sun-Jupiter alignment in 10th house of profession.',
    astrologicalTransit: 'Sun-Jupiter 10th House Transit',
    userReflection: 'Felt calm and articulate during the key strategy question segment.',
    linkedPredictionId: 'pred-1'
  },
  {
    id: 'event-2',
    date: '2026-07-28',
    month: 'July 2026',
    category: 'Career',
    title: 'Consultation with Priya Sharma',
    type: 'consultation',
    location: 'AstroLive Call',
    mood: '😊 Positive',
    outcome: 'Successful',
    description: 'Discussed career crossroads and senior role applications. Sun transit in 10th house.',
    astrologicalContext: 'Sun & Jupiter transit aligned in 10th house of profession.',
    astrologicalTransit: 'Sun 10th House Alignment',
    userReflection: 'Feeling much more confident about resigning from current role to take up tech leadership.'
  },
  {
    id: 'event-3',
    date: '2026-07-21',
    month: 'July 2026',
    category: 'Love',
    title: 'Started a New Relationship Chapter',
    type: 'life_event',
    location: 'New Delhi',
    mood: '😊 Positive',
    outcome: 'Successful',
    description: 'Agreed on long-term co-living and shared goals with partner.',
    astrologicalContext: 'Venus transit through 7th house of partnerships.',
    astrologicalTransit: 'Venus 7th House Direct Transit',
    userReflection: 'Extremely peaceful conversation, resolved previous uncertainty.',
    linkedPredictionId: 'pred-5'
  },
  {
    id: 'event-4',
    date: '2026-06-12',
    month: 'June 2026',
    category: 'Finance',
    title: 'Bonus Payout & Investment',
    type: 'life_event',
    location: 'New Delhi',
    mood: '😊 Positive',
    outcome: 'Successful',
    description: 'Annual performance bonus released. Allocated funds to long-term index funds.',
    astrologicalContext: 'Jupiter aspecting 2nd house of accumulated wealth.',
    astrologicalTransit: 'Jupiter 2nd House Aspect',
    userReflection: 'AstroProof prediction by Dr. Shastri materialized right on time.',
    linkedPredictionId: 'pred-2'
  },
  {
    id: 'event-5',
    date: '2026-05-18',
    month: 'May 2026',
    category: 'Education',
    title: 'Completed Final Examination',
    type: 'life_event',
    location: 'Online Institute',
    mood: '😊 Positive',
    outcome: 'Successful',
    description: 'Passed AI Product Strategy final examination with distinction.',
    astrologicalContext: 'Mercury direct movement in 5th house of intellect.',
    astrologicalTransit: 'Mercury 5th House Direct',
    userReflection: 'Hard work paid off! Ready for executive roles.',
    linkedPredictionId: 'pred-7'
  },
  {
    id: 'event-6',
    date: '2026-04-18',
    month: 'April 2026',
    category: 'Personal Growth',
    title: 'Completed Executive Leadership Program',
    type: 'life_event',
    location: 'Delhi NCR',
    mood: '😊 Positive',
    outcome: 'Successful',
    description: 'Received certificate in AI Strategy and product scaling.',
    astrologicalContext: 'Mercury retrograde in 5th house encouraged review & study completion.',
    astrologicalTransit: 'Mercury Retrograde 5th House',
    userReflection: 'Felt like a major milestone in strengthening my resume.'
  },
  {
    id: 'event-7',
    date: '2026-03-24',
    month: 'March 2026',
    category: 'Career',
    title: 'Promoted to Lead Product Strategist',
    type: 'life_event',
    location: 'Office',
    mood: '😊 Positive',
    outcome: 'Successful',
    description: 'Internal promotion announcement during quarterly review meeting.',
    astrologicalContext: 'Mars entering 10th house provided drive and recognition.',
    astrologicalTransit: 'Mars 10th House Transit',
    userReflection: 'AstroProof verified prediction.',
    linkedPredictionId: 'pred-3'
  },
  {
    id: 'event-8',
    date: '2026-02-20',
    month: 'February 2026',
    category: 'Travel',
    title: 'Domestic Tech Summit Travel',
    type: 'life_event',
    location: 'Bengaluru',
    mood: '😊 Positive',
    outcome: 'Partially successful',
    description: 'Attended regional tech summit as keynote panelist.',
    astrologicalContext: '9th house transit of higher learning and travel.',
    astrologicalTransit: '9th House Travel Aspect',
    userReflection: 'Great networking event despite travel fatigue.',
    linkedPredictionId: 'pred-4'
  },
  {
    id: 'event-9',
    date: '2026-02-14',
    month: 'February 2026',
    category: 'Love',
    title: 'Relationship Reset & Alignment',
    type: 'life_event',
    location: 'Home',
    mood: '😐 Neutral',
    outcome: 'Partially successful',
    description: 'Had a deep conversation with partner regarding long-term relocation goals.',
    astrologicalContext: 'Venus conjunct Jupiter in 7th house of partnerships.',
    astrologicalTransit: 'Venus-Jupiter 7th House Conjunction',
    userReflection: 'Cleared up months of unspoken hesitation.'
  },
  {
    id: 'event-10',
    date: '2026-01-15',
    month: 'January 2026',
    category: 'Career',
    title: 'Career Concern Logged',
    type: 'system_log',
    location: 'AstroLive App',
    mood: '😐 Neutral',
    outcome: 'Successful',
    description: 'First logged career transition goal in AstroLive 2.0.',
    astrologicalContext: 'Saturn transit in 4th house triggering core stability reflections.',
    astrologicalTransit: 'Saturn 4th House Stability Aspect',
    userReflection: 'Started tracking personal patterns systematically.'
  }
];

export const INITIAL_PATTERNS = [
  {
    id: 'pattern-career',
    category: 'Career',
    title: 'Career Transitions & Decision Windows',
    icon: '💼',
    relatedEventsCount: 4,
    majorTransitionsCount: 2,
    consultationsCount: 4,
    summary: 'Several of your recorded career events occurred during similar periods in your personal astrology timeline.',
    observation: 'Your career transitions repeatedly coincide with 10th house Sun-Jupiter transits.',
    timeRange: '2024 – 2026',
    events: [
      { year: '2024', title: 'Job Search & Skill Upgrade', context: 'Saturn 4th house reflection' },
      { year: '2025', title: 'Internship & Leadership Shift', context: 'Jupiter aspect 10th house' },
      { year: '2026', title: 'Lead Product Promotion', context: 'Mars 10th house transit' },
      { year: '2026', title: 'VP of Product Interview', context: 'Sun-Jupiter 10th house alignment' }
    ],
    aiInsight: "You've logged four major career decisions over the past two years. Three occurred during periods you previously marked as high-change periods in your personal journey.",
    reflectionQuestion: "What felt similar about your mindset during these career transition moments?"
  },
  {
    id: 'pattern-love',
    category: 'Love',
    title: 'Relationship Clarity & Venus Direct Cycles',
    icon: '❤️',
    relatedEventsCount: 2,
    majorTransitionsCount: 1,
    consultationsCount: 2,
    summary: 'Personal reflections show heightened relationship alignment during Venus 7th house transits.',
    observation: 'Deep conversations and alignment decisions peak when Venus transits your 7th house.',
    timeRange: 'Feb 2026 – Jul 2026',
    events: [
      { year: 'Feb 2026', title: 'Relocation Alignment Talk', context: 'Venus-Jupiter 7th House' },
      { year: 'Jul 2026', title: 'Co-living Relationship Chapter', context: 'Venus 7th House Direct' }
    ],
    aiInsight: "Your logged relationship milestones align with moments of personal reflection following Venus direct phases.",
    reflectionQuestion: "How has your communication evolved between February and July?"
  },
  {
    id: 'pattern-education',
    category: 'Education',
    title: 'Academic Mastery & Certification Timing',
    icon: '🎓',
    relatedEventsCount: 2,
    majorTransitionsCount: 1,
    consultationsCount: 1,
    summary: 'Exam completions and certification milestones align with 5th house Mercury direct windows.',
    observation: 'High focus and course completions occur during Mercury study windows.',
    timeRange: 'Apr 2026 – May 2026',
    events: [
      { year: 'Apr 2026', title: 'Executive Leadership Course', context: 'Mercury Retrograde Review' },
      { year: 'May 2026', title: 'AI Strategy Certification Exam', context: 'Mercury Direct 5th House' }
    ],
    aiInsight: "Course completions consistently follow periods of structured review logged in your journal.",
    reflectionQuestion: "Which learning habits gave you the greatest clarity before exams?"
  },
  {
    id: 'pattern-finance',
    category: 'Finance',
    title: 'Wealth Acceleration & Asset Allocation',
    icon: '💰',
    relatedEventsCount: 1,
    majorTransitionsCount: 1,
    consultationsCount: 2,
    summary: 'Bonus payouts and major index fund investments overlap with 2nd house Jupiter aspects.',
    observation: 'Financial allocation confidence peaks during Jupiter 2nd house transits.',
    timeRange: 'Jun 2026',
    events: [
      { year: 'Jun 2026', title: 'Annual Bonus Payout & Index Investment', context: 'Jupiter 2nd House Aspect' }
    ],
    aiInsight: "Your financial decisions demonstrate high alignment between AstroProof predictions and actual payout dates.",
    reflectionQuestion: "What long-term wealth goals would you like to plan for next?"
  }
];


export const INITIAL_GUARD_EVENTS = [
  {
    id: 'guard-1',
    name: 'Job Interview — VP of Product',
    date: '2026-08-12',
    time: '10:00 AM',
    location: 'Gurugram / Remote Call',
    category: 'Career',
    astrologicalTimingInsight: 'Jupiter aligned favorably with Mercury between 09:45 AM – 11:30 AM. Excellent planetary window for persuasive communication and executive presence.',
    status: 'Upcoming',
    notificationSent: true
  },
  {
    id: 'guard-2',
    name: 'Startup Seed Pitch',
    date: '2026-08-28',
    time: '02:30 PM',
    location: 'New Delhi',
    category: 'Business',
    astrologicalTimingInsight: 'Moon in 11th house of gains. Good alignment for investor negotiations.',
    status: 'Upcoming',
    notificationSent: false
  },
  {
    id: 'guard-3',
    name: 'Commercial Lease Agreement Signing',
    date: '2026-09-05',
    time: '11:15 AM',
    location: 'Noida Office',
    category: 'Contract Signing',
    astrologicalTimingInsight: 'Shubh Choghadiya window active between 10:45 AM and 12:15 PM.',
    status: 'Upcoming',
    notificationSent: false
  }
];

export const REWARD_WHEEL_ITEMS = [
  { label: '50 AstroCoins', type: 'coins', value: 50, color: '#f5c242' },
  { label: '₹50 Consult Off', type: 'discount', value: 50, color: '#a855f7' },
  { label: 'Better Luck Next Time', type: 'none', value: 0, color: '#334155' },
  { label: 'AI Mini Insight', type: 'insight', value: 'free_ai', color: '#38bdf8' },
  { label: 'Better Luck Next Time', type: 'none', value: 0, color: '#1e293b' },
  { label: '100 AstroCoins', type: 'coins', value: 100, color: '#10b981' },
  { label: 'Better Luck Next Time', type: 'none', value: 0, color: '#334155' },
  { label: 'Free Question', type: 'question', value: 'free_question', color: '#f97316' },
  { label: 'Better Luck Next Time', type: 'none', value: 0, color: '#1e293b' },
  { label: '15% Off Plus', type: 'discount', value: 15, color: '#ec4899' },
  { label: 'Better Luck Next Time', type: 'none', value: 0, color: '#334155' },
  { label: '25 AstroCoins', type: 'coins', value: 25, color: '#84cc16' }
];

export const WHEEL_WEIGHT_POOL = [
  0, 0,
  1,
  2, 2, 2, 2, 2,
  3,
  4, 4, 4, 4, 4,
  5,
  6, 6, 6,
  7, 7,
  8, 8, 8,
  9,
  10, 10, 10,
  11, 11
];

export const ASTROPROOF_BADGES = [
  { id: 'ten_predictions', icon: '\u2b50', label: '10 Predictions', desc: 'Recorded 10 AstroProof predictions', earned: true },
  { id: 'outcome_reporter', icon: '\ud83d\udcca', label: 'Outcome Reporter', desc: 'Submitted outcomes for 5+ predictions', earned: true },
  { id: 'fifty_predictions', icon: '\ud83c\udfc6', label: '50 Predictions', desc: 'Recorded 50 AstroProof predictions', earned: false },
  { id: 'astroproof_explorer', icon: '\ud83c\udf1f', label: 'AstroProof Explorer', desc: 'Completed the full AstroProof flow end-to-end', earned: false }
];

export const SUBSCRIPTION_TIERS = [
  {
    id: 'free',
    name: 'FREE',
    price: '₹0',
    yearlyPrice: null,
    priceMonthly: 0,
    priceYearly: 0,
    effectiveMonthly: 0,
    yearlySavings: 0,
    period: 'forever',
    description: 'Basic cosmic exploration for casual updates.',
    badge: null,
    badgeColor: null,
    icon: '🌙',
    consultationCredits: 0,
    coinsMultiplier: 1,
    consultationDiscount: 0,
    features: [
      'Daily horoscope',
      'Basic Astro Journey',
      'Limited AI insights (1/month)',
      'Basic astrologer discovery',
      'Daily check-in',
      'Basic rewards (5 AstroCoins/day)'
    ],
    buttonText: 'Current Plan',
    disabled: true,
    accentColor: 'border-slate-700'
  },
  {
    id: 'plus',
    name: 'PLUS',
    price: '₹199',
    yearlyPrice: '₹1,999',
    priceMonthly: 199,
    priceYearly: 1999,
    effectiveMonthly: 167,
    yearlySavings: 389,
    period: 'per month',
    description: 'Personalized growth engine for active life planning.',
    badge: 'MOST POPULAR',
    badgeColor: 'amber',
    icon: '✨',
    consultationCredits: 100,
    coinsMultiplier: 2,
    consultationDiscount: 10,
    features: [
      'Everything in Free',
      'More personalized AI insights',
      'Advanced Astro Journey',
      'Personal pattern tracking',
      'Prediction tracking',
      'Consultation discounts (10% off)',
      'Priority astrologer matching',
      'Personalized event reminders',
      'Additional AstroCoins (10/day)'
    ],
    buttonText: 'Upgrade to Plus',
    disabled: false,
    accentColor: 'border-amber-500/60 shadow-amber-500/20'
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: '₹399',
    yearlyPrice: '₹3,999',
    priceMonthly: 399,
    priceYearly: 3999,
    effectiveMonthly: 333,
    yearlySavings: 789,
    period: 'per month',
    description: 'Complete celestial companion with monthly consultation credits.',
    badge: 'BEST VALUE',
    badgeColor: 'purple',
    icon: '👑',
    consultationCredits: 250,
    coinsMultiplier: 3,
    consultationDiscount: 20,
    features: [
      'Everything in Plus',
      'Premium astrology reports',
      'Higher consultation credits (₹250/month)',
      'Advanced personal patterns',
      'Priority support',
      'Premium astrologer matching',
      'Exclusive insights',
      'Increased monthly rewards (15/day)'
    ],
    buttonText: 'Choose Premium',
    disabled: false,
    accentColor: 'border-purple-500/60 shadow-purple-500/20'
  }
];

// Feature comparison table rows
export const PLAN_COMPARISON_TABLE = [
  { feature: 'Daily Horoscope', free: true, plus: true, premium: true },
  { feature: 'AI Insights', free: '1/month', plus: 'Unlimited', premium: 'Unlimited + Exclusive' },
  { feature: 'Astro Journey', free: 'Basic (3 events)', plus: 'Full timeline', premium: 'Full timeline' },
  { feature: 'Personal Pattern Engine', free: false, plus: true, premium: 'Advanced' },
  { feature: 'AstroProof (Prediction Tracking)', free: false, plus: true, premium: true },
  { feature: 'Astro Guard', free: false, plus: true, premium: true },
  { feature: 'Daily Rewards', free: '5 AstroCoins', plus: '10 AstroCoins', premium: '15 AstroCoins' },
  { feature: 'AstroCoins Multiplier', free: '1x', plus: '2x', premium: '3x' },
  { feature: 'Consultation Discounts', free: false, plus: '10% off', premium: '20% off' },
  { feature: 'Priority Astrologer Matching', free: false, plus: true, premium: 'VIP Priority' },
  { feature: 'Premium Reports', free: false, plus: false, premium: true },
  { feature: 'Event Reminders', free: false, plus: true, premium: true },
];

// Membership benefits for status card
export const MEMBERSHIP_BENEFITS = {
  FREE: {
    label: 'AstroLive Free',
    icon: '🌙',
    color: 'slate',
    benefits: ['Daily horoscope', 'Basic journey', '1 AI insight/month'],
    renewalDate: null,
    credits: 0
  },
  PLUS: {
    label: 'AstroLive Plus',
    icon: '✨',
    color: 'amber',
    benefits: ['12 consultation credits', 'Advanced insights', 'Priority matching', '10 AstroCoins/day'],
    renewalDate: '15 September 2026',
    credits: 100
  },
  PREMIUM: {
    label: 'AstroLive Premium',
    icon: '👑',
    color: 'purple',
    benefits: ['₹250 consultation credits', 'Exclusive insights', 'VIP matching', '15 AstroCoins/day', 'Premium reports'],
    renewalDate: '15 September 2026',
    credits: 250
  }
};

export const MUHURAT_CATEGORIES = [
  { id: 'wedding', name: 'Wedding (Vivah)', icon: '💍' },
  { id: 'housewarming', name: 'Housewarming (Griha Pravesh)', icon: '🏡' },
  { id: 'business', name: 'Business Launch (Vyaapar Arambh)', icon: '🚀' },
  { id: 'office', name: 'New Office Opening', icon: '🏢' },
  { id: 'puja', name: 'Pooja & Hawan', icon: '🪔' },
  { id: 'vehicle', name: 'Vehicle Purchase', icon: '🚗' }
];

export const MOCK_MUHURAT_VENDORS = [
  {
    id: 'v-1',
    name: 'Pt. Rameshwar Shastri Pandit Services',
    category: 'Vedic Priest & Rituals',
    rating: 4.9,
    reviews: 140,
    price: '₹5,100',
    image: 'https://images.unsplash.com/photo-1609101824149-4dbfb0785f95?w=300&auto=format&fit=crop&q=80',
    location: 'Delhi NCR'
  },
  {
    id: 'v-2',
    name: 'Royal Heritage Palace Venues',
    category: 'Auspicious Venue',
    rating: 4.85,
    reviews: 95,
    price: '₹85,000 / day',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300&auto=format&fit=crop&q=80',
    location: 'Gurugram'
  },
  {
    id: 'v-3',
    name: 'Celestial Moments Photography',
    category: 'Wedding & Ritual Photography',
    rating: 4.92,
    reviews: 210,
    price: '₹35,000 / event',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=300&auto=format&fit=crop&q=80',
    location: 'Delhi & Jaipur'
  }
];

export const SAMPLE_CONSULTATION_SUMMARY = {
  topic: 'Career Transition & Job Offer Evaluation',
  astrologerName: 'Acharya Priya Sharma',
  astrologerId: 'astro-1',
  astrologerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  durationMinutes: 12,
  date: '2026-07-28',
  keyDiscussionPoints: [
    'Evaluated current Sun-Jupiter sub-dasha phase active until October 2026.',
    'Confirmed 10th house planetary strength favors switching from current operational role to product executive role.',
    'Discussed upcoming interview timing window on August 12th between 09:45 AM – 11:30 AM.',
    'Recommended Surya Arghya morning ritual to enhance confidence and vocal clarity.'
  ],
  questionsToRevisit: [
    'Did the interview offer materialize during the August 8 - September 7 window?',
    'Should I negotiate equity vs base salary based on September transit changes?'
  ],
  loggedPrediction: 'You may receive an unexpected job opportunity or interview invitation from a tier-1 company within 30 days during your Sun-Jupiter sub-transit.',
  followUpRecommendation: 'Revisit this consultation around August 28th (30 days post-call) to verify offer details or conduct pre-joining muhurat check.'
};

export const MOCK_ADMIN_METRICS = {
  dau: '24,580',
  d7Retention: '48.2%',
  d30Retention: '32.6%',
  consultationConversion: '18.4%',
  repeatConsultationRate: '64.5%',
  arpu: '₹280',
  activeSubscriptions: '12,450',
  astroProofParticipation: '72.1%',
  topConcerns: [
    { label: 'Career Transition', percent: 42 },
    { label: 'Love & Marriage', percent: 28 },
    { label: 'Wealth & Investments', percent: 16 },
    { label: 'Personal Growth', percent: 14 }
  ],
  revenueDistribution: [
    { source: 'Human Consultations', percent: 58 },
    { source: 'Plus/Premium Subscriptions', percent: 27 },
    { source: 'Muhurat Marketplace Commissions', percent: 11 },
    { source: 'B2B API Licensing', percent: 4 }
  ]
};
