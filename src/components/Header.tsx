import { useState } from 'react';
import { Search, Menu, Bell, User, Mic, Upload } from 'lucide-react';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submitSearch = () => {
    const q = query.trim();
    if (q) navigate(`/explore?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between bg-[#0f0f0f] px-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            aria-label="Toggle menu"
            className="rounded-full p-2 hover:bg-[#272727]"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
          <div className="ml-4 flex cursor-pointer select-none items-center" aria-label="Home">
            <img src="/logo.svg" alt="YouTube Clone Logo" className="h-8 w-8" />
            <span className="ml-1 hidden text-xl font-semibold text-white xs:block">YouTube</span>
          </div>
        </div>

        <div
          className={`
          ${showSearch ? 'absolute left-0 right-0 flex bg-[#0f0f0f] p-2 md:relative md:p-0' : 'hidden md:flex'}
          mx-4 max-w-2xl flex-1
        `}
        >
          <div className="flex w-full items-center">
            <div className="flex flex-1 items-center rounded-l-full border border-[#303030] bg-[#121212]">
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
                className="w-full bg-transparent px-4 py-2 text-white placeholder-[#aaa] outline-none"
              />
            </div>
            <button
              aria-label="Search"
              className="rounded-r-full border-y border-r border-[#303030] bg-[#272727] px-6 py-2 hover:bg-[#3f3f3f]"
              onClick={submitSearch}
            >
              <Search className="h-5 w-5 text-white" />
            </button>
            <button
              aria-label="Voice search"
              className="ml-4 hidden rounded-full p-2 hover:bg-[#272727] sm:block"
            >
              <Mic className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="rounded-full p-2 hover:bg-[#272727] md:hidden"
            aria-label="Toggle search"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-6 w-6 text-white" />
          </button>
          <button
            aria-label="Upload"
            className="hidden rounded-full p-2 hover:bg-[#272727] sm:block"
          >
            <Upload className="h-6 w-6 text-white" />
          </button>
          <button
            aria-label="Notifications"
            className="hidden rounded-full p-2 hover:bg-[#272727] sm:block"
          >
            <Bell className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={() => setShowAuthModal(true)}
            aria-label="Account"
            className="rounded-full p-2 hover:bg-[#272727]"
          >
            <User className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
