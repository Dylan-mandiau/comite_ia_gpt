'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignInPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  return (
    <div className="mx-auto mt-20 max-w-sm rounded-lg border bg-white p-6">
      <h1 className="mb-4 text-xl font-semibold">Connexion</h1>
      <form className="space-y-3" onSubmit={async (e) => { e.preventDefault(); const res = await signIn('credentials', { identifier, password, redirect: false }); if (res?.ok) router.push('/dashboard'); else setError('Identifiants invalides'); }}>
        <label className="text-sm">Identifiant</label><Input value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
        <label className="text-sm">Mot de passe</label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full">Se connecter</Button>
      </form>
    </div>
  );
}
