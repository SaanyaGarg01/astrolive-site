import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { Search, Calendar, User, Clock, ArrowRight, Share2, Sparkles, X, MessageSquare, PhoneCall } from 'lucide-react';

const BLOG_CATEGORIES = [
  'All',
  'Festival',
  'Gemstone',
  'Numerology',
  'Vastu',
  'Vedic astro',
  'Kundli',
  'Zodiac Signs'
];

const FEATURED_HERO_BLOG = {
  id: 'hero-1',
  title: 'What Is Nadi Dosha? How to Remove Nadi Dosha',
  category: 'Kundli',
  categoryLabel: 'Kundli & Matchmaking',
  image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&auto=format&fit=crop&q=80',
  author: 'Vikash Kumar Pandey',
  authorRole: 'Senior Vedic Astrologer',
  date: '12/08/2026',
  readTime: '6 min read',
  excerpt: 'Nadi Dosha is one of the most critical factors analyzed during Kundli matching for marriage. Discover its causes, impact on health and offspring, and proven Vedic remedies to nullify Nadi Dosha.',
  content: `
    <h3>Understanding Nadi Dosha in Vedic Astrology</h3>
    <p>In Vedic Kundli matching (Ashtakoot Guna Milan), 36 Gunas are evaluated to determine marital compatibility. Nadi Milan carries the highest weightage of 8 points out of 36. When both partners belong to the same Nadi (Adi, Madhya, or Antya), it results in Nadi Dosha.</p>
    
    <h3>Types of Nadi</h3>
    <ul>
      <li><strong>Adi (Vata) Nadi:</strong> Represents air element and nervous energy.</li>
      <li><strong>Madhya (Pitta) Nadi:</strong> Represents fire element and digestion/metabolism.</li>
      <li><strong>Antya (Kapha) Nadi:</strong> Represents water/earth elements and stability.</li>
    </ul>

    <h3>Effective Vedic Remedies to Overcome Nadi Dosha</h3>
    <p>1. <strong>Maha Mrityunjaya Mantra Japa:</strong> Chanting this revered Shiva mantra 1,25,000 times brings immense divine protection.<br/>
       2. <strong>Nadi Dosha Niwarak Puja:</strong> Performed by learned Vedic priests at sacred ghats.<br/>
       3. <strong>Gemstone & Charity Remedies:</strong> Donating grains, cow (Gau Dan), and clothes to Brahmins on auspicious tithis.</p>
  `
};

const RECENT_SIDE_BLOGS = [
  {
    id: 'recent-1',
    title: 'Live Chat and Call with Astrologer for Health & Family 2026',
    category: 'Vedic astro',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
    author: 'Vikash Kumar Pandey',
    date: '05/08/2026',
    readTime: '4 min read'
  },
  {
    id: 'recent-2',
    title: 'Tarot and Numerology Reading for Health & Family 2026',
    category: 'Numerology',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
    author: 'Vikash Kumar Pandey',
    date: '03/08/2026',
    readTime: '5 min read'
  },
  {
    id: 'recent-3',
    title: 'Tarot and Numerology Reading for Hindi Speakers (2026)',
    category: 'Numerology',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    author: 'Vikash Kumar Pandey',
    date: '31/07/2026',
    readTime: '4 min read'
  }
];

const CATEGORY_SECTION_BLOGS = {
  Festival: [
    {
      id: 'fest-1',
      title: 'गंगा दशहरा क्या है और इसका महत्व क्यों है?',
      category: 'Festival',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=500&auto=format&fit=crop&q=80',
      author: 'Vikash Kumar Pandey',
      date: '24/06/2026',
      readTime: '5 min read',
      excerpt: 'गंगा दशहरा के दिन पवित्र गंगा में स्नान और दान करने से दसों पापों से मुक्ति मिलती है। जानें शुभ मुहूर्त और पूजा विधि।'
    },
    {
      id: 'fest-2',
      title: 'What Is Ashadhi Ekadashi and Why Is It Celebrated?',
      category: 'Festival',
      image: 'https://images.unsplash.com/photo-1545232979-fbf34fe37b38?w=500&auto=format&fit=crop&q=80',
      author: 'Vikash Kumar Pandey',
      date: '16/06/2026',
      readTime: '4 min read',
      excerpt: 'Ashadhi Ekadashi marks the beginning of Chaturmas, the four-month holy period of Lord Vishnu’s cosmic rest.'
    },
    {
      id: 'fest-3',
      title: 'Gayatri Jayanti 2026: Date, Significance, Puja Vidhi, and Celebration',
      category: 'Festival',
      image: 'https://images.unsplash.com/photo-1608937321278-f3d674175ecb?w=500&auto=format&fit=crop&q=80',
      author: 'Vikash Kumar Pandey',
      date: '10/06/2026',
      readTime: '6 min read',
      excerpt: 'Celebrate the divine incarnation of Goddess Gayatri, the Mother of the Vedas, with traditional rituals and japa mantra.'
    }
  ],
  Vastu: [
    {
      id: 'vastu-1',
      title: '10 Essential Vastu Tips for Home Entrance & Wealth Flow',
      category: 'Vastu',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80',
      author: 'Vikash Kumar Pandey',
      date: '02/06/2026',
      readTime: '5 min read',
      excerpt: 'Optimize positive prana and financial abundance by aligning your main door, mandir, and kitchen correctly.'
    },
    {
      id: 'vastu-2',
      title: 'Vastu Directions for Master Bedroom & Sleeping Position',
      category: 'Vastu',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=500&auto=format&fit=crop&q=80',
      author: 'Vikash Kumar Pandey',
      date: '28/05/2026',
      readTime: '4 min read',
      excerpt: 'Sleeping with your head towards the South promotes restful sleep, mental peace, and longevity according to Vastu Shastra.'
    },
    {
      id: 'vastu-3',
      title: 'How to Place Kuber Yantra According to Vastu Shastra',
      category: 'Vastu',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&auto=format&fit=crop&q=80',
      author: 'Vikash Kumar Pandey',
      date: '20/05/2026',
      readTime: '5 min read',
      excerpt: 'Unlock financial prosperity by sanctifying the North zone of your office or home worship room.'
    }
  ],
  Gemstone: [
    {
      id: 'gem-1',
      title: 'Which Gemstone Should You Wear According to Your Rashi?',
      category: 'Gemstone',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80',
      author: 'Vikash Kumar Pandey',
      date: '15/05/2026',
      readTime: '7 min read',
      excerpt: 'Wearing the correct Ratna strengthens your benefique ascendant lord and wards off malefic planetary transits.'
    },
    {
      id: 'gem-2',
      title: 'Yellow Sapphire (Pukhraj) Benefits and Method of Wearing',
      category: 'Gemstone',
      image: 'https://images.unsplash.com/photo-1611591475179-62cd346059d8?w=500&auto=format&fit=crop&q=80',
      author: 'Vikash Kumar Pandey',
      date: '08/05/2026',
      readTime: '5 min read',
      excerpt: 'Jupiter’s sacred gemstone brings wisdom, marriage bliss, higher education, and financial fortune.'
    },
    {
      id: 'gem-3',
      title: 'Neelam (Blue Sapphire) Testing and Saturn Alignment',
      category: 'Gemstone',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=80',
      author: 'Vikash Kumar Pandey',
      date: '01/05/2026',
      readTime: '6 min read',
      excerpt: 'Blue Sapphire is Saturn’s fast-acting gemstone. Discover mandatory trial periods before permanent mounting.'
    }
  ]
};

export default function BlogPage() {
  const { setActiveTab } = useAstro();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Collect all articles for search/filter
  const allArticles = [
    FEATURED_HERO_BLOG,
    ...RECENT_SIDE_BLOGS,
    ...CATEGORY_SECTION_BLOGS.Festival,
    ...CATEGORY_SECTION_BLOGS.Vastu,
    ...CATEGORY_SECTION_BLOGS.Gemstone
  ];

  const filteredArticles = allArticles.filter((article) => {
    const matchesCat = selectedCategory === 'All' || article.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 pb-20 relative">
      
      {/* Top Banner Header matching Screenshot 1 */}
      <div className="bg-white border-b border-purple-100 py-4 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-900 via-purple-600 to-pink-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#181824] rounded-full flex items-center justify-center text-white text-xl">
                🪐
              </div>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              ASTROLIVE <span className="text-purple-600 text-sm font-black uppercase ml-1">BLOG</span>
            </span>
          </div>

          {/* Consult Now Pink Pill Button matching Screenshot 1 */}
          <button
            onClick={() => setActiveTab('astrologers')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold px-6 py-2.5 rounded-full shadow-md hover:scale-105 transition-all text-xs tracking-wider border-none cursor-pointer"
          >
            Consult Now
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* Category Pills Row matching Screenshot 1 */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {BLOG_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md border border-purple-600'
                    : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar matching Screenshot 1 */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center bg-white rounded-full border-2 border-purple-300 shadow-sm overflow-hidden focus-within:border-purple-600 transition-colors p-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to start searching..."
              className="w-full px-6 py-3 text-sm text-slate-800 placeholder-slate-400 border-none outline-none bg-transparent font-medium"
            />
            <button
              onClick={() => {}}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black px-7 py-3 rounded-full flex items-center gap-2 text-xs tracking-wider shadow-sm hover:opacity-95 transition-all shrink-0 cursor-pointer border-none"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Search Filtered Results View (If search query active) */}
        {searchQuery.trim() !== '' ? (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Search Results for "{searchQuery}"</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">
                {filteredArticles.length} found
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-3 left-3 bg-[#181824]/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm">
                      🪐 ASTROLIVE
                    </span>
                  </div>
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900 leading-snug hover:text-purple-600 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-purple-600" /> {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> {article.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Normal Home Blog Layout matching Screenshot 1 & Screenshot 2 */
          <div className="space-y-12">

            {/* 🪐 Latest Blogs Section (Screenshot 1 Layout: Left Big Hero + Right Vertical List) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <span className="text-2xl">🪐</span>
                  <span>Latest Blogs</span>
                </h2>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-xs font-black text-blue-600 hover:underline cursor-pointer border-none bg-transparent"
                >
                  View More
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Big Hero Featured Blog Card matching Screenshot 1 */}
                <div
                  onClick={() => setSelectedArticle(FEATURED_HERO_BLOG)}
                  className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-4 p-4"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden">
                    <img
                      src={FEATURED_HERO_BLOG.image}
                      alt={FEATURED_HERO_BLOG.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* ASTROLIVE Logo Badge overlay top-left matching Screenshot 1 */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-purple-100">
                      <span className="text-sm">🪐</span>
                      <span className="text-xs font-black text-slate-900 tracking-tight">ASTROLIVE</span>
                    </div>
                  </div>

                  <div className="px-2 space-y-3">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight group-hover:text-purple-600 transition-colors">
                      {FEATURED_HERO_BLOG.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-medium">
                      {FEATURED_HERO_BLOG.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-2">
                      <span className="flex items-center gap-1 text-slate-700">
                        <User className="w-3.5 h-3.5 text-purple-600" /> {FEATURED_HERO_BLOG.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {FEATURED_HERO_BLOG.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Stacked 3 Vertical Cards matching Screenshot 1 */}
                <div className="lg:col-span-5 space-y-4">
                  {RECENT_SIDE_BLOGS.map((blog) => (
                    <div
                      key={blog.id}
                      onClick={() => setSelectedArticle(blog)}
                      className="bg-white rounded-2xl p-3 border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 items-center group"
                    >
                      <div className="relative w-32 sm:w-36 aspect-square rounded-xl overflow-hidden shrink-0">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-1.5 left-1.5 bg-[#181824]/90 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                          🪐
                        </div>
                      </div>

                      <div className="space-y-2 flex-1">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-purple-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-purple-600" /> {blog.author}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" /> {blog.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* ✨ Festival Section matching Screenshot 2 */}
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <span>Festival</span>
                </h2>
                <button
                  onClick={() => setSelectedCategory('Festival')}
                  className="text-xs font-black text-blue-600 hover:underline cursor-pointer border-none bg-transparent"
                >
                  View More
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CATEGORY_SECTION_BLOGS.Festival.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => setSelectedArticle(blog)}
                    className="bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#181824]/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm">
                        🪐 ASTROLIVE
                      </div>
                    </div>
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover:text-purple-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-3 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-purple-600" /> {blog.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" /> {blog.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🏡 Vastu Section matching Screenshot 2 */}
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span className="text-2xl">🏡</span>
                  <span>Vastu</span>
                </h2>
                <button
                  onClick={() => setSelectedCategory('Vastu')}
                  className="text-xs font-black text-blue-600 hover:underline cursor-pointer border-none bg-transparent"
                >
                  View More
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CATEGORY_SECTION_BLOGS.Vastu.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => setSelectedArticle(blog)}
                    className="bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#181824]/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm">
                        🪐 ASTROLIVE
                      </div>
                    </div>
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover:text-purple-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-3 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-purple-600" /> {blog.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" /> {blog.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 💎 Gemstone Section */}
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span className="text-2xl">💎</span>
                  <span>Gemstone & Remedies</span>
                </h2>
                <button
                  onClick={() => setSelectedCategory('Gemstone')}
                  className="text-xs font-black text-blue-600 hover:underline cursor-pointer border-none bg-transparent"
                >
                  View More
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CATEGORY_SECTION_BLOGS.Gemstone.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => setSelectedArticle(blog)}
                    className="bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#181824]/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm">
                        🪐 ASTROLIVE
                      </div>
                    </div>
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover:text-purple-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-3 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-purple-600" /> {blog.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" /> {blog.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Floating Action Button: Chat Now on WhatsApp matching Screenshot 1 & 2 */}
      <a
        href="https://wa.me/?text=Hello%20AstroLive%20Astrologer"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-white hover:bg-emerald-50 text-slate-900 px-4 py-3 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-3 transition-all hover:scale-105 no-underline"
      >
        <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white text-lg font-bold shadow-sm">
          💬
        </div>
        <div className="text-left">
          <p className="text-[11px] font-black text-slate-900 leading-tight">Chat Now on</p>
          <p className="text-xs font-black text-[#25d366] leading-tight">WhatsApp</p>
        </div>
      </a>

      {/* Full Article Modal Reader View */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-100 space-y-6 relative p-6 sm:p-8">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors border-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="bg-purple-100 text-purple-700 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 py-2 border-y border-slate-100">
                <span className="flex items-center gap-1 text-slate-800">
                  <User className="w-4 h-4 text-purple-600" /> {selectedArticle.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-slate-400" /> {selectedArticle.date}
                </span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-video">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-purple max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-medium">
              <p>{selectedArticle.excerpt || selectedArticle.title}</p>
              {selectedArticle.content ? (
                <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
              ) : (
                <p>
                  Vedic astrology offers timeless guidance on planetary alignments, karma remedies, and auspicious timing. Consulting an experienced astrologer brings deep clarity for your life journey, relationships, and health decisions.
                </p>
              )}
            </div>

            {/* Consult Astrologer CTA inside Modal */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-extrabold text-base">Have personal questions about this topic?</p>
                <p className="text-xs text-purple-200">Talk to verified Vedic Astrologers live on AstroLive.</p>
              </div>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  setActiveTab('astrologers');
                }}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold px-6 py-3 rounded-full text-xs uppercase tracking-wider hover:scale-105 transition-transform border-none cursor-pointer shrink-0"
              >
                Talk to Astrologer (₹10/min)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
