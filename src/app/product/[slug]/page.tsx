import { prisma } from '@/lib/db/prisma';
import { formatCurrencyKzt } from '@/lib/utils/format';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { brand: true, category: true }
  });

  if (!product) return <div className="container-page">Товар не найден.</div>;

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id }, isActive: true },
    take: 4
  });

  const whatsappText = encodeURIComponent(`Хочу заказать ${product.name} (${product.sku}) https://seguro-comp.kz/product/${product.slug}`);

  return (
    <div className="container-page space-y-8">
      <div className="surface grid gap-6 p-5 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-3">
          <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-800 to-slate-900" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="aspect-square rounded-lg border border-slate-800 bg-slate-950" />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-cyan-400">{product.category.name}</p>
          <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-sm text-slate-400">{product.brand.name} · SKU: {product.sku}</p>
          <p className="mt-4 text-4xl font-bold text-cyan-300">{formatCurrencyKzt(Number(product.retailPrice))}</p>
          <p className="mt-2 text-sm text-emerald-400">{product.stockQty > 0 ? `В наличии: ${product.stockQty}` : 'Под заказ'}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="rounded-md bg-cyan-400 px-4 py-2 font-semibold text-slate-950">Добавить в корзину</button>
            <button className="rounded-md border border-slate-700 px-4 py-2">Купить в 1 клик</button>
            <a href={`https://wa.me/77000000000?text=${whatsappText}`} className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950">WhatsApp</a>
          </div>
          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300">
            {product.description ?? product.shortDescription ?? 'Описание будет добавлено менеджером.'}
          </div>
        </div>
      </div>

      <section className="surface p-5">
        <h2 className="mb-3 text-xl font-semibold">Похожие товары</h2>
        <div className="grid gap-3 md:grid-cols-4">
          {related.map((item) => (
            <a key={item.id} href={`/product/${item.slug}`} className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm hover:border-cyan-400/40">
              {item.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
