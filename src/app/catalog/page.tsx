import { prisma } from '@/lib/db/prisma';
import { ProductCard } from '@/components/catalog/product-card';

export default async function CatalogPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const page = Number(searchParams.page ?? 1);
  const q = typeof searchParams.q === 'string' ? searchParams.q : '';
  const brand = typeof searchParams.brand === 'string' ? searchParams.brand : undefined;

  const where = {
    isActive: true,
    ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
    ...(brand ? { brand: { slug: brand } } : {})
  };

  const [products, total, brands] = await Promise.all([
    prisma.product.findMany({ where, include: { brand: true }, skip: (page - 1) * 12, take: 12 }),
    prisma.product.count({ where }),
    prisma.brand.findMany({ where: { isActive: true } })
  ]);

  return (
    <div className="container-page grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-xl border bg-white p-4">
        <h3 className="font-semibold">Фильтры</h3>
        <div className="mt-4 space-y-2 text-sm">
          <p className="font-medium">Бренд</p>
          {brands.map((item) => (
            <a key={item.id} className="block hover:text-brand-700" href={`/catalog?brand=${item.slug}`}>{item.name}</a>
          ))}
        </div>
      </aside>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Каталог</h1>
          <p className="text-sm text-slate-500">Найдено: {total}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                sku: product.sku,
                retailPrice: Number(product.retailPrice),
                stockQty: product.stockQty,
                brand: product.brand
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
