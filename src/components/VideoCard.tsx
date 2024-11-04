import { Video } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  layout?: 'grid' | 'horizontal';
}

export default function VideoCard({ video, layout = 'grid' }: VideoCardProps) {
  if (layout === 'horizontal') {
    return (
      <div className="flex space-x-2 group p-2 rounded-xl hover:bg-[#272727] transition-colors">
        <div className="relative flex-shrink-0 w-40 sm:w-48">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover rounded-xl"
            loading="lazy"
          />
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-white line-clamp-2">
            {video.title}
          </h3>
          <div className="mt-1">
            <p className="text-xs text-[#aaa] hover:text-white flex items-center">
              {video.channel.name}
              {video.channel.verified && (
                <CheckCircle2 className="w-3 h-3 text-[#aaa] ml-1" />
              )}
            </p>
            <div className="text-xs text-[#aaa] flex items-center">
              <span>{video.views} views</span>
              <span className="mx-1">•</span>
              <span>{video.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Thumbnail Container */}
      <div className="relative w-full">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-xl"
          loading="lazy"
        />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      {/* Video Info */}
      <div className="flex mt-2 px-2 md:px-0">
        <img
          src={video.channel.avatar}
          alt={video.channel.name}
          className="w-9 h-9 rounded-full mt-1 hidden md:block"
          loading="lazy"
        />
        <div className={`flex-1 ${video.channel.avatar ? 'md:ml-3' : ''}`}>
          <h3 className="font-medium text-sm md:text-base text-white line-clamp-2">
            {video.title}
          </h3>
          <div className="mt-1">
            <p className="text-xs md:text-sm text-[#aaa] hover:text-white flex items-center">
              {video.channel.name}
              {video.channel.verified && (
                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-[#aaa] ml-1" />
              )}
            </p>
            <div className="text-xs md:text-sm text-[#aaa] flex items-center">
              <span>{video.views} views</span>
              <span className="mx-1">•</span>
              <span>{video.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}