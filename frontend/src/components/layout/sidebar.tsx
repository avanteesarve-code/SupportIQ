'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] =
    useState(false);

  const links = [
    {
      href: '/dashboard',
      label: 'Dashboard',
    },
    {
      href: '/tickets',
      label: 'Tickets',
    },
  ];

  return (
    <aside
      className={`min-h-screen border-r border-gray-200 bg-white p-4 transition-all duration-300 dark:border-zinc-800 dark:bg-black ${
        collapsed ? 'w-14' : 'w-64'
      }`}
    >
      <div
        className={`mb-6 flex ${
          collapsed
            ? 'flex-col items-center justify-center gap-2'
            : 'items-center justify-between gap-2'
        }`}
      >
        {!collapsed && (
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            SupportIQ
          </h2>
        )}

        <button
          type="button"
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="flex h-8 w-8 flex-col items-center justify-center gap-1 rounded text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-zinc-900"
        >
          <span className="h-0.5 w-4 bg-gray-900 dark:bg-white"></span>
          <span className="h-0.5 w-4 bg-gray-900 dark:bg-white"></span>
          <span className="h-0.5 w-4 bg-gray-900 dark:bg-white"></span>
        </button>

        <ThemeToggle />
      </div>

      {!collapsed && (
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-gray-900 transition-colors dark:text-gray-100 ${
                pathname === link.href
                    ? 'bg-gray-100 font-medium dark:bg-zinc-900'
                  : 'hover:bg-gray-100 dark:hover:bg-zinc-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </aside>
  );
}