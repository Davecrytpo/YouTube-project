import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, History, Film, Gamepad, Newspaper, Trophy, Lightbulb, Music2, Flame, ShoppingBag, Radio, Clapperboard } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore', count: '12' },
    { icon: PlaySquare, label: 'Subscriptions', path: '/subscriptions', count: '3' },
    { icon: Clock, label: 'Watch Later', path: '/watch-later', count: '45' },
    { icon: ThumbsUp, label: 'Liked Videos', path: '/liked-videos', count: '127' },
    { icon: History, label: 'History', path: '/history' }
  ];

  const categories = [
    { icon: Flame, label: 'Trending', path: '/trending' },
    { icon: ShoppingBag, label: 'Shopping', path: '/shopping' },
    { icon: Music2, label: 'Music', path: '/music' },
    { icon: Film, label: 'Movies', path: '/movies' },
    { icon: Radio, label: 'Live', path: '/live' },
    { icon: Gamepad, label: 'Gaming', path: '/gaming' },
    { icon: Newspaper, label: 'News', path: '/news' },
    { icon: Trophy, label: 'Sports', path: '/sports' },
    { icon: Lightbulb, label: 'Learning', path: '/learning' },
    { icon: Clapperboard, label: 'Fashion & Beauty', path: '/fashion' }
  ];

  return (
    <aside 
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-[#0f0f0f] transition-all duration-300 z-40
        ${isOpen ? 'w-64' : 'w-16'} 
        ${isOpen ? 'translate-x-0' : 'translate-x-0 sm:translate-x-0'}
        ${isOpen ? 'shadow-2xl sm:shadow-none' : ''}`}
    >
      <div className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#272727] scrollbar-track-transparent">
        <nav className="p-2">
          {menuItems.map((item) => (
            <button 
              key={item.label} 
              onClick={() => navigate(item.path)}
              className={`flex items-center w-full p-3 rounded-xl transition-colors
                ${location.pathname === item.path ? 'bg-[#272727]' : 'hover:bg-[#272727]'}`}
            >
              <item.icon className={`w-5 h-5 ${
                location.pathname === item.path ? 'text-white' : 'text-[#aaa]'
              }`} />
              {isOpen && (
                <div className="flex justify-between items-center flex-1 ml-4 text-sm">
                  <span className={`${
                    location.pathname === item.path ? 'text-white' : 'text-[#aaa]'
                  }`}>
                    {item.label}
                  </span>
                  {item.count && (
                    <span className="text-xs text-[#aaa]">{item.count}</span>
                  )}
                </div>
              )}
            </button>
          ))}
          
          {isOpen && <hr className="my-2 border-[#272727]" />}
          
          {isOpen && (
            <h3 className="px-3 py-2 text-sm font-semibold text-[#aaa]">
              Explore
            </h3>
          )}
          
          {categories.map((category) => (
            <button 
              key={category.label} 
              onClick={() => navigate(category.path)}
              className={`flex items-center w-full p-3 rounded-xl transition-colors
                ${location.pathname === category.path ? 'bg-[#272727]' : 'hover:bg-[#272727]'}`}
            >
              <category.icon className={`w-5 h-5 ${
                location.pathname === category.path ? 'text-white' : 'text-[#aaa]'
              }`} />
              {isOpen && (
                <span className={`ml-4 text-sm ${
                  location.pathname === category.path ? 'text-white' : 'text-[#aaa]'
                }`}>
                  {category.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}