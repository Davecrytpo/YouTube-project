import { Home, PlaySquare, Clock, User, Video } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: PlaySquare, label: 'Subscriptions', path: '/subscriptions' },
    { icon: Video, label: 'Shorts', path: '/shorts' },
    { icon: Clock, label: 'Library', path: '/watch-later' },
    { icon: User, label: 'You', path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-[#272727] lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <tab.icon className={`w-5 h-5 mb-1 ${
              location.pathname === tab.path ? 'text-white' : 'text-[#aaa]'
            }`} />
            <span className={`text-xs ${
              location.pathname === tab.path ? 'text-white' : 'text-[#aaa]'
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}