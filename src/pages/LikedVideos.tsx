import { useMemo, useState } from 'react';
import { ThumbsUp, Lock, ListFilter } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';
import { useAppStore } from '../store/appStore';

export default function LikedVideos() {
  const [isPrivate] = useState(true);
  const [sortBy] = useState('Recent');
  const { likes } = useAppStore();
  const videos = useMemo(() => MOCK_VIDEOS.filter((v) => likes.includes(v.id)), [likes]);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#272727]">
            <ThumbsUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-white">Liked Videos</h1>
              {isPrivate && <Lock className="h-4 w-4 text-[#aaa]" />}
            </div>
            <p className="text-[#aaa]">{videos.length} videos</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {}}
            className="flex items-center space-x-2 rounded-full bg-[#272727] px-4 py-2 hover:bg-[#3f3f3f]"
          >
            <ListFilter className="h-5 w-5 text-white" />
            <span className="text-white">{sortBy}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div key={video.id} onClick={() => (window.location.href = `/watch/${video.id}`)}>
            <VideoCard video={video} />
          </div>
        ))}

        {videos.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <ThumbsUp className="mx-auto mb-4 h-16 w-16 text-[#aaa]" />
            <h2 className="mb-2 text-xl font-medium text-white">No liked videos</h2>
            <p className="text-[#aaa]">Videos that you have liked will be shown here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
