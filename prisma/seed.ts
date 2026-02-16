import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { computePriority } from '../lib/priority';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({ where: { email: 'admin@comite.ai' }, update: {}, create: { name: 'Admin IA', email: 'admin@comite.ai', employeeId: 'EMP001', role: 'ADMIN', passwordHash: await hash('Admin1234', 10) } });
  const editor = await prisma.user.upsert({ where: { email: 'editor@comite.ai' }, update: {}, create: { name: 'Editor IA', email: 'editor@comite.ai', employeeId: 'EMP002', role: 'EDITOR', passwordHash: await hash('Editor1234', 10) } });
  await prisma.user.upsert({ where: { email: 'viewer@comite.ai' }, update: {}, create: { name: 'Viewer IA', email: 'viewer@comite.ai', employeeId: 'EMP003', role: 'VIEWER', passwordHash: await hash('Viewer1234', 10) } });

  const p = computePriority('HIGH', 'MEDIUM', 'LOW');
  const backlog = await prisma.backlogItem.create({ data: { readableId: 'IA-000001', businessDomain: 'Finance', painPoint: 'Temps de clôture long', useCaseDesc: 'Prévision des écritures', impact: 'HIGH', effort: 'MEDIUM', risk: 'LOW', priorityScore: p.score, priorityBand: p.band, status: 'POC', ownerId: editor.id, updatedById: admin.id } });
  await prisma.project.create({ data: { name: 'Copilote clôture', backlogItemId: backlog.id, sponsor: 'DSI Finance', aiLeadId: editor.id, status: 'IN_PROGRESS', progress: 55, estimatedHours: 180, estimatedEuro: 12000, startDate: new Date(), targetDate: new Date(Date.now()+1000*60*60*24*90), alerts: 'Data quality', updatedById: editor.id } });
  await prisma.kPI.create({ data: { name: 'Taux adoption', definition: 'Part des utilisateurs actifs', method: 'actifs/inscrits', frequency: 'MONTHLY', currentValue: 42, targetValue: 60, isPercentage: true, source: 'Analytics', updatedById: admin.id } });
  await prisma.committeeMeeting.create({ data: { meetingDate: new Date(), topics: 'Roadmap T2', decisions: 'Accélérer 2 POC', arbitrations: 'Priorité Finance', links: 'https://intranet/compte-rendu', updatedById: admin.id, actions: { create: [{ action: 'Préparer budget', ownerId: editor.id, dueDate: new Date(Date.now()+1000*60*60*24*14), status: 'TODO' }] } } });
}
main().finally(() => prisma.$disconnect());
