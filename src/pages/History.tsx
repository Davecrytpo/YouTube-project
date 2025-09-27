import { useMemo, useState } from 'react';
import { History as HistoryIcon, Search, Trash2, Clock, Calendar } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';
import { useAppStore } from '../store/appStore';

export default function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const { history } = useAppStore();
  const videos = useMemo(
    () =>
      history
        .map((id) => MOCK_VIDEOS.find((v) => v.id === id))
        .filter(Boolean) as typeof MOCK_VIDEOS,
    [history]
  );
  const today = videos.slice(0, 3);
  const yesterday = videos.slice(3, 6);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#272727]">
            <HistoryIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">History</h1>
            <p className="text-[#aaa]">Videos you watch will show up here</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-[#aaa]" />
            <input
              type="text"
              placeholder="Search watch history"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-full bg-[#121212] py-2 pl-10 pr-4 text-white outline-none focus:ring-2 focus:ring-[#3ea6ff]"
            />
          </div>
          <button className="flex items-center space-x-2 text-[#aaa] hover:text-white">
            <Trash2 className="h-5 w-5" />
            <span>CLEAR ALL WATCH HISTORY</span>
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="w-64 pr-6">
          <div className="space-y-2">
            <button className="flex w-full items-center space-x-3 rounded-xl bg-[#272727] p-3 text-white">
              <Clock className="h-5 w-5" />
              <span>Watch history</span>
            </button>
            <button className="flex w-full items-center space-x-3 rounded-xl p-3 text-[#aaa] hover:bg-[#272727]">
              <Calendar className="h-5 w-5" />
              <span>Community</span>
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <h2 className="mb-4 text-lg font-medium text-white">Today</h2>
            <div className="space-y-4">
              {today.map((video) => (
                <div key={video.id} onClick={() => (window.location.href = `/watch/${video.id}`)}>
                  <VideoCard video={video} layout="horizontal" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-medium text-white">Yesterday</h2>
            <div className="space-y-4">
              {yesterday.map((video) => (
                <div key={video.id} onClick={() => (window.location.href = `/watch/${video.id}`)}>
                  <VideoCard video={video} layout="horizontal" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
