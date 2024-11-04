import { Grid2X2, Flame, Music2, Gamepad, Newspaper, Trophy, Lightbulb, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
  const navigate = useNavigate();

  const categories = [
    { icon: Flame, label: 'Trending', path: '/trending', color: 'text-red-500' },
    { icon: Music2, label: 'Music', path: '/music', color: 'text-pink-500' },
    { icon: Gamepad, label: 'Gaming', path: '/gaming', color: 'text-green-500' },
    { icon: Newspaper, label: 'News', path: '/news', color: 'text-blue-500' },
    { icon: Trophy, label: 'Sports', path: '/sports', color: 'text-yellow-500' },
    { icon: Lightbulb, label: 'Learning', path: '/learning', color: 'text-purple-500' },
    { icon: Radio, label: 'Live', path: '/live', color: 'text-red-400' },
    { icon: Grid2X2, label: 'Browse', path: '/browse', color: 'text-gray-400' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Explore</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.label}
            onClick={() => navigate(category.path)}
            className="flex items-center space-x-4 p-4 bg-[#272727] rounded-xl hover:bg-[#3f3f3f] transition-colors"
          >
            <category.icon className={`w-8 h-8 ${category.color}`} />
            <span className="text-lg font-medium text-white">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}