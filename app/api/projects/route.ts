import { NextRequest, NextResponse } from 'next/server';
import { apiError } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireRole } from '@/lib/rbac';
import { projectSchema } from '@/lib/validations';

export async function GET() { try { await requireAuth(); return NextResponse.json(await prisma.project.findMany({ include: { backlogItem: true, aiLead: true }, orderBy: { updatedAt: 'desc' } })); } catch (e) { return apiError(e); } }
export async function POST(req: NextRequest) { try { const u = await requireAuth(); requireRole('EDITOR', u.role); const data = projectSchema.parse(await req.json()); return NextResponse.json(await prisma.project.create({ data: { ...data, startDate: new Date(data.startDate), targetDate: new Date(data.targetDate), updatedById: u.id } })); } catch (e) { return apiError(e); } }
