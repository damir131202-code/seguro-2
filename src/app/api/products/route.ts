import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  const products = await prisma.product.findMany({ where: { isActive: true }, take: 50 });
  return NextResponse.json(products);
}
