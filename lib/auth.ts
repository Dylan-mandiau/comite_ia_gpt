import { compare } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';

const mode = process.env.AUTH_IDENTIFIER_MODE ?? 'email';

function getAuthSecret() {
  if (process.env.NEXTAUTH_SECRET) return process.env.NEXTAUTH_SECRET;
  if (process.env.NODE_ENV === 'development') return 'dev-only-change-me-nextauth-secret';
  throw new Error('NEXTAUTH_SECRET manquant. Configurez NEXTAUTH_SECRET dans l’environnement.');
}

export const authOptions: NextAuthOptions = {
  secret: getAuthSecret(),
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/signin' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: mode, type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials.password) return null;

        const user =
          mode === 'employeeId'
            ? await prisma.user.findUnique({ where: { employeeId: credentials.identifier } })
            : await prisma.user.findUnique({ where: { email: credentials.identifier } });

        if (!user) return null;

        const valid = await compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          employeeId: user.employeeId,
        } as any;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.userId = user.id;
        token.employeeId = (user as any).employeeId;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId;
        (session.user as any).role = token.role;
        (session.user as any).employeeId = token.employeeId;
      }
      return session;
    },
  },
};
