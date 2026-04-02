import { describe, expect, it } from 'vitest';
import { computeArchiveCandidates, matchExistingProduct } from '@/lib/import/matcher';

describe('import logic', () => {
  const existing = [
    { id: '1', externalId: 'EX-1', sku: 'SKU-1', isActive: true },
    { id: '2', externalId: null, sku: 'SKU-2', isActive: true },
    { id: '3', externalId: 'EX-3', sku: 'SKU-3', isActive: true }
  ];

  it('matches by external_id then by sku', () => {
    const rows = [
      { external_id: 'EX-1', sku: 'SKU-X', name: 'A', brand: 'B', category: 'C', purchase_price: 100, stock_qty: 1 },
      { sku: 'SKU-2', name: 'A', brand: 'B', category: 'C', purchase_price: 100, stock_qty: 1 }
    ];
    const matches = matchExistingProduct(rows, existing);
    expect(matches[0]?.id).toBe('1');
    expect(matches[1]?.id).toBe('2');
  });

  it('finds archive candidates missing from import', () => {
    const rows = [{ sku: 'SKU-1', name: 'A', brand: 'B', category: 'C', purchase_price: 100, stock_qty: 1 }];
    const archived = computeArchiveCandidates(rows, existing);
    expect(archived.map((x) => x.id)).toEqual(['2', '3']);
  });
});
