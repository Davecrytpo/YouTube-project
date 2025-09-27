import React from 'react';

export default function VideoCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video w-full rounded-xl bg-[#1f1f1f]" />
      <div className="mt-2 flex gap-3 px-2 md:px-0">
        <div className="mt-1 hidden h-9 w-9 rounded-full bg-[#1f1f1f] md:block" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-[#1f1f1f]" />
          <div className="h-3 w-1/2 rounded bg-[#1f1f1f]" />
        </div>
      </div>
    </div>
  );
}
