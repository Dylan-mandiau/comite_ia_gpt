import { NextResponse } from 'next/server';

export function apiError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  if (message === 'UNAUTHORIZED') return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  if (message === 'FORBIDDEN') return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  if (message.startsWith('[')) return NextResponse.json({ error: 'Validation invalide', details: message }, { status: 400 });
  return NextResponse.json({ error: message }, { status: 400 });
}
