import { NextRequest, NextResponse } from 'next/server';
import { apiError } from '@/lib/api'; import { prisma } from '@/lib/prisma'; import { requireAuth, requireRole } from '@/lib/rbac';
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) { try { const u = await requireAuth(); requireRole('ADMIN', u.role); await prisma.user.delete({ where: { id: params.id } }); return NextResponse.json({ ok: true }); } catch (e) { return apiError(e); } }
