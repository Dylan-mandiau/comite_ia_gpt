import { NextRequest, NextResponse } from 'next/server';
import { apiError } from '@/lib/api'; import { prisma } from '@/lib/prisma'; import { requireAuth, requireRole } from '@/lib/rbac'; import { kpiSchema } from '@/lib/validations';
export async function GET() { try { await requireAuth(); return NextResponse.json(await prisma.kPI.findMany({ orderBy: { updatedAt: 'desc' } })); } catch (e) { return apiError(e); } }
export async function POST(req: NextRequest) { try { const u = await requireAuth(); requireRole('EDITOR', u.role); const data = kpiSchema.parse(await req.json()); return NextResponse.json(await prisma.kPI.create({ data: { ...data, updatedById: u.id } })); } catch (e) { return apiError(e); } }
