import { NextRequest, NextResponse } from 'next/server';
import { apiError } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireRole } from '@/lib/rbac';
import { projectSchema } from '@/lib/validations';
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) { try { const u = await requireAuth(); requireRole('EDITOR', u.role); const data = projectSchema.parse(await req.json()); return NextResponse.json(await prisma.project.update({ where: { id: params.id }, data: { ...data, startDate: new Date(data.startDate), targetDate: new Date(data.targetDate), updatedById: u.id } })); } catch (e) { return apiError(e); } }
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) { try { const u = await requireAuth(); requireRole('EDITOR', u.role); await prisma.project.delete({ where: { id: params.id } }); return NextResponse.json({ ok: true }); } catch (e) { return apiError(e); } }
