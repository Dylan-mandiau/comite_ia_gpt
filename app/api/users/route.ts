import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { apiError } from '@/lib/api'; import { prisma } from '@/lib/prisma'; import { requireAuth, requireRole } from '@/lib/rbac'; import { userSchema } from '@/lib/validations';
export async function GET() { try { const u = await requireAuth(); requireRole('ADMIN', u.role); return NextResponse.json(await prisma.user.findMany({ select: { id: true, name: true, email: true, employeeId: true, role: true } })); } catch (e) { return apiError(e); } }
export async function POST(req: NextRequest) { try { const u = await requireAuth(); requireRole('ADMIN', u.role); const data = userSchema.parse(await req.json()); const { password, ...rest } = data; return NextResponse.json(await prisma.user.create({ data: { ...rest, passwordHash: await hash(password, 10) }, select: { id: true, name: true, email: true, employeeId: true, role: true } })); } catch (e) { return apiError(e); } }
