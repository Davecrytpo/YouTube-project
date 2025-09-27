import { Play } from 'lucide-react';

export default function Shorts() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center space-x-3">
        <Play className="h-8 w-8 text-red-500" />
        <h1 className="text-2xl font-bold text-white">Shorts</h1>
      </div>
      <p className="text-[#aaa]">This is a placeholder for the Shorts experience.</p>
    </div>
  );
}
