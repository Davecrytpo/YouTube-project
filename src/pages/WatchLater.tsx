import { useMemo } from 'react';
import { Clock, Trash2, MoreVertical } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';
import { useAppStore } from '../store/appStore';

export default function WatchLater() {
  const { watchLater, toggleWatchLater } = useAppStore();
  const videos = useMemo(() => MOCK_VIDEOS.filter((v) => watchLater.includes(v.id)), [watchLater]);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#272727]">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Watch Later</h1>
            <p className="text-[#aaa]">{videos.length} videos</p>
          </div>
        </div>
        <button className="text-[#aaa] hover:text-white">
          <MoreVertical className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-4">
        {videos.map((video) => (
          <div key={video.id} className="group flex rounded-xl p-2 hover:bg-[#272727]">
            <div className="flex-1" onClick={() => (window.location.href = `/watch/${video.id}`)}>
              <VideoCard video={video} layout="horizontal" />
            </div>
            <button
              onClick={() => toggleWatchLater(video.id)}
              className="p-2 text-[#aaa] opacity-0 group-hover:opacity-100 hover:text-white"
              aria-label="Remove from Watch Later"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}

        {videos.length === 0 && (
          <div className="py-12 text-center">
            <Clock className="mx-auto mb-4 h-16 w-16 text-[#aaa]" />
            <h2 className="mb-2 text-xl font-medium text-white">No videos in Watch Later</h2>
            <p className="text-[#aaa]">
              Save videos to watch later. Your list will be shown right here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
