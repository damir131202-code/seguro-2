import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ ok: true, message: 'Заявка 1-клик принята' });
}
