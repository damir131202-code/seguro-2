import { prisma } from '@/lib/db/prisma';

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({ include: { _count: { select: { products: true } } } });
  return <div className="container-page"><h1 className="text-2xl font-semibold">Бренды</h1><ul className="mt-4 space-y-2">{brands.map((b)=><li key={b.id} className="rounded border bg-white p-3">{b.name} ({b._count.products})</li>)}</ul></div>;
}
