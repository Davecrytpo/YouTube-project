import React from 'react';
import ReactPlayer from 'react-player';
import { SkipForward, X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { MOCK_VIDEOS } from '../data/mockData';

export default function MiniPlayer() {
  const { currentVideoId, setCurrentVideo, isPlaying, setIsPlaying, nextInQueue } = useAppStore();
  const [muted, setMuted] = React.useState(false);

  if (!currentVideoId) return null;
  const video = MOCK_VIDEOS.find((v) => v.id === currentVideoId);
  if (!video) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#272727] bg-[#121212] md:left-auto md:w-[420px] md:border-l">
      <div className="flex items-center">
        <div className="aspect-video w-48 bg-black">
          <ReactPlayer
            url={video.videoUrl}
            width="100%"
            height="100%"
            playing={isPlaying}
            muted={muted}
            controls={false}
          />
        </div>
        <div className="min-w-0 flex-1 px-3 py-2">
          <p className="truncate text-sm text-white">{video.title}</p>
          <p className="truncate text-xs text-[#aaa]">{video.channel.name}</p>
        </div>
        <div className="flex items-center gap-2 px-3">
          <button
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full p-2 text-white hover:bg-[#272727]"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            aria-label="Next"
            onClick={() => {
              nextInQueue();
            }}
            className="rounded-full p-2 text-white hover:bg-[#272727]"
          >
            <SkipForward className="h-5 w-5" />
          </button>
          <button
            aria-label={muted ? 'Unmute' : 'Mute'}
            onClick={() => setMuted(!muted)}
            className="rounded-full p-2 text-white hover:bg-[#272727]"
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <button
            aria-label="Close"
            onClick={() => setCurrentVideo(null)}
            className="rounded-full p-2 text-white hover:bg-[#272727]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
