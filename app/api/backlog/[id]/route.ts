import { NextRequest, NextResponse } from 'next/server';
import { apiError } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { computePriority } from '@/lib/priority';
import { requireAuth, requireRole } from '@/lib/rbac';
import { backlogSchema } from '@/lib/validations';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth();
    requireRole('EDITOR', user.role);
    const data = backlogSchema.parse(await req.json());
    const { score, band } = computePriority(data.impact, data.effort, data.risk);
    const item = await prisma.backlogItem.update({ where: { id: params.id }, data: { ...data, committeeDate: data.committeeDate ? new Date(data.committeeDate) : null, priorityScore: score, priorityBand: band, updatedById: user.id } });
    return NextResponse.json(item);
  } catch (e) { return apiError(e); }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth();
    requireRole('EDITOR', user.role);
    await prisma.backlogItem.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e) { return apiError(e); }
}
