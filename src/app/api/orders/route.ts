import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { checkoutSchema } from '@/lib/validators/order';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      customerName: parsed.data.customerName,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      comment: parsed.data.comment || null,
      contactMethod: parsed.data.contactMethod,
      totalAmount: 0
    }
  });

  return NextResponse.json({ ok: true, orderId: order.id });
}
