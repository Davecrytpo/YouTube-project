import { useState } from 'react';
import { Flame, Music2, Film, Gamepad } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';

export default function Trending() {
  const [selectedCategory, setSelectedCategory] = useState('Now');
  const categories = [
    { id: 'now', label: 'Now', icon: Flame },
    { id: 'music', label: 'Music', icon: Music2 },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'gaming', label: 'Gaming', icon: Gamepad },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Flame className="w-8 h-8 text-red-500" />
        <h1 className="text-2xl font-bold text-white">Trending</h1>
      </div>

      <div className="flex mb-6 border-b border-[#272727]">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.label)}
            className={`flex items-center space-x-2 px-6 py-4 border-b-2 ${
              selectedCategory === category.label
                ? 'border-white text-white'
                : 'border-transparent text-[#aaa] hover:text-white'
            }`}
          >
            <category.icon className="w-5 h-5" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {MOCK_VIDEOS.map((video, index) => (
          <div
            key={video.id}
            className="flex items-start space-x-4 hover:bg-[#272727] p-2 rounded-xl cursor-pointer"
            onClick={() => window.location.href = `/watch/${video.id}`}
          >
            <div className="text-2xl font-bold text-[#aaa] w-8 text-center">
              {index + 1}
            </div>
            <div className="flex-1">
              <VideoCard video={video} layout="horizontal" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}