import { useParams } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import { MOCK_VIDEOS } from '../data/mockData';

const CATEGORY_VIDEOS = {
  gaming: [
    {
      id: 'NraPNgoxTBI',
      title: 'Top 10 Gaming Moments of 2024',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
      videoUrl: 'https://www.youtube.com/watch?v=NraPNgoxTBI',
      channel: {
        name: 'GameMaster',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        subscribers: '2.1M',
        verified: true,
      },
      views: '1.2M',
      timestamp: '2 days ago',
      duration: '15:30',
      description: 'The best gaming moments from this year!',
    },
  ],
  music: [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Latest Hit Song - Official Music Video',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      channel: {
        name: 'MusicVEVO',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        subscribers: '5.3M',
        verified: true,
      },
      views: '3.4M',
      timestamp: '1 week ago',
      duration: '3:45',
      description: 'Official music video for the latest hit song!',
    },
  ],
};

export default function CategoryPage() {
  const { category } = useParams();
  const videos = CATEGORY_VIDEOS[category as keyof typeof CATEGORY_VIDEOS] || MOCK_VIDEOS;

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold capitalize text-white">{category} Videos</h1>
      <VideoGrid videos={videos} onVideoSelect={(id) => (window.location.href = `/watch/${id}`)} />
    </div>
  );
}
