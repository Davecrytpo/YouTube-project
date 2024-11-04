import ReactPlayer from 'react-player';
import { ThumbsUp, ThumbsDown, Share2, Save, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
        <ReactPlayer
          url={video.embedUrl}
          width="100%"
          height="100%"
          controls
          playing
          config={{
            youtube: {
              playerVars: { showinfo: 1, controls: 1 }
            }
          }}
          className="absolute top-0 left-0"
        />
      </div>
      
      <div className="p-4">
        <h1 className="text-xl font-bold text-white mb-2">{video.title}</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#272727] pb-4">
          <div className="flex items-center gap-4">
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{video.channel.name}</h3>
                {video.channel.verified && (
                  <CheckCircle2 className="w-4 h-4 text-[#aaa]" />
                )}
              </div>
              <p className="text-sm text-[#aaa]">{video.channel.subscribers} subscribers</p>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-[#f2f2f2] font-medium">
              Subscribe
            </button>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex rounded-full bg-[#272727] overflow-hidden">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#3f3f3f] text-white border-r border-[#3f3f3f]">
                <ThumbsUp className="w-5 h-5" />
                <span>123K</span>
              </button>
              <button className="flex items-center px-4 py-2 hover:bg-[#3f3f3f] text-white">
                <ThumbsDown className="w-5 h-5" />
              </button>
            </div>
            
            <button className="flex items-center gap-2 bg-[#272727] text-white px-4 py-2 rounded-full hover:bg-[#3f3f3f]">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
            
            <button className="flex items-center gap-2 bg-[#272727] text-white px-4 py-2 rounded-full hover:bg-[#3f3f3f]">
              <Save className="w-5 h-5" />
              <span>Save</span>
            </button>
            
            <button className="p-2 hover:bg-[#272727] rounded-full text-white">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-4 bg-[#272727] rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 font-medium">
            {video.views} views • {video.timestamp}
          </div>
          <p className="mt-2 text-[#aaa] whitespace-pre-line">{video.description}</p>
        </div>
      </div>
    </div>
  );
}