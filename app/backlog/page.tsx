'use client';
import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const empty = { businessDomain: '', painPoint: '', useCaseDesc: '', impact: 'MEDIUM', effort: 'MEDIUM', risk: 'MEDIUM', status: 'IDEA', committeeDate: '' };

export default function BacklogPage() {
  const [rows, setRows] = useState<any[]>([]); const [form, setForm] = useState<any>(empty); const [q, setQ] = useState(''); const [status, setStatus] = useState(''); const [page, setPage] = useState(1);
  const load = async () => setRows(await (await fetch('/api/backlog')).json());
  useEffect(() => { load(); }, []);
  const filtered = useMemo(() => rows.filter((r) => (!q || r.useCaseDesc.toLowerCase().includes(q.toLowerCase())) && (!status || r.status === status)), [rows,q,status]);
  const paged = filtered.slice((page-1)*10, page*10);
  return <AppShell><div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 className="text-2xl font-semibold">Backlog IA</h2><div className="flex gap-2"><a href="/api/export/backlog"><Button>Export CSV</Button></a></div></div>
  <Card className="mb-4 grid gap-2 md:grid-cols-4">
    <Input placeholder="Métier" value={form.businessDomain} onChange={(e)=>setForm({...form,businessDomain:e.target.value})}/>
    <Input placeholder="Irritant" value={form.painPoint} onChange={(e)=>setForm({...form,painPoint:e.target.value})}/>
    <Input placeholder="Cas d'usage" value={form.useCaseDesc} onChange={(e)=>setForm({...form,useCaseDesc:e.target.value})}/>
    <Button onClick={async()=>{await fetch('/api/backlog',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form, committeeDate: form.committeeDate ? new Date(form.committeeDate).toISOString():null})}); setForm(empty); load();}}>Créer</Button>
    <Select value={form.impact} onChange={(e)=>setForm({...form,impact:e.target.value})}>{['LOW','MEDIUM','HIGH'].map(v=><option key={v}>{v}</option>)}</Select>
    <Select value={form.effort} onChange={(e)=>setForm({...form,effort:e.target.value})}>{['LOW','MEDIUM','HIGH'].map(v=><option key={v}>{v}</option>)}</Select>
    <Select value={form.risk} onChange={(e)=>setForm({...form,risk:e.target.value})}>{['LOW','MEDIUM','HIGH'].map(v=><option key={v}>{v}</option>)}</Select>
    <Select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>{['IDEA','STUDY','POC','IN_PROGRESS','IN_PRODUCTION','ABANDONED'].map(v=><option key={v}>{v}</option>)}</Select>
  </Card>
  <div className="mb-2 flex gap-2"><Input placeholder="Recherche" value={q} onChange={(e)=>setQ(e.target.value)}/><Select value={status} onChange={(e)=>setStatus(e.target.value)}><option value="">Tous statuts</option>{['IDEA','STUDY','POC','IN_PROGRESS','IN_PRODUCTION','ABANDONED'].map(v=><option key={v}>{v}</option>)}</Select></div>
  <Card><table className="w-full text-sm"><thead><tr className="text-left"><th>ID</th><th>Métier</th><th>Cas d'usage</th><th>Priorité</th><th>Statut</th><th/></tr></thead><tbody>{paged.map(r=><tr key={r.id} className="border-t"><td>{r.readableId}</td><td>{r.businessDomain}</td><td>{r.useCaseDesc}</td><td><Badge>{r.priorityBand} ({r.priorityScore})</Badge></td><td>{r.status}</td><td><Button className="bg-red-600" onClick={async()=>{await fetch(`/api/backlog/${r.id}`,{method:'DELETE'});load();}}>Supprimer</Button></td></tr>)}</tbody></table></Card>
  <div className="mt-2 flex gap-2"><Button onClick={()=>setPage(Math.max(1,page-1))}>Préc</Button><span>Page {page}</span><Button onClick={()=>setPage(page+1)}>Suiv</Button></div>
  </AppShell>;
}
