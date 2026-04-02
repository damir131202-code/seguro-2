import { prisma } from '@/lib/db/prisma';

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ include: { _count: { select: { products: true } } } });
  return <div className="container-page"><h1 className="text-2xl font-semibold">Категории</h1><ul className="mt-4 space-y-2">{categories.map((c)=><li key={c.id} className="rounded border bg-white p-3">{c.name} ({c._count.products})</li>)}</ul></div>;
}
