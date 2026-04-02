import { describe, expect, it } from 'vitest';
import { calculateRetailPrice, resolveMarkup } from '@/lib/pricing/engine';

describe('pricing engine', () => {
  it('uses product markup as highest priority', () => {
    const markup = resolveMarkup({ productMarkupPct: 30, brandMarkupPct: 25, categoryMarkupPct: 20, globalMarkupPct: 10 });
    expect(markup).toEqual({ pct: 30, source: 'PRODUCT' });
  });

  it('rounds up to nearest 100 KZT', () => {
    const result = calculateRetailPrice(100050, { globalMarkupPct: 20 });
    expect(result.retailPrice).toBe(120100);
  });

  it('throws on non-positive purchase price', () => {
    expect(() => calculateRetailPrice(0, { globalMarkupPct: 20 })).toThrowError();
  });
});
