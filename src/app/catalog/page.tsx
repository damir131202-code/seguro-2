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

  const [products, total, brands, categories] = await Promise.all([
    prisma.product.findMany({ where, include: { brand: true }, skip: (page - 1) * 12, take: 12 }),
    prisma.product.count({ where }),
    prisma.brand.findMany({ where: { isActive: true }, take: 10 }),
    prisma.category.findMany({ where: { isActive: true }, take: 12 })
  ]);

  return (
    <div className="container-page grid gap-4 xl:grid-cols-[260px_1fr_300px]">
      <aside className="surface sticky top-24 h-fit p-4">
        <h3 className="font-semibold">Категории</h3>
        <div className="mt-3 space-y-2 text-sm">
          {categories.map((item) => (
            <a key={item.id} className="block rounded-md px-2 py-1 text-slate-300 hover:bg-slate-800" href={`/catalog/${item.slug}`}>{item.name}</a>
          ))}
        </div>
        <h4 className="mt-6 font-semibold">Бренды</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {brands.map((item) => (
            <a key={item.id} className="rounded-full border border-slate-700 px-3 py-1 text-xs hover:border-cyan-400" href={`/catalog?brand=${item.slug}`}>{item.name}</a>
          ))}
        </div>
      </aside>

      <section className="space-y-4">
        <div className="surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold">Каталог товаров</h1>
            <p className="text-sm text-slate-400">Найдено позиций: {total}</p>
          </div>
          <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-500">
            Поиск и сортировка (MVP): используйте query `?q=` и `?brand=`
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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

      <aside className="surface sticky top-24 hidden h-fit p-4 xl:block">
        <h3 className="font-semibold">Конфигуратор сборки</h3>
        <p className="mt-2 text-sm text-slate-400">Подберите комплектующие по шагам и отправьте запрос в WhatsApp.</p>
        <div className="mt-4 space-y-2 text-sm">
          {['Процессор', 'Видеокарта', 'Память', 'Материнская плата', 'SSD/HDD', 'Блок питания', 'Корпус'].map((step) => (
            <div key={step} className="rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-300">{step}</div>
          ))}
        </div>
        <a className="mt-4 inline-flex rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950" href="https://wa.me/77000000000">
          Заказать сборку
        </a>
      </aside>
    </div>
  );
}
