import { User } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function Profile() {
  const { likes, watchLater, history, subscriptions } = useAppStore();
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center space-x-3">
        <User className="h-8 w-8 text-red-500" />
        <h1 className="text-2xl font-bold text-white">Your Profile</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-[#272727] p-4">
          <p className="text-[#aaa]">Likes</p>
          <p className="text-2xl font-bold text-white">{likes.length}</p>
        </div>
        <div className="rounded-xl bg-[#272727] p-4">
          <p className="text-[#aaa]">Watch Later</p>
          <p className="text-2xl font-bold text-white">{watchLater.length}</p>
        </div>
        <div className="rounded-xl bg-[#272727] p-4">
          <p className="text-[#aaa]">History</p>
          <p className="text-2xl font-bold text-white">{history.length}</p>
        </div>
        <div className="rounded-xl bg-[#272727] p-4">
          <p className="text-[#aaa]">Subscriptions</p>
          <p className="text-2xl font-bold text-white">{subscriptions.length}</p>
        </div>
      </div>
      <p className="mt-6 text-[#aaa]">Sign in to sync these across devices using Supabase auth.</p>
    </div>
  );
}
