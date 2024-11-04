import { useState } from 'react';
import { ThumbsUp, Lock, ListFilter } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';

export default function LikedVideos() {
  const [isPrivate] = useState(true);
  const [sortBy, setSortBy] = useState('Recent');
  const videos = MOCK_VIDEOS.slice(0, 6);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#272727] rounded-full flex items-center justify-center">
            <ThumbsUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-white">Liked Videos</h1>
              {isPrivate && (
                <Lock className="w-4 h-4 text-[#aaa]" />
              )}
            </div>
            <p className="text-[#aaa]">{videos.length} videos</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {}}
            className="flex items-center space-x-2 px-4 py-2 bg-[#272727] rounded-full hover:bg-[#3f3f3f]"
          >
            <ListFilter className="w-5 h-5 text-white" />
            <span className="text-white">{sortBy}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} onClick={() => window.location.href = `/watch/${video.id}`}>
            <VideoCard video={video} />
          </div>
        ))}

        {videos.length === 0 && (
          <div className="col-span-full text-center py-12">
            <ThumbsUp className="w-16 h-16 text-[#aaa] mx-auto mb-4" />
            <h2 className="text-xl font-medium text-white mb-2">No liked videos</h2>
            <p className="text-[#aaa]">Videos that you have liked will be shown here.</p>
          </div>
        )}
      </div>
    </div>
  );
}