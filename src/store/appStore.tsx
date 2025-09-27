/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AppStoreState {
  likes: string[];
  watchLater: string[];
  history: string[];
  currentVideoId: string | null;
  isPlaying: boolean;
  queue: string[];
  subscriptions: string[]; // channel names
  isLiked: (id: string) => boolean;
  toggleLike: (id: string) => void;
  isInWatchLater: (id: string) => boolean;
  toggleWatchLater: (id: string) => void;
  addToHistory: (id: string) => void;
  setCurrentVideo: (id: string | null) => void;
  setIsPlaying: (playing: boolean) => void;
  addToQueueNext: (id: string) => void;
  nextInQueue: () => string | null;
  toggleSubscribe: (channelName: string) => void;
}

const AppStoreContext = createContext<AppStoreState | undefined>(undefined);

function readArray(key: string, fallback: string[] = []): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : fallback;
  } catch {
    return fallback;
  }
}

function writeArray(key: string, value: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [likes, setLikes] = useState<string[]>(() => readArray('likes'));
  const [watchLater, setWatchLater] = useState<string[]>(() => readArray('watchLater'));
  const [history, setHistory] = useState<string[]>(() => readArray('history'));
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('currentVideoId');
    } catch {
      return null;
    }
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    try {
      return localStorage.getItem('isPlaying') === 'true';
    } catch {
      return false;
    }
  });
  const [queue, setQueue] = useState<string[]>(() => readArray('queue'));
  const [subscriptions, setSubscriptions] = useState<string[]>(() => readArray('subscriptions'));

  useEffect(() => writeArray('likes', likes), [likes]);
  useEffect(() => writeArray('watchLater', watchLater), [watchLater]);
  useEffect(() => writeArray('history', history), [history]);
  useEffect(() => {
    try {
      if (currentVideoId) localStorage.setItem('currentVideoId', currentVideoId);
      else localStorage.removeItem('currentVideoId');
    } catch {
      // ignore
    }
  }, [currentVideoId]);
  useEffect(() => {
    try {
      localStorage.setItem('isPlaying', String(isPlaying));
    } catch {
      /* ignore */
    }
  }, [isPlaying]);
  useEffect(() => writeArray('queue', queue), [queue]);
  useEffect(() => writeArray('subscriptions', subscriptions), [subscriptions]);

  const api = useMemo<AppStoreState>(
    () => ({
      likes,
      watchLater,
      history,
      currentVideoId,
      isPlaying,
      queue,
      subscriptions,
      isLiked: (id) => likes.includes(id),
      toggleLike: (id) =>
        setLikes((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev])),
      isInWatchLater: (id) => watchLater.includes(id),
      toggleWatchLater: (id) =>
        setWatchLater((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev])),
      addToHistory: (id) =>
        setHistory((prev) => {
          const next = [id, ...prev.filter((x) => x !== id)];
          return next.slice(0, 100);
        }),
      setCurrentVideo: (id) => setCurrentVideoId(id),
      setIsPlaying: (playing) => setIsPlaying(playing),
      addToQueueNext: (id) => setQueue((prev) => [id, ...prev.filter((x) => x !== id)]),
      nextInQueue: () => {
        let next: string | null = null;
        setQueue((prev) => {
          const copy = [...prev];
          next = copy.shift() ?? null;
          return copy;
        });
        if (next) setCurrentVideoId(next);
        return next;
      },
      toggleSubscribe: (channelName) =>
        setSubscriptions((prev) =>
          prev.includes(channelName)
            ? prev.filter((c) => c !== channelName)
            : [channelName, ...prev]
        ),
    }),
    [likes, watchLater, history, currentVideoId, isPlaying, queue, subscriptions]
  );

  return <AppStoreContext.Provider value={api}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
}
