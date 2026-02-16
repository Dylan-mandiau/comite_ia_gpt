import { NextRequest, NextResponse } from 'next/server';
import { apiError } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { computePriority } from '@/lib/priority';
import { requireAuth, requireRole } from '@/lib/rbac';
import { backlogSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireAuth();
    const items = await prisma.backlogItem.findMany({ include: { owner: true, updatedBy: true }, orderBy: { updatedAt: 'desc' } });
    return NextResponse.json(items);
  } catch (e) { return apiError(e); }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    requireRole('EDITOR', user.role);
    const data = backlogSchema.parse(await req.json());
    const { score, band } = computePriority(data.impact, data.effort, data.risk);
    const count = await prisma.backlogItem.count();
    const item = await prisma.backlogItem.create({
      data: {
        ...data,
        committeeDate: data.committeeDate ? new Date(data.committeeDate) : null,
        readableId: `IA-${String(count + 1).padStart(6, '0')}`,
        priorityScore: score,
        priorityBand: band,
        updatedById: user.id
      }
    });
    return NextResponse.json(item);
  } catch (e) { return apiError(e); }
}
