'use client';
import { useEffect, useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { DashboardClient } from '@/components/dashboard-client';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/dashboard').then((r) => r.json()).then(setData); }, []);
  return <AppShell><h2 className="mb-4 text-2xl font-semibold">Dashboard CODIR</h2>{data ? <DashboardClient data={data} /> : <p>Chargement...</p>}</AppShell>;
}
