import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';
import { CheckCircle2 } from 'lucide-react';

const MOCK_CHANNELS = [
  {
    id: '1',
    name: 'TechMaster Pro',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    subscribers: '1.2M',
    verified: true,
    newVideos: 3
  },
  {
    id: '2',
    name: 'Future Insights',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    subscribers: '892K',
    verified: true,
    newVideos: 1
  },
  {
    id: '3',
    name: 'Creative Visuals',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    subscribers: '650K',
    verified: false,
    newVideos: 5
  }
];

export default function Subscriptions() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Subscriptions</h1>
        <button className="text-[#3ea6ff] hover:text-blue-400 font-medium">MANAGE</button>
      </div>

      <div className="flex overflow-x-auto space-x-4 pb-4 mb-6">
        {MOCK_CHANNELS.map((channel) => (
          <div key={channel.id} className="flex flex-col items-center min-w-[100px]">
            <div className="relative">
              <img
                src={channel.avatar}
                alt={channel.name}
                className="w-24 h-24 rounded-full"
              />
              {channel.newVideos > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {channel.newVideos}
                </span>
              )}
            </div>
            <div className="mt-2 text-center">
              <div className="flex items-center justify-center space-x-1">
                <span className="text-white font-medium truncate">{channel.name}</span>
                {channel.verified && <CheckCircle2 className="w-4 h-4 text-[#aaa]" />}
              </div>
              <span className="text-sm text-[#aaa]">{channel.subscribers} subscribers</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#272727] pt-6">
        <h2 className="text-lg font-semibold text-white mb-4">Latest Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_VIDEOS.map((video) => (
            <div key={video.id} onClick={() => window.location.href = `/watch/${video.id}`}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}