import { Video } from '../types';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  onVideoSelect: (videoId: string) => void;
}

export default function VideoGrid({ videos, onVideoSelect }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[1200px] mx-auto p-4">
      {videos.map((video) => (
        <div 
          key={video.id} 
          onClick={() => onVideoSelect(video.id)}
          className="cursor-pointer w-full"
        >
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
}