import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import Comments from '../components/Comments';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';

export default function Watch() {
  const { videoId } = useParams();
  const video = MOCK_VIDEOS.find((v) => v.id === videoId);
  const relatedVideos = video
    ? MOCK_VIDEOS.filter((v) => v.id !== videoId).sort((a, b) => {
        const score = (x: typeof a) =>
          (x.category === video.category ? 2 : 0) +
          (x.tags || []).filter((t) => (video.tags || []).includes(t)).length;
        return score(b) - score(a);
      })
    : MOCK_VIDEOS;

  if (!video) return <div>Video not found</div>;

  return (
    <div className="mx-auto max-w-[1800px] p-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VideoPlayer video={video} />
          <Comments />
        </div>
        <div className="space-y-4">
          <h2 className="px-4 text-lg font-semibold text-white">Up next</h2>
          <div className="space-y-2">
            {relatedVideos.map((video) => (
              <div
                key={video.id}
                className="cursor-pointer rounded-xl p-2 hover:bg-[#272727]"
                onClick={() => (window.location.href = `/watch/${video.id}`)}
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
