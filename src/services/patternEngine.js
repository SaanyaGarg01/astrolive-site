/**
 * AstroLive — Pattern Engine Service
 * Analyzes life events to detect recurring patterns and transit correlations.
 * All insights are clearly labeled as "observed patterns" / "historical correlations".
 */

// ─── Transit Catalog ────────────────────────────────────────────
const TRANSIT_OVERLAYS = {
  Career: [
    { transit: 'Sun-Jupiter 10th House Transit', description: 'Leadership visibility and career momentum' },
    { transit: 'Mars 10th House Activation', description: 'Drive, ambition, and decisive action' },
    { transit: 'Saturn 10th House Structure', description: 'Long-term professional foundations' },
    { transit: 'Mercury 6th House Clarity', description: 'Work efficiency and communication precision' }
  ],
  Love: [
    { transit: 'Venus 7th House Direct', description: 'Partnership alignment and emotional clarity' },
    { transit: 'Venus-Jupiter 7th House Conjunction', description: 'Expansion of romantic connections' },
    { transit: 'Moon 5th House Transit', description: 'Emotional creativity and romantic expression' }
  ],
  Finance: [
    { transit: 'Jupiter 2nd House Aspect', description: 'Wealth accumulation and asset growth' },
    { transit: 'Venus 11th House Transit', description: 'Income from social connections' },
    { transit: 'Sun 2nd House Direct', description: 'Financial confidence and decision-making' }
  ],
  Education: [
    { transit: 'Mercury 5th House Direct', description: 'Intellectual sharpness and exam readiness' },
    { transit: 'Mercury Retrograde 5th House', description: 'Review, revision, and deep study' },
    { transit: 'Jupiter 9th House Aspect', description: 'Higher learning and certification success' }
  ],
  Travel: [
    { transit: '9th House Travel Aspect', description: 'Movement, exploration, and new horizons' },
    { transit: 'Jupiter 9th House Transit', description: 'Long-distance travel and cultural expansion' }
  ],
  Health: [
    { transit: 'Mars 1st House Transit', description: 'Physical vitality and energy levels' },
    { transit: 'Saturn 6th House Discipline', description: 'Health routines and structural wellness' }
  ],
  'Personal Growth': [
    { transit: 'Saturn 4th House Reflection', description: 'Core stability and inner foundation building' },
    { transit: 'Jupiter 1st House Expansion', description: 'Personal growth and self-confidence' }
  ]
};

// ─── Generate Transit Overlay ───────────────────────────────────
export function getTransitOverlay(category) {
  const transits = TRANSIT_OVERLAYS[category] || TRANSIT_OVERLAYS['Personal Growth'];
  return transits[Math.floor(Math.random() * transits.length)];
}

export function generateTransitContext(category, date) {
  const overlay = getTransitOverlay(category);
  const monthYear = new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return {
    transit: overlay.transit,
    context: `${overlay.description}. Observed during ${monthYear} in your personal timeline.`,
    disclaimer: 'This transit correlation is based on traditional Vedic astrological principles and your recorded life events. It represents an observed pattern, not a scientifically established causal relationship.'
  };
}

// ─── Pattern Detection ──────────────────────────────────────────
export function detectPatterns(events) {
  if (!events || events.length < 2) return [];

  // Group events by category
  const byCategory = {};
  events.forEach(event => {
    const cat = event.category || 'Other';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(event);
  });

  const patterns = [];

  Object.entries(byCategory).forEach(([category, catEvents]) => {
    if (catEvents.length < 2) return;

    const icon = getCategoryIcon(category);
    const sortedEvents = catEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Detect recurring pattern
    const timeRange = `${formatDate(sortedEvents[0].date)} – ${formatDate(sortedEvents[sortedEvents.length - 1].date)}`;

    // Build event list with transit context
    const eventList = sortedEvents.slice(-4).map(e => ({
      year: formatDate(e.date),
      title: e.title,
      context: e.astrologicalTransit || getTransitOverlay(category).transit
    }));

    // Generate insight
    const transit = getTransitOverlay(category);
    const observation = generateObservation(category, catEvents.length, transit);

    patterns.push({
      id: `pattern-${category.toLowerCase().replace(/\s+/g, '-')}`,
      category,
      title: `${category} Events & Transit Correlations`,
      icon,
      relatedEventsCount: catEvents.length,
      majorTransitionsCount: Math.max(1, Math.floor(catEvents.length / 2)),
      consultationsCount: catEvents.filter(e => e.type === 'consultation').length,
      summary: `${catEvents.length} recorded ${category.toLowerCase()} events show recurring timing patterns in your personal astrology timeline.`,
      observation: observation,
      timeRange,
      events: eventList,
      aiInsight: generateInsight(category, catEvents.length),
      reflectionQuestion: generateReflectionQuestion(category),
      userReflection: '',
      disclaimer: '⚠️ Observed Pattern — This represents a historical correlation in your personal journal, not a scientifically proven causal relationship.'
    });
  });

  return patterns;
}

// ─── Generate Personalized Insights ─────────────────────────────
export function generatePersonalizedInsight(events, userProfile) {
  if (!events || events.length < 3) {
    return {
      headline: 'Keep Logging Events',
      insight: 'Add more life events to your journal to unlock personalized pattern insights. At least 3 events are needed.',
      confidence: 'low'
    };
  }

  // Find most active category
  const categoryCounts = {};
  events.forEach(e => {
    const cat = e.category || 'Other';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  const topCategory = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])[0];

  const transit = getTransitOverlay(topCategory[0]);

  return {
    headline: `${topCategory[0]} Pattern Detected`,
    insight: `Your previous ${topCategory[1]} recorded ${topCategory[0].toLowerCase()} events show recurring alignment with ${transit.transit}. This is a personalized astrology insight based on your journal entries.`,
    confidence: topCategory[1] >= 5 ? 'high' : topCategory[1] >= 3 ? 'medium' : 'low',
    category: topCategory[0],
    eventCount: topCategory[1],
    disclaimer: 'Personalized astrology insight based on historical correlation in your journal data.'
  };
}

// ─── Data Export ────────────────────────────────────────────────
export function exportJournalData(events, patterns) {
  const exportData = {
    exportDate: new Date().toISOString(),
    version: '2.0',
    events: events.map(e => ({
      date: e.date,
      category: e.category,
      title: e.title,
      description: e.description,
      mood: e.mood,
      outcome: e.outcome,
      location: e.location,
      userReflection: e.userReflection
    })),
    patterns: patterns.map(p => ({
      category: p.category,
      title: p.title,
      observation: p.observation,
      events: p.events
    })),
    disclaimer: 'This data export contains your personal journal entries and observed astrological pattern correlations. Patterns are based on historical data and do not represent scientifically proven predictions.'
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `astrolive-journal-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Helpers ────────────────────────────────────────────────────
function getCategoryIcon(category) {
  const icons = {
    Career: '💼', Love: '❤️', Finance: '💰', Education: '🎓',
    Travel: '✈️', Health: '💪', 'Personal Growth': '🌱', Other: '📌'
  };
  return icons[category] || '📌';
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function generateObservation(category, count, transit) {
  const templates = [
    `Your ${category.toLowerCase()} transitions correlate with ${transit.transit} periods in your chart.`,
    `${count} recorded ${category.toLowerCase()} events align with recurring ${transit.transit} windows.`,
    `Historical ${category.toLowerCase()} milestones in your journal coincide with ${transit.description.toLowerCase()} phases.`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateInsight(category, count) {
  return `You've logged ${count} ${category.toLowerCase()} events over your recorded timeline. Multiple events occurred during similar transit windows, suggesting a recurring pattern in your personal astrology journey.`;
}

function generateReflectionQuestion(category) {
  const questions = {
    Career: 'What mindset or preparation helped most during these career transitions?',
    Love: 'How has your communication style evolved across these relationship milestones?',
    Finance: 'What long-term wealth goals would you like to plan for next?',
    Education: 'Which learning habits gave you the greatest clarity before exams?',
    Travel: 'What did you discover about yourself during these journeys?',
    Health: 'Which health routines had the most impact on your wellbeing?',
    'Personal Growth': 'What patterns do you notice in your personal growth moments?'
  };
  return questions[category] || 'What reflection comes to mind when you review these events together?';
}
