import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';
import { CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';

const MOCK_CHANNELS = [
  {
    id: '1',
    name: 'TechMaster Pro',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    subscribers: '1.2M',
    verified: true,
    newVideos: 3,
  },
  {
    id: '2',
    name: 'Future Insights',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    subscribers: '892K',
    verified: true,
    newVideos: 1,
  },
  {
    id: '3',
    name: 'Creative Visuals',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    subscribers: '650K',
    verified: false,
    newVideos: 5,
  },
];

export default function Subscriptions() {
  const { subscriptions, toggleSubscribe } = useAppStore();
  const latestFromSubs = MOCK_VIDEOS.filter((v) => subscriptions.includes(v.channel.name));
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Subscriptions</h1>
        <button className="font-medium text-[#3ea6ff] hover:text-blue-400">MANAGE</button>
      </div>

      <div className="mb-6 flex space-x-4 overflow-x-auto pb-4">
        {MOCK_CHANNELS.map((channel) => (
          <div key={channel.id} className="flex min-w-[100px] flex-col items-center">
            <div className="relative">
              <img src={channel.avatar} alt={channel.name} className="h-24 w-24 rounded-full" />
              {channel.newVideos > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white">
                  {channel.newVideos}
                </span>
              )}
            </div>
            <div className="mt-2 text-center">
              <div className="flex items-center justify-center space-x-1">
                <span className="truncate font-medium text-white">{channel.name}</span>
                {channel.verified && <CheckCircle2 className="h-4 w-4 text-[#aaa]" />}
              </div>
              <span className="text-sm text-[#aaa]">{channel.subscribers} subscribers</span>
              <div>
                <button
                  onClick={() => toggleSubscribe(channel.name)}
                  className={`mt-2 rounded-full px-3 py-1 text-sm ${subscriptions.includes(channel.name) ? 'bg-[#272727] text-white' : 'bg-white text-black'}`}
                >
                  {subscriptions.includes(channel.name) ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#272727] pt-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Latest from your subscriptions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(latestFromSubs.length ? latestFromSubs : MOCK_VIDEOS).map((video) => (
            <div key={video.id} onClick={() => (window.location.href = `/watch/${video.id}`)}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
