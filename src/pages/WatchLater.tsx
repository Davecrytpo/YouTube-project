import { useState } from 'react';
import { Clock, Trash2, MoreVertical } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';

export default function WatchLater() {
  const [videos, setVideos] = useState(MOCK_VIDEOS.slice(0, 5));

  const removeVideo = (videoId: string) => {
    setVideos(videos.filter(v => v.id !== videoId));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#272727] rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Watch Later</h1>
            <p className="text-[#aaa]">{videos.length} videos</p>
          </div>
        </div>
        <button className="text-[#aaa] hover:text-white">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4">
        {videos.map((video) => (
          <div key={video.id} className="flex group hover:bg-[#272727] rounded-xl p-2">
            <div className="flex-1" onClick={() => window.location.href = `/watch/${video.id}`}>
              <VideoCard video={video} layout="horizontal" />
            </div>
            <button
              onClick={() => removeVideo(video.id)}
              className="p-2 opacity-0 group-hover:opacity-100 text-[#aaa] hover:text-white"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {videos.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-[#aaa] mx-auto mb-4" />
            <h2 className="text-xl font-medium text-white mb-2">No videos in Watch Later</h2>
            <p className="text-[#aaa]">Save videos to watch later. Your list will be shown right here.</p>
          </div>
        )}
      </div>
    </div>
  );
}