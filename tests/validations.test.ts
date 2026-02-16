import { describe, expect, it } from 'vitest';
import { backlogSchema } from '@/lib/validations';

describe('backlogSchema', () => {
  it('accepts valid payload', () => {
    const parsed = backlogSchema.parse({ businessDomain: 'RH', painPoint: 'Traitement manuel long', useCaseDesc: 'Routage des tickets', impact: 'MEDIUM', effort: 'LOW', risk: 'LOW', status: 'IDEA' });
    expect(parsed.businessDomain).toBe('RH');
  });

  it('rejects short pain point', () => {
    const result = backlogSchema.safeParse({ businessDomain: 'RH', painPoint: 'bad', useCaseDesc: 'Routage des tickets', impact: 'MEDIUM', effort: 'LOW', risk: 'LOW', status: 'IDEA' });
    expect(result.success).toBe(false);
  });
});
