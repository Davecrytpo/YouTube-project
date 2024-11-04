import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import Comments from '../components/Comments';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';

export default function Watch() {
  const { videoId } = useParams();
  const video = MOCK_VIDEOS.find(v => v.id === videoId);
  const relatedVideos = MOCK_VIDEOS.filter(v => v.id !== videoId);

  if (!video) return <div>Video not found</div>;

  return (
    <div className="max-w-[1800px] mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoPlayer video={video} />
          <Comments />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold px-4 text-white">Up next</h2>
          <div className="space-y-2">
            {relatedVideos.map((video) => (
              <div
                key={video.id}
                className="cursor-pointer hover:bg-[#272727] rounded-xl p-2"
                onClick={() => window.location.href = `/watch/${video.id}`}
              >
                <VideoCard video={video} layout="horizontal" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}