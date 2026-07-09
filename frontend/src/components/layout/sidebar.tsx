'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

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
    <aside className="h-screen w-64 shrink-0 border-r bg-white p-4">
      <h2 className="mb-6 text-2xl font-bold">
        SupportIQ
      </h2>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-md px-3 py-2 ${
              pathname === link.href
                ? 'bg-gray-200 font-medium'
                : 'hover:bg-gray-100'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}