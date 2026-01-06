'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { useEffect } from 'react';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Judix</h1>
        <p className="text-sm text-gray-400 mt-1">Task Manager</p>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-700">
        {user && (
          <div>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-4">
        <Link
          href="/dashboard"
          className={`block px-4 py-2 rounded transition-colors ${
            isActive('/dashboard')
              ? 'bg-blue-600'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/tasks"
          className={`block px-4 py-2 rounded transition-colors ${
            isActive('/dashboard/tasks')
              ? 'bg-blue-600'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          Tasks
        </Link>
        <Link
          href="/dashboard/profile"
          className={`block px-4 py-2 rounded transition-colors ${
            isActive('/dashboard/profile')
              ? 'bg-blue-600'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          Profile
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
