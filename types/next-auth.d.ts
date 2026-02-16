import { Role } from '@prisma/client';
import 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: { id: string; role: Role; employeeId?: string | null; name?: string | null; email?: string | null };
  }
}
declare module 'next-auth/jwt' {
  interface JWT { userId?: string; role?: Role; employeeId?: string | null }
}
