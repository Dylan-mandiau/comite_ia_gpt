import { Role } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error('UNAUTHORIZED');
  return session.user;
}

export function requireRole(role: Role, userRole: Role) {
  const hierarchy: Role[] = ['VIEWER', 'EDITOR', 'ADMIN'];
  if (hierarchy.indexOf(userRole) < hierarchy.indexOf(role)) throw new Error('FORBIDDEN');
}
