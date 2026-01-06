'use client';

import { useAuthStore } from '@/lib/authStore';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-gray-600">Your account details.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <dt className="text-xs font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-base font-medium text-gray-900">{user?.name ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-base font-medium text-gray-900 break-all">{user?.email ?? '—'}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
