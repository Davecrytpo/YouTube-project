import { User } from 'lucide-react';

export default function Profile() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center space-x-3">
        <User className="h-8 w-8 text-red-500" />
        <h1 className="text-2xl font-bold text-white">Your Profile</h1>
      </div>
      <p className="text-[#aaa]">Sign in to manage your account, playlists, and subscriptions.</p>
    </div>
  );
}
