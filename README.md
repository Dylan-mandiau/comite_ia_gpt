# IA Committee Tracker

## Variables `.env`
Copiez `.env.example` vers `.env` puis adaptez les valeurs.

- `DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/comite_ia`
- `NEXTAUTH_SECRET=<secret long et aléatoire>`
- `NEXTAUTH_URL=http://localhost:3000`
- `AUTH_IDENTIFIER_MODE=email` ou `employeeId`

> Sans `NEXTAUTH_SECRET`, NextAuth retourne une erreur de configuration.

## Run
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Comptes seed:
- admin@comite.ai / Admin1234
- editor@comite.ai / Editor1234
- viewer@comite.ai / Viewer1234
