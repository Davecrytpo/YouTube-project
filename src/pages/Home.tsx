import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import { MOCK_VIDEOS } from '../data/mockData';
import VideoCardSkeleton from '../components/VideoCardSkeleton';

export default function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if mobile on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobileCategories = ['All', 'Gaming', 'News', 'Movies', 'Music'];
  const desktopCategories = [
    'All',
    'Gaming',
    'Music',
    'Movies',
    'News',
    'Computer Security',
    'AI',
    'Cryptocurrency',
    'Live',
    'Podcasts',
    'Sports',
    'Learning',
  ];

  const categories = isMobile ? mobileCategories : desktopCategories;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (category !== 'All') {
      navigate(`/category/${category.toLowerCase()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-14 z-10 border-b border-[#272727] bg-[#0f0f0f]">
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 py-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium
                ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-[#272727] text-white hover:bg-[#3f3f3f]'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <VideoGrid videos={MOCK_VIDEOS} onVideoSelect={(id) => navigate(`/watch/${id}`)} />
      )}
    </div>
  );
}
