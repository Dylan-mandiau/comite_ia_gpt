'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ListChecks, FolderKanban, BarChart3, Gavel, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const nav = [
  ['Dashboard', '/dashboard', LayoutDashboard],
  ['Backlog', '/backlog', ListChecks],
  ['Projets', '/projects', FolderKanban],
  ['KPI', '/kpis', BarChart3],
  ['Gouvernance', '/governance', Gavel],
  ['Mon compte', '/account', User],
  ['Utilisateurs', '/users', Users]
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen md:grid md:grid-cols-[220px_1fr]">
      <aside className="border-r bg-white p-4">
        <h1 className="mb-4 text-lg font-bold">IA Committee Tracker</h1>
        <nav className="space-y-1">
          {nav.map(([label, href, Icon]) => (
            <Link key={href} href={href as string} className={cn('flex items-center gap-2 rounded-md px-2 py-2 text-sm', pathname.startsWith(href as string) ? 'bg-secondary font-semibold' : 'hover:bg-secondary')}>
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}
