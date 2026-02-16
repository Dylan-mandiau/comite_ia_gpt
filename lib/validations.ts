import { z } from 'zod';

const level = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export const backlogSchema = z.object({
  businessDomain: z.string().min(2),
  painPoint: z.string().min(5),
  useCaseDesc: z.string().min(5),
  impact: level,
  effort: level,
  risk: level,
  status: z.enum(['IDEA', 'STUDY', 'POC', 'IN_PROGRESS', 'IN_PRODUCTION', 'ABANDONED']),
  ownerId: z.string().optional().nullable(),
  committeeDate: z.string().datetime().optional().nullable()
});

export const projectSchema = z.object({
  name: z.string().min(2),
  backlogItemId: z.string().optional().nullable(),
  sponsor: z.string().min(2),
  aiLeadId: z.string().optional().nullable(),
  status: z.enum(['IDEA', 'STUDY', 'POC', 'IN_PROGRESS', 'IN_PRODUCTION', 'ON_HOLD', 'ABANDONED']),
  progress: z.number().int().min(0).max(100),
  estimatedHours: z.number().nonnegative(),
  estimatedEuro: z.number().nonnegative(),
  actualHours: z.number().nonnegative().optional().nullable(),
  actualEuro: z.number().nonnegative().optional().nullable(),
  startDate: z.string().datetime(),
  targetDate: z.string().datetime(),
  alerts: z.string().optional().nullable()
});

export const kpiSchema = z.object({
  name: z.string().min(2),
  definition: z.string().min(5),
  method: z.string().min(5),
  frequency: z.enum(['WEEKLY', 'MONTHLY', 'QUARTERLY']),
  currentValue: z.number(),
  targetValue: z.number(),
  isPercentage: z.boolean(),
  source: z.string().min(2)
});

export const actionSchema = z.object({
  action: z.string().min(3),
  ownerId: z.string().optional().nullable(),
  dueDate: z.string().datetime(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE'])
});

export const meetingSchema = z.object({
  meetingDate: z.string().datetime(),
  topics: z.string().min(3),
  decisions: z.string().min(3),
  arbitrations: z.string().optional().nullable(),
  links: z.string().optional().nullable(),
  actions: z.array(actionSchema).default([])
});

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().nullable(),
  employeeId: z.string().min(2).optional().nullable(),
  role: z.enum(['ADMIN', 'EDITOR', 'VIEWER']),
  password: z.string().min(8)
});
