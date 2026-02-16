import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; import { requireAuth } from '@/lib/rbac'; import { Level, ProjectStatus } from '@prisma/client';
export async function GET() {
  await requireAuth();
  const [backlogCount, projects, backlog] = await Promise.all([prisma.backlogItem.count(), prisma.project.findMany(), prisma.backlogItem.findMany()]);
  const inProgress = projects.filter((p) => p.status === ProjectStatus.IN_PROGRESS).length;
  const inProd = projects.filter((p) => p.status === ProjectStatus.IN_PRODUCTION).length;
  const gainsHours = projects.reduce((a, p) => a + p.estimatedHours, 0);
  const gainsEuro = projects.reduce((a, p) => a + p.estimatedEuro, 0);
  const adoption = projects.length ? Math.round((inProd / projects.length) * 100) : 0;
  const avgRisk = backlog.length ? backlog.reduce((a, b) => a + ({ LOW: 1, MEDIUM: 2, HIGH: 3 }[b.risk as Level]), 0) / backlog.length : 0;
  const riskGlobal = avgRisk > 2.2 ? 'Élevé' : avgRisk > 1.4 ? 'Moyen' : 'Faible';
  return NextResponse.json({ backlogCount, inProgress, inProd, gainsHours, gainsEuro, adoption, riskGlobal, statusDist: Object.entries(projects.reduce((acc, p) => ((acc[p.status] = (acc[p.status] || 0) + 1), acc), {} as Record<string, number>)).map(([name, value]) => ({ name, value })), domainDist: Object.entries(backlog.reduce((acc, b) => ((acc[b.businessDomain] = (acc[b.businessDomain] || 0) + 1), acc), {} as Record<string, number>)).map(([name, value]) => ({ name, value })), roadmap: projects.map((p) => ({ name: p.name, progress: p.progress })) });
}
