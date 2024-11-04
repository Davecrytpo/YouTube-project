import { useState } from 'react';
import { History as HistoryIcon, Search, Trash2, Clock, Calendar } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../data/mockData';

export default function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const today = MOCK_VIDEOS.slice(0, 3);
  const yesterday = MOCK_VIDEOS.slice(3, 5);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#272727] rounded-full flex items-center justify-center">
            <HistoryIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">History</h1>
            <p className="text-[#aaa]">Videos you watch will show up here</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 text-[#aaa] absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search watch history"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#121212] text-white pl-10 pr-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-[#3ea6ff] w-64"
            />
          </div>
          <button className="flex items-center space-x-2 text-[#aaa] hover:text-white">
            <Trash2 className="w-5 h-5" />
            <span>CLEAR ALL WATCH HISTORY</span>
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="w-64 pr-6">
          <div className="space-y-2">
            <button className="flex items-center space-x-3 w-full p-3 rounded-xl bg-[#272727] text-white">
              <Clock className="w-5 h-5" />
              <span>Watch history</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-[#272727] text-[#aaa]">
              <Calendar className="w-5 h-5" />
              <span>Community</span>
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-lg font-medium text-white mb-4">Today</h2>
            <div className="space-y-4">
              {today.map((video) => (
                <div key={video.id} onClick={() => window.location.href = `/watch/${video.id}`}>
                  <VideoCard video={video} layout="horizontal" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white mb-4">Yesterday</h2>
            <div className="space-y-4">
              {yesterday.map((video) => (
                <div key={video.id} onClick={() => window.location.href = `/watch/${video.id}`}>
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