export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/backlog/:path*', '/projects/:path*', '/kpis/:path*', '/governance/:path*', '/account/:path*', '/users/:path*', '/api/:path*']
};
