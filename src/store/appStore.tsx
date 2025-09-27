/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AppStoreState {
  likes: string[];
  watchLater: string[];
  history: string[];
  isLiked: (id: string) => boolean;
  toggleLike: (id: string) => void;
  isInWatchLater: (id: string) => boolean;
  toggleWatchLater: (id: string) => void;
  addToHistory: (id: string) => void;
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

  useEffect(() => writeArray('likes', likes), [likes]);
  useEffect(() => writeArray('watchLater', watchLater), [watchLater]);
  useEffect(() => writeArray('history', history), [history]);

  const api = useMemo<AppStoreState>(
    () => ({
      likes,
      watchLater,
      history,
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
    }),
    [likes, watchLater, history]
  );

  return <AppStoreContext.Provider value={api}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
}
