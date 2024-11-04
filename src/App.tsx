import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Subscriptions from './pages/Subscriptions';
import WatchLater from './pages/WatchLater';
import LikedVideos from './pages/LikedVideos';
import History from './pages/History';
import Trending from './pages/Trending';
import Shopping from './pages/Shopping';
import Watch from './pages/Watch';
import CategoryPage from './pages/CategoryPage';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="min-h-screen bg-[#0f0f0f]">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex pt-14">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar isOpen={isSidebarOpen} />
          </div>
          
          {/* Main Content */}
          <main className={`flex-1 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} transition-all duration-300 pb-16 lg:pb-0`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/watch-later" element={<WatchLater />} />
              <Route path="/liked-videos" element={<LikedVideos />} />
              <Route path="/history" element={<History />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/shopping" element={<Shopping />} />
              <Route path="/watch/:videoId" element={<Watch />} />
              <Route path="/category/:category" element={<CategoryPage />} />
            </Routes>
          </main>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </Router>
  );
}