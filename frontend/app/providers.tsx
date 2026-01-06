'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/authStore';

export default function Providers({ children }: { children: React.ReactNode }) {
  const fetchMe = useAuthStore((s) => s.fetchMe);

  useEffect(() => {
    void fetchMe();
  }, [fetchMe]);

  return <>{children}</>;
}
