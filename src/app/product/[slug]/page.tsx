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
      <div className="grid gap-6 md:grid-cols-2">
        <div className="aspect-square rounded-xl border bg-white" />
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-sm text-slate-500">{product.brand.name} · SKU: {product.sku}</p>
          <p className="mt-4 text-3xl font-bold text-brand-700">{formatCurrencyKzt(Number(product.retailPrice))}</p>
          <p className="mt-2 text-sm text-emerald-600">{product.stockQty > 0 ? 'В наличии' : 'Под заказ'}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="rounded-md bg-brand-500 px-4 py-2 text-white">В корзину</button>
            <button className="rounded-md border px-4 py-2">Купить в 1 клик</button>
            <a href={`https://wa.me/77000000000?text=${whatsappText}`} className="rounded-md bg-emerald-500 px-4 py-2 text-white">WhatsApp</a>
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-700">{product.description ?? product.shortDescription}</p>
        </div>
      </div>
      <section>
        <h2 className="mb-3 text-xl font-semibold">Похожие товары</h2>
        <div className="grid gap-3 md:grid-cols-4">
          {related.map((item) => (
            <a key={item.id} href={`/product/${item.slug}`} className="rounded-lg border bg-white p-3 text-sm">{item.name}</a>
          ))}
        </div>
      </section>
    </div>
  );
}
