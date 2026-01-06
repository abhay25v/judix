'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';

const navItems = [
  { href: '/dashboard/profile', label: 'Profile' },
  { href: '/dashboard/tasks', label: 'Tasks' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const onLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6">
      <div className="mb-6">
        <div className="text-lg font-semibold tracking-tight">Judix</div>
        <div className="mt-1 text-xs text-gray-600 truncate">{user?.email ?? ''}</div>
      </div>

      <nav className="flex md:flex-col gap-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md border text-sm ${
                active ? 'bg-gray-100 border-gray-300 text-gray-900' : 'border-transparent text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6">
        <button onClick={onLogout} className="btn-secondary w-full">
          Logout
        </button>
      </div>
    </aside>
  );
}
