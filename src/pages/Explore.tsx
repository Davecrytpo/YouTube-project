import { Grid2X2, Flame, Music2, Gamepad, Newspaper, Trophy, Lightbulb, Radio } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';

export default function Explore() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const q = params.get('q')?.toLowerCase() ?? '';
  const results = useMemo(() => {
    if (!q) return [] as typeof MOCK_VIDEOS;
    return MOCK_VIDEOS.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.channel.name.toLowerCase().includes(q) ||
        (v.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        (v.category || '').toLowerCase().includes(q)
    );
  }, [q]);

  const categories = [
    { icon: Flame, label: 'Trending', path: '/trending', color: 'text-red-500' },
    { icon: Music2, label: 'Music', path: '/music', color: 'text-pink-500' },
    { icon: Gamepad, label: 'Gaming', path: '/gaming', color: 'text-green-500' },
    { icon: Newspaper, label: 'News', path: '/news', color: 'text-blue-500' },
    { icon: Trophy, label: 'Sports', path: '/sports', color: 'text-yellow-500' },
    { icon: Lightbulb, label: 'Learning', path: '/learning', color: 'text-purple-500' },
    { icon: Radio, label: 'Live', path: '/live', color: 'text-red-400' },
    { icon: Grid2X2, label: 'Browse', path: '/browse', color: 'text-gray-400' },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Explore</h1>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <button
            key={category.label}
            onClick={() => navigate(category.path)}
            className="flex items-center space-x-4 rounded-xl bg-[#272727] p-4 transition-colors hover:bg-[#3f3f3f]"
          >
            <category.icon className={`h-8 w-8 ${category.color}`} />
            <span className="text-lg font-medium text-white">{category.label}</span>
          </button>
        ))}
      </div>

      {q && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-white">Search results for "{q}"</h2>
          {results.length === 0 ? (
            <p className="text-[#aaa]">No results found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((video) => (
                <div key={video.id} onClick={() => (window.location.href = `/watch/${video.id}`)}>
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
