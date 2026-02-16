import { describe, expect, it } from 'vitest';
import { computePriority } from '@/lib/priority';

describe('computePriority', () => {
  it('returns high band for strong impact low effort/risk', () => {
    expect(computePriority('HIGH', 'LOW', 'LOW')).toEqual({ score: 4, band: 'HIGH' });
  });

  it('returns low band for weak scenario', () => {
    expect(computePriority('LOW', 'HIGH', 'HIGH').band).toBe('LOW');
  });
});
