import { NextRequest, NextResponse } from 'next/server';
import { compare, hash } from 'bcryptjs';
import { z } from 'zod';
import { apiError } from '@/lib/api'; import { prisma } from '@/lib/prisma'; import { requireAuth } from '@/lib/rbac';
const schema = z.object({ currentPassword: z.string(), newPassword: z.string().min(8) });
export async function POST(req: NextRequest) { try { const u = await requireAuth(); const data = schema.parse(await req.json()); const user = await prisma.user.findUniqueOrThrow({ where: { id: u.id } }); if (!(await compare(data.currentPassword, user.passwordHash))) throw new Error('Mot de passe actuel invalide'); await prisma.user.update({ where: { id: u.id }, data: { passwordHash: await hash(data.newPassword, 10) } }); return NextResponse.json({ ok: true }); } catch (e) { return apiError(e); } }
