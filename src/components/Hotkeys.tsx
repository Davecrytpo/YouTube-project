import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export default function Hotkeys() {
  const { isPlaying, setIsPlaying, nextInQueue } = useAppStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Avoid when typing in inputs
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement).isContentEditable)
        return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      } else if (e.key.toLowerCase() === 'n') {
        nextInQueue();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isPlaying, setIsPlaying, nextInQueue]);

  return null;
}
