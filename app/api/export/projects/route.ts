import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; import { requireAuth } from '@/lib/rbac';
export async function GET() { await requireAuth(); const rows = await prisma.project.findMany(); const header = 'nom,statut,avancement,gain_heures,gain_euro\n'; const body = rows.map((r) => `${r.name},${r.status},${r.progress},${r.estimatedHours},${r.estimatedEuro}`).join('\n'); return new NextResponse(header + body, { headers: { 'content-type': 'text/csv', 'content-disposition': 'attachment; filename=projects.csv' } }); }
