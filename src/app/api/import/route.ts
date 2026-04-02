import { NextResponse } from 'next/server';
import { parseCsv, parseXlsx } from '@/lib/import/parsers';
import { runSupplierImport } from '@/lib/import/service';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: 'Файл не передан' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase();
  let rows;

  if (ext === 'csv') {
    rows = parseCsv(await file.text());
    const stats = await runSupplierImport(rows, file.name, 'CSV');
    return NextResponse.json({ ok: true, stats });
  }

  if (ext === 'xlsx') {
    rows = parseXlsx(Buffer.from(await file.arrayBuffer()));
    const stats = await runSupplierImport(rows, file.name, 'XLSX');
    return NextResponse.json({ ok: true, stats });
  }

  return NextResponse.json({ ok: false, message: 'Поддерживаются только CSV/XLSX' }, { status: 400 });
}
