import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; import { requireAuth } from '@/lib/rbac';
export async function GET() { await requireAuth(); const rows = await prisma.backlogItem.findMany(); const header = 'id,metier,statut,priorite\n'; const body = rows.map((r) => `${r.readableId},${r.businessDomain},${r.status},${r.priorityScore}`).join('\n'); return new NextResponse(header + body, { headers: { 'content-type': 'text/csv', 'content-disposition': 'attachment; filename=backlog.csv' } }); }
