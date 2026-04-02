import type { SupplierRow } from './types';

export type ExistingIdentity = { id: string; externalId?: string | null; sku: string; isActive: boolean };

export function matchExistingProduct(rows: SupplierRow[], existing: ExistingIdentity[]) {
  const byExternal = new Map(existing.filter((x) => x.externalId).map((x) => [x.externalId as string, x]));
  const bySku = new Map(existing.map((x) => [x.sku, x]));

  return rows.map((row) => byExternal.get(row.external_id || '') ?? bySku.get(row.sku) ?? null);
}

export function computeArchiveCandidates(importRows: SupplierRow[], existing: ExistingIdentity[]) {
  const seenSku = new Set(importRows.map((r) => r.sku));
  return existing.filter((e) => e.isActive && !seenSku.has(e.sku));
}
