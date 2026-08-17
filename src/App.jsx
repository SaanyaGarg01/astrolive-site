import React from 'react';
import { AstroProvider, useAstro } from './context/AstroContext';
import { GamificationProvider } from './context/GamificationContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import NotificationToast from './components/NotificationToast';
import ShareModal from './components/ShareModal';
import ConsultationCallModal from './components/ConsultationCallModal';
import AstrologerProfileModal from './components/AstrologerProfileModal';
import NotificationCenter from './components/NotificationCenter';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import AIInsightPage from './pages/AIInsightPage';
import AIVideoPage from './pages/AIVideoPage';
import AstrologerMatching from './pages/AstrologerMatching';
import AstroJourney from './pages/AstroJourney';
import PersonalPatterns from './pages/PersonalPatterns';
import AstroProof from './pages/AstroProof';
import AstroGuard from './pages/AstroGuard';
import DailyRitual from './pages/DailyRitual';
import AstroCoinsShop from './pages/AstroCoinsShop';
import ConsultationSummaryPage from './pages/ConsultationSummaryPage';
import MembershipPage from './pages/MembershipPage';
import MembershipManagePage from './pages/MembershipManagePage';
import MuhuratMarketplace from './pages/MuhuratMarketplace';
import B2BMuhuratAPI from './pages/B2BMuhuratAPI';
import AstrologerDashboard from './pages/AstrologerDashboard';
import BusinessAnalytics from './pages/BusinessAnalytics';
import BadgesPage from './pages/BadgesPage';
import AdminPage from './pages/AdminPage';

function AppContent() {
  const { activeTab, setActiveTab } = useAstro();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'onboarding':
        return <Onboarding />;
      case 'ai-insight':
        return <AIInsightPage />;
      case 'ai-video':
        return <AIVideoPage />;
      case 'astrologers':
        return <AstrologerMatching />;
      case 'journey':
        return <AstroJourney />;
      case 'patterns':
      case 'personal-patterns':
        return <PersonalPatterns />;
      case 'astro-proof':
        return <AstroProof />;
      case 'astro-guard':
        return <AstroGuard />;
      case 'daily-ritual':
        return <DailyRitual />;
      case 'coins':
        return <AstroCoinsShop />;
      case 'summary':
        return <ConsultationSummaryPage />;
      case 'membership':
        return <MembershipPage />;
      case 'membership-manage':
        return <MembershipManagePage />;
      case 'muhurat':
        return <MuhuratMarketplace />;
      case 'b2b-api':
        return <B2BMuhuratAPI />;
      case 'astrologer-portal':
        return <AstrologerDashboard />;
      case 'analytics-portal':
        return <BusinessAnalytics />;
      case 'badges':
        return <BadgesPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f3f9] text-slate-900 relative flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* Main Navigation Header */}
      <Navbar />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8 relative z-10">
        {renderActivePage()}
      </main>

      {/* Modals & Overlays */}
      <NotificationToast />
      <ShareModal />
      <ConsultationCallModal />
      <AstrologerProfileModal />
      <NotificationCenter onNavigate={setActiveTab} />

      {/* Mobile Bottom Bar */}
      <MobileNav />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AstroProvider>
      <GamificationProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </GamificationProvider>
    </AstroProvider>
  );
}
