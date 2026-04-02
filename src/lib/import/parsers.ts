import * as XLSX from 'xlsx';
import { z } from 'zod';
import type { SupplierRow } from './types';

const baseRowSchema = z.object({
  external_id: z.string().optional(),
  sku: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().min(1),
  category: z.string().min(1),
  purchase_price: z.coerce.number().positive(),
  stock_qty: z.coerce.number().int().nonnegative(),
  description: z.string().optional(),
  short_description: z.string().optional()
});

const normalize = (row: Record<string, unknown>): SupplierRow => {
  const parsed = baseRowSchema.parse(row);
  return {
    ...parsed,
    specifications: {},
    image_urls: []
  };
};

export function parseCsv(content: string): SupplierRow[] {
  const workbook = XLSX.read(content, { type: 'string' });
  const firstSheet = workbook.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(workbook.Sheets[firstSheet], { defval: '' });
  return rows.map(normalize);
}

export function parseXlsx(buffer: Buffer): SupplierRow[] {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const firstSheet = workbook.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(workbook.Sheets[firstSheet], { defval: '' });
  return rows.map(normalize);
}
