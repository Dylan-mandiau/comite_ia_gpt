'use client';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function DashboardClient({ data }: { data: any }) {
  const cards = [
    ['Cas d’usage', data.backlogCount], ['Projets en cours', data.inProgress], ['En production', data.inProd],
    ['Gains estimés (h)', data.gainsHours], ['Gains estimés (€)', data.gainsEuro], ['Adoption (%)', data.adoption], ['Risque global', data.riskGlobal]
  ];
  return <div className="space-y-4"> 
    <div className="grid gap-3 md:grid-cols-3">{cards.map(([k,v]) => <Card key={String(k)}><p className="text-sm text-muted-foreground">{k}</p><p className="text-2xl font-bold">{String(v)}</p></Card>)}</div>
    <div className="grid gap-3 md:grid-cols-2">
      <Card><h3 className="mb-2 font-semibold">Projets par statut</h3><div className="h-64"><ResponsiveContainer><BarChart data={data.statusDist}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" fill="#3b82f6"/></BarChart></ResponsiveContainer></div></Card>
      <Card><h3 className="mb-2 font-semibold">Répartition métier</h3><div className="h-64"><ResponsiveContainer><PieChart><Pie data={data.domainDist} dataKey="value" nameKey="name">{data.domainDist.map((_: any,i:number)=><Cell key={i} fill={["#3b82f6","#10b981","#64748b","#2563eb"][i%4]}/> )}</Pie></PieChart></ResponsiveContainer></div></Card>
    </div>
    <Card><h3 className="mb-2 font-semibold">Avancement feuille de route</h3><div className="h-64"><ResponsiveContainer><BarChart data={data.roadmap}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="progress" fill="#10b981"/></BarChart></ResponsiveContainer></div></Card>
  </div>;
}
