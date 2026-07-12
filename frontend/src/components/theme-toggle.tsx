'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } =
    useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark =
    resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() =>
        setTheme(
          isDark ? 'light' : 'dark'
        )
      }
      className="rounded-lg border border-gray-300 bg-white p-2 text-gray-900 hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
    >
      {isDark ? (
        <Sun
          size={18}
          className="text-yellow-400"
        />
      ) : (
        <Moon
          size={18}
          className="text-gray-700 dark:text-zinc-300"
        />
      )}
    </button>
  );
}