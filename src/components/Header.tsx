import { useState } from 'react';
import { Search, Menu, Video, Bell, User, Mic, Upload } from 'lucide-react';
import AuthModal from './AuthModal';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f] z-50 flex items-center justify-between px-4">
        <div className="flex items-center">
          <button 
            onClick={onMenuClick} 
            className="p-2 hover:bg-[#272727] rounded-full"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center ml-4 cursor-pointer">
            <Video className="w-8 h-8 text-red-600" />
            <span className="ml-1 text-xl font-semibold text-white hidden xs:block">YouTube</span>
          </div>
        </div>

        <div className={`
          ${showSearch ? 'flex absolute left-0 right-0 p-2 bg-[#0f0f0f] md:relative md:p-0' : 'hidden md:flex'}
          flex-1 max-w-2xl mx-4
        `}>
          <div className="flex items-center w-full">
            <div className="flex-1 flex items-center bg-[#121212] border border-[#303030] rounded-l-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 bg-transparent text-white placeholder-[#aaa] outline-none"
              />
            </div>
            <button className="px-6 py-2 bg-[#272727] border-y border-r border-[#303030] rounded-r-full hover:bg-[#3f3f3f]">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="ml-4 p-2 hover:bg-[#272727] rounded-full hidden sm:block">
              <Mic className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            className="p-2 hover:bg-[#272727] rounded-full md:hidden"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="w-6 h-6 text-white" />
          </button>
          <button className="p-2 hover:bg-[#272727] rounded-full hidden sm:block">
            <Upload className="w-6 h-6 text-white" />
          </button>
          <button className="p-2 hover:bg-[#272727] rounded-full hidden sm:block">
            <Bell className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setShowAuthModal(true)}
            className="p-2 hover:bg-[#272727] rounded-full"
          >
            <User className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}