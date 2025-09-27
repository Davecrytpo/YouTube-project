import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Save,
  MoreHorizontal,
  CheckCircle2,
  ListPlus,
} from 'lucide-react';
import { Video } from '../types';
import { useAppStore } from '../store/appStore';

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const {
    toggleLike,
    isLiked,
    toggleWatchLater,
    isInWatchLater,
    addToHistory,
    setCurrentVideo,
    isPlaying,
    setIsPlaying,
    addToQueueNext,
    toggleSubscribe,
    subscriptions,
  } = useAppStore();

  useEffect(() => {
    addToHistory(video.id);
    setCurrentVideo(video.id);
    setIsPlaying(true);
  }, [video.id, addToHistory, setCurrentVideo, setIsPlaying]);

  const liked = isLiked(video.id);
  const saved = isInWatchLater(video.id);
  const subscribed = subscriptions.includes(video.channel.name);

  return (
    <div className="flex flex-col">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
        <ReactPlayer
          url={video.videoUrl}
          width="100%"
          height="100%"
          controls
          playing={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          config={{
            youtube: {
              playerVars: { controls: 1 },
            },
          }}
          className="absolute left-0 top-0"
        />
      </div>

      <div className="p-4">
        <h1 className="mb-2 text-xl font-bold text-white">{video.title}</h1>

        <div className="flex flex-col justify-between gap-4 border-b border-[#272727] pb-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{video.channel.name}</h3>
                {video.channel.verified && <CheckCircle2 className="h-4 w-4 text-[#aaa]" />}
              </div>
              <p className="text-sm text-[#aaa]">{video.channel.subscribers} subscribers</p>
            </div>
            <button
              onClick={() => toggleSubscribe(video.channel.name)}
              className={`rounded-full px-4 py-2 font-medium ${subscribed ? 'bg-[#272727] text-white' : 'bg-white text-black hover:bg-[#f2f2f2]'}`}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex overflow-hidden rounded-full bg-[#272727]">
              <button
                onClick={() => toggleLike(video.id)}
                className={`flex items-center gap-2 border-r border-[#3f3f3f] px-4 py-2 text-white hover:bg-[#3f3f3f] ${liked ? 'bg-[#3f3f3f]' : ''}`}
              >
                <ThumbsUp className="h-5 w-5" />
                <span>{liked ? 'Liked' : 'Like'}</span>
              </button>
              <button className="flex items-center px-4 py-2 text-white hover:bg-[#3f3f3f]">
                <ThumbsDown className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="flex items-center gap-2 rounded-full bg-[#272727] px-4 py-2 text-white hover:bg-[#3f3f3f]"
            >
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>

            <button
              onClick={() => toggleWatchLater(video.id)}
              className={`flex items-center gap-2 rounded-full bg-[#272727] px-4 py-2 text-white hover:bg-[#3f3f3f] ${saved ? 'ring-1 ring-[#3f3f3f]' : ''}`}
            >
              <Save className="h-5 w-5" />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => addToQueueNext(video.id)}
              className="flex items-center gap-2 rounded-full bg-[#272727] px-4 py-2 text-white hover:bg-[#3f3f3f]"
            >
              <ListPlus className="h-5 w-5" />
              <span>Add to queue</span>
            </button>

            <button className="rounded-full p-2 text-white hover:bg-[#272727]">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#272727] p-4 text-white">
          <div className="flex items-center gap-2 font-medium">
            {video.views} views • {video.timestamp}
          </div>
          <p className="mt-2 whitespace-pre-line text-[#aaa]">{video.description}</p>
        </div>
      </div>
    </div>
  );
}
