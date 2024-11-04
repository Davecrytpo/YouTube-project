import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import { MOCK_VIDEOS } from '../data/mockData';

export default function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);

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
    'Learning'
  ];

  const categories = isMobile ? mobileCategories : desktopCategories;

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
      <div className="sticky top-14 z-10 bg-[#0f0f0f] border-b border-[#272727]">
        <div className="flex overflow-x-auto py-3 px-4 gap-3 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium
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

      <VideoGrid 
        videos={MOCK_VIDEOS} 
        onVideoSelect={(id) => navigate(`/watch/${id}`)} 
      />
    </div>
  );
}