export const MUHURAT_EVENT_TYPES = [
  {
    id: 'wedding',
    name: 'Wedding (Vivah)',
    icon: '💍',
    tag: 'Vivah',
    description: 'Find an auspicious date and everything you need for your special day.'
  },
  {
    id: 'housewarming',
    name: 'Griha Pravesh',
    icon: '🏠',
    tag: 'Home Puja',
    description: 'Bless your new home with celestial alignment and traditional rituals.'
  },
  {
    id: 'business',
    name: 'Business Launch',
    icon: '💼',
    tag: 'Commercial',
    description: 'Launch your venture under high-growth planetary transits.'
  },
  {
    id: 'shop',
    name: 'Shop Opening',
    icon: '🏪',
    tag: 'Retail',
    description: 'Attract prosperity and footfall with a Muhurat-aligned store launch.'
  },
  {
    id: 'engagement',
    name: 'Engagement',
    icon: '💐',
    tag: 'Sagai',
    description: 'Commence your journey together on a golden planetary window.'
  },
  {
    id: 'naming',
    name: 'Naming Ceremony',
    icon: '👶',
    tag: 'Namkaran',
    description: 'Choose a nakshatra-blessed Muhurat for your newborn’s naming.'
  },
  {
    id: 'religious',
    name: 'Religious Ceremony',
    icon: '🛕',
    tag: 'Yajna / Hawan',
    description: 'Book verified Pandits and arrangements for Mahapuja and Hawan.'
  },
  {
    id: 'other',
    name: 'Other Life Events',
    icon: '✨',
    tag: 'Custom Event',
    description: 'Plan vehicle purchase, travel departure, or key milestone events.'
  }
];

export const CITIES = [
  'Delhi',
  'Mumbai',
  'Bengaluru',
  'Jaipur',
  'Agra',
  'Lucknow',
  'Bhopal',
  'Indore',
  'Chandigarh',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Ahmedabad'
];

export const GUEST_COUNT_OPTIONS = ['50', '100', '250', '500', '1000+'];

export const BUDGET_OPTIONS = [
  '₹1–2 Lakh',
  '₹2–5 Lakh',
  '₹5–10 Lakh',
  '₹10 Lakh+',
  '₹25 Lakh+'
];

export const VENDOR_CATEGORIES = [
  { id: 'all', name: 'All Services', icon: '🌟' },
  { id: 'venues', name: 'Venues', icon: '🏛️' },
  { id: 'caterers', name: 'Caterers', icon: '🍽️' },
  { id: 'photographers', name: 'Photographers', icon: '📸' },
  { id: 'videographers', name: 'Videographers', icon: '🎥' },
  { id: 'decorators', name: 'Decorators', icon: '🌸' },
  { id: 'priests', name: 'Priests / Pandits', icon: '🧑‍⚖️' },
  { id: 'music', name: 'Music & DJ', icon: '🎵' },
  { id: 'makeup', name: 'Makeup Artists', icon: '💄' },
  { id: 'bridal', name: 'Bridal Wear', icon: '👗' },
  { id: 'transportation', name: 'Transportation', icon: '🚗' },
  { id: 'gifts', name: 'Event Gifts', icon: '🎁' }
];

export const DEMO_MUHURAT_RESULTS = [
  {
    id: 'muhurat-1',
    dateFormatted: 'Saturday, 14 November 2026',
    dateISO: '2026-11-14',
    timeWindow: '9:12 AM – 11:05 AM',
    status: 'Highly Recommended',
    badgeColor: 'emerald',
    nakshatra: 'Rohini Nakshatra',
    planetaryNote: 'Jupiter conjunct Moon in 11th House (Gain & Harmony)',
    matchScore: 98
  },
  {
    id: 'muhurat-2',
    dateFormatted: 'Sunday, 22 November 2026',
    dateISO: '2026-11-22',
    timeWindow: '7:45 AM – 9:30 AM',
    status: 'Good',
    badgeColor: 'amber',
    nakshatra: 'Uttara Phalguni',
    planetaryNote: 'Sun exalted in 10th house aspecting Lagna',
    matchScore: 91
  },
  {
    id: 'muhurat-3',
    dateFormatted: 'Friday, 27 November 2026',
    dateISO: '2026-11-27',
    timeWindow: '10:15 AM – 12:00 PM',
    status: 'Recommended',
    badgeColor: 'emerald',
    nakshatra: 'Pushya Nakshatra',
    planetaryNote: 'Shubh Choghadiya slot aligned with Venus sub-period',
    matchScore: 95
  }
];

export const DEMO_VENDORS = [
  // VENUES
  {
    id: 'v-101',
    name: 'Royal Palace Banquet & Gardens',
    category: 'venues',
    categoryLabel: 'Venue',
    rating: 4.8,
    reviews: 324,
    price: '₹1,80,000',
    numericPrice: 180000,
    priceUnit: 'per event',
    capacity: 300,
    capacityText: '300 guests',
    location: 'Delhi',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: '9:00 AM – 11:30 PM',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80',
    about: 'Sprawling luxury banquet hall and lush open gardens located in South Delhi. Equipped with pillarless AC banquet halls, royal decor, and Vedic mandap arrangements.',
    services: ['Air Conditioned Hall', 'Lawn Space', 'In-house Catering Option', 'Valet Parking', 'Power Backup'],
    cancellationPolicy: '100% refund up to 30 days prior to event.',
    matchScore: 96,
    matchReason: 'Available on 14 Nov 2026, accommodates your 250 guest requirement perfectly.'
  },
  {
    id: 'v-102',
    name: 'The Heritage Courtyard',
    category: 'venues',
    categoryLabel: 'Venue',
    rating: 4.9,
    reviews: 210,
    price: '₹2,50,000',
    numericPrice: 250000,
    priceUnit: 'per event',
    capacity: 500,
    capacityText: '500 guests',
    location: 'Jaipur',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: '8:00 AM – 12:00 AM',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1545232979-fbfd42e20062?w=600&auto=format&fit=crop&q=80',
    about: 'Authentic Rajasthani haveli styled venue with intricate architecture, perfect for royal weddings and grand celebrations.',
    services: ['Heritage Architecture', 'Royal Mandap Stage', 'Guest Suites', 'Folk Artists Welcome'],
    cancellationPolicy: '80% refund up to 45 days prior.',
    matchScore: 94,
    matchReason: 'High customer rating and verified royal aesthetic.'
  },
  {
    id: 'v-103',
    name: 'Grand Imperial Resort & Spa',
    category: 'venues',
    categoryLabel: 'Venue',
    rating: 4.7,
    reviews: 185,
    price: '₹1,50,000',
    numericPrice: 150000,
    priceUnit: 'per event',
    capacity: 250,
    capacityText: '250 guests',
    location: 'Gurugram',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: '9:00 AM – 11:00 PM',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
    about: 'Modern resort featuring serene poolside lawns and state-of-the-art acoustics for indoor ceremonies.',
    services: ['Poolside Lawn', 'Bridal Suites', 'Stage Lighting', 'Cocktail Lounge'],
    cancellationPolicy: 'Full refund 15 days before event.',
    matchScore: 92,
    matchReason: 'Fits guest size of 250 precisely.'
  },

  // CATERERS
  {
    id: 'v-201',
    name: 'Royal Feast Gourmet Caterers',
    category: 'caterers',
    categoryLabel: 'Catering',
    rating: 4.9,
    reviews: 412,
    price: '₹1,25,000',
    numericPrice: 125000,
    priceUnit: 'for 250 plates',
    capacity: 1000,
    capacityText: 'Up to 1000 plates',
    location: 'Delhi',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: 'All day slot',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=80',
    about: 'Master vegetarian and sattvic feast caterers specializing in North Indian, Marwari, South Indian, and live fusion food counters.',
    services: ['Pure Veg / Sattvic Option', 'Live Chaat Counters', 'Custom Dessert Buffet', 'Uniformed Staff'],
    cancellationPolicy: '90% refund if cancelled 20 days prior.',
    matchScore: 98,
    matchReason: 'Sattvic veg menu options align with auspicious Muhurat rituals.'
  },
  {
    id: 'v-202',
    name: 'Ananda Pure Veg Culinary',
    category: 'caterers',
    categoryLabel: 'Catering',
    rating: 4.85,
    reviews: 178,
    price: '₹95,000',
    numericPrice: 95000,
    priceUnit: 'for 250 plates',
    capacity: 500,
    capacityText: 'Up to 500 plates',
    location: 'Mumbai',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: 'Morning & Evening',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
    about: 'Traditional Jain and Swaminarayan menu specialists with organic ingredients and zero onion-garlic options.',
    services: ['Jain Menu', 'Traditional Thali', 'Welcome Drinks', 'Eco-friendly Cutlery'],
    cancellationPolicy: '100% refund up to 14 days.',
    matchScore: 90,
    matchReason: 'Great budget saver.'
  },

  // PHOTOGRAPHERS
  {
    id: 'v-301',
    name: 'Moments Studio & Cinematic',
    category: 'photographers',
    categoryLabel: 'Photography',
    rating: 4.95,
    reviews: 280,
    price: '₹75,000',
    numericPrice: 75000,
    priceUnit: 'full day coverage',
    capacity: 0,
    capacityText: '3 Photographers',
    location: 'Delhi',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: '8:00 AM – 10:00 PM',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&auto=format&fit=crop&q=80',
    about: 'Award-winning wedding photography collective skilled in candid captures, Muhurat ritual focus, and teaser videos.',
    services: ['Candid Photography', 'Traditional Album', 'Drone Shots', 'Pre-wedding Shoot'],
    cancellationPolicy: 'Full refund minus deposit up to 30 days.',
    matchScore: 97,
    matchReason: 'Specializes in auspicious ceremony ritual framing.'
  },
  {
    id: 'v-302',
    name: 'Sublime Light Wedding Films',
    category: 'photographers',
    categoryLabel: 'Photography',
    rating: 4.8,
    reviews: 145,
    price: '₹60,000',
    numericPrice: 60000,
    priceUnit: 'full day',
    capacity: 0,
    capacityText: '2 Photographers',
    location: 'Bengaluru',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: '9:00 AM – 8:00 PM',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&auto=format&fit=crop&q=80',
    about: 'Creative storytelling photography with quick 72-hour sneak peek delivery.',
    services: ['High-Res Digital Album', 'Reels Editing', 'Family Portraits'],
    cancellationPolicy: '85% refund up to 15 days.',
    matchScore: 89,
    matchReason: 'Cost-effective high rating option.'
  },

  // DECORATORS
  {
    id: 'v-401',
    name: 'Dream Decor & Floral Mandap',
    category: 'decorators',
    categoryLabel: 'Decor',
    rating: 4.88,
    reviews: 198,
    price: '₹60,000',
    numericPrice: 60000,
    priceUnit: 'complete setup',
    capacity: 0,
    capacityText: 'Mandap + Entrance',
    location: 'Delhi',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: 'Early Morning Setup',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
    about: 'Vedic-inspired floral mandap decorators featuring fresh marigolds, lotus themes, celestial fairy lights, and brass urns.',
    services: ['Vedic Mandap Setup', 'Floral Arch Entrance', 'Fairylight Ceiling', 'Vastu Seating Design'],
    cancellationPolicy: '90% refund 20 days before.',
    matchScore: 96,
    matchReason: 'Matches traditional celebratory visual theme.'
  },
  {
    id: 'v-402',
    name: 'Aura Celestial Decorators',
    category: 'decorators',
    categoryLabel: 'Decor',
    rating: 4.75,
    reviews: 112,
    price: '₹45,000',
    numericPrice: 45000,
    priceUnit: 'basic package',
    capacity: 0,
    capacityText: 'Stage & Seating',
    location: 'Chandigarh',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: 'Morning Slot',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80',
    about: 'Minimalist contemporary floral arrangements with eco-friendly recycled decor props.',
    services: ['Eco Floral Stage', 'Welcome Gate', 'Table Centerpieces'],
    cancellationPolicy: 'Full refund 10 days before.',
    matchScore: 88,
    matchReason: 'Fits budget optimization goals.'
  },

  // PRIESTS / PANDITS
  {
    id: 'v-501',
    name: 'Pandit Rajesh Vastu & Karmakand',
    category: 'priests',
    categoryLabel: 'Priest',
    rating: 4.98,
    reviews: 512,
    price: '₹15,000',
    numericPrice: 15000,
    priceUnit: 'Dakshina + Samagri',
    capacity: 0,
    capacityText: 'Vedic Ceremonies',
    location: 'Delhi',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: '9:12 AM – 11:05 AM',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    about: 'Senior Acharya with 15+ years experience conducting Vivah Sanskar, Griha Pravesh, Hawan, and Kanyadaan with precise Vedic chants.',
    services: ['Pooja Samagri Included', 'Sanskrit & Hindi Translation', 'Kundli Matching Verification', 'Vivah Certificate'],
    cancellationPolicy: '100% refund up to 7 days.',
    matchScore: 99,
    matchReason: 'Available for your exact 9:12 AM Muhurat window.'
  },
  {
    id: 'v-502',
    name: 'Acharya Vidyadhar Shastri',
    category: 'priests',
    categoryLabel: 'Priest',
    rating: 4.9,
    reviews: 310,
    price: '₹11,000',
    numericPrice: 11000,
    priceUnit: 'Ritual Dakshina',
    capacity: 0,
    capacityText: 'Puja & Vivah',
    location: 'Varanasi / Delhi',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: '8:00 AM – 1:00 PM',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    about: 'Kashi-educated Sanskrit scholar providing step-by-step guidance for Vedic wedding rituals.',
    services: ['Rig Veda Chanting', 'Navgrah Shanti', 'Hawan Setup'],
    cancellationPolicy: 'Full refund anytime.',
    matchScore: 95,
    matchReason: 'Scholarly Kashi lineage.'
  },

  // MUSIC & DJ
  {
    id: 'v-601',
    name: 'Symphony Beats & Shehnai Troupe',
    category: 'music',
    categoryLabel: 'Music & DJ',
    rating: 4.82,
    reviews: 165,
    price: '₹35,000',
    numericPrice: 35000,
    priceUnit: 'performance',
    capacity: 0,
    capacityText: '5 Artists',
    location: 'Delhi',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: '8:00 AM – 4:00 PM',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    about: 'Classical Shehnai performance for auspicious morning Muhurat followed by energetic Baraat Dhol and evening DJ set.',
    services: ['Live Shehnai Morning', 'Punjabi Dhol', 'Complete DJ Console & Lights'],
    cancellationPolicy: '90% refund 15 days before.',
    matchScore: 93,
    matchReason: 'Live Shehnai adds traditional grandeur.'
  },

  // MAKEUP ARTISTS
  {
    id: 'v-701',
    name: 'Glamour Glow Bridal Studio',
    category: 'makeup',
    categoryLabel: 'Makeup Artist',
    rating: 4.91,
    reviews: 240,
    price: '₹28,000',
    numericPrice: 28000,
    priceUnit: 'bridal + 2 add-ons',
    capacity: 0,
    capacityText: 'Bridal Makeover',
    location: 'Delhi',
    verified: true,
    availableOnDate: '14 Nov 2026',
    availableTimeSlot: '6:00 AM Onwards',
    availabilityStatus: 'Available',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80',
    about: 'HD Airbrush bridal makeup artist providing long-lasting waterproof finish for morning ceremonies.',
    services: ['HD Airbrush Makeup', 'Hair Styling & Saree Draping', 'Jewelry Outfit Setting', 'Trial Session Included'],
    cancellationPolicy: '80% refund 20 days prior.',
    matchScore: 94,
    matchReason: 'Early morning slot available for 9:12 AM Muhurat.'
  }
];

export const DEMO_PACKAGES = [
  {
    id: 'pkg-elegant',
    name: 'Elegant Wedding Package',
    tag: 'MOST POPULAR',
    badgeColor: 'amber',
    totalPriceFormatted: '₹4,85,000',
    totalPriceNumeric: 485000,
    savingsText: 'Save ₹55,000 bundled',
    items: [
      { name: 'Royal Palace Banquet Hall', category: 'Venue', price: '₹1,80,000' },
      { name: 'Royal Feast Catering (250 plates)', category: 'Catering', price: '₹1,25,000' },
      { name: 'Moments Studio Photography', category: 'Photography', price: '₹75,000' },
      { name: 'Dream Decor Floral Mandap', category: 'Decor', price: '₹60,000' },
      { name: 'Pandit Rajesh Vedic Ceremony', category: 'Priest', price: '₹15,000' },
      { name: 'Glamour Glow Bridal Makeup', category: 'Makeup', price: '₹28,000' },
      { name: 'Symphony Beats & Shehnai', category: 'Music', price: '₹35,000' }
    ],
    description: 'Complete stress-free wedding bundle curated around your selected 14 Nov 2026 Muhurat.'
  },
  {
    id: 'pkg-premium',
    name: 'Premium Royal Package',
    tag: 'LUXURY EXPERIENCE',
    badgeColor: 'purple',
    totalPriceFormatted: '₹8,50,000',
    totalPriceNumeric: 850000,
    savingsText: 'Save ₹95,000 bundled',
    items: [
      { name: 'The Heritage Courtyard (Jaipur / Delhi)', category: 'Venue', price: '₹2,50,000' },
      { name: 'Royal Feast Premium Gourmet Feast', category: 'Catering', price: '₹2,10,000' },
      { name: 'Moments Studio Cinematic + Drone Coverage', category: 'Photography & Film', price: '₹1,40,000' },
      { name: 'Grand Floral Mandap & Entry Arch', category: 'Decor', price: '₹1,20,000' },
      { name: 'Pandit Rajesh + 4 Chanting Priests', category: 'Priest Team', price: '₹35,000' },
      { name: 'Bridal Makeover + Family Makeup (4 pax)', category: 'Makeup', price: '₹50,000' },
      { name: 'Live Folk Troupe & DJ Console', category: 'Music & Ent.', price: '₹45,000' }
    ],
    description: 'High-end celebratory experience with luxury heritage venues and comprehensive media production.'
  }
];

export const DEMO_BUSINESS_METRICS = {
  gmv: '₹24,50,000',
  bookingsCount: 86,
  vendorPartnersCount: 124,
  marketplaceRevenue: '₹2,14,000',
  avgBookingValue: '₹28,500',
  consultationToMarketplaceConversion: '18.4%',
  commissionRates: [
    { category: 'Venues', rate: '8%', revenueEstimate: '₹96,000' },
    { category: 'Catering', rate: '7%', revenueEstimate: '₹48,000' },
    { category: 'Photography', rate: '10%', revenueEstimate: '₹38,000' },
    { category: 'Decoration', rate: '10%', revenueEstimate: '₹22,000' },
    { category: 'Priests / Pandits', rate: '5%', revenueEstimate: '₹10,000' }
  ],
  funnelData: [
    { step: 'Users Requesting Muhurat', count: 1000, percent: 100 },
    { step: 'Users Viewing Recommended Dates', count: 780, percent: 78 },
    { step: 'Users Viewing Date-Matched Vendors', count: 520, percent: 52 },
    { step: 'Users Adding Vendors to Event Plan', count: 240, percent: 24 },
    { step: 'Users Requesting Vendor Bookings', count: 120, percent: 12 },
    { step: 'Completed Confirmed Bookings', count: 86, percent: 8.6 }
  ]
};

export const DEMO_AI_ASSISTANT_QA = [
  {
    query: 'What do I still need for my wedding?',
    response: 'You have booked your Venue, Caterer, and Photographer. You still need a Decorator, Priest for the rituals, and Music/DJ for entertainment.'
  },
  {
    query: 'Keep everything under ₹5 lakh.',
    response: 'Here are 4 verified vendors (Venue: ₹1.8L, Caterer: ₹1.25L, Photographer: ₹75K, Decorator: ₹60K, Pandit: ₹15K) that keep your estimated total at ₹4,55,000 — safely under your ₹5 Lakh budget target!'
  },
  {
    query: 'Why is 14 November 2026 recommended?',
    response: '14 November 2026 between 9:12 AM – 11:05 AM falls in Rohini Nakshatra with Jupiter conjunct Moon in the 11th House of prosperity. It is an auspicious Sukarma Yoga window ideal for marriage rituals.'
  }
];
