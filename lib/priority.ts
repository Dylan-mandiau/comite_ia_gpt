import { Level } from '@prisma/client';

const levelScore: Record<Level, number> = { LOW: 1, MEDIUM: 2, HIGH: 3 };

export function computePriority(impact: Level, effort: Level, risk: Level) {
  const score = levelScore[impact] * 2 - levelScore[effort] - levelScore[risk];
  const band = score >= 2 ? 'HIGH' : score >= 0 ? 'MEDIUM' : 'LOW';
  return { score, band };
}
