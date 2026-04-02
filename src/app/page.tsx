import Link from 'next/link';
import { Hero } from '@/components/home/hero';
import { ProductCard } from '@/components/catalog/product-card';
import { getHomeData } from '@/lib/services/storefront';

export default async function HomePage() {
  const { featured, categories } = await getHomeData();

  return (
    <div className="container-page space-y-10">
      <Hero />

      <section className="surface p-5">
        <h2 className="mb-4 text-2xl font-semibold">Популярные категории</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          {categories.slice(0, 12).map((category) => (
            <Link key={category.slug} href={`/catalog/${category.slug}`} className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm hover:border-cyan-400/40">
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Гарантия и сервис', 'Официальная гарантия и поддержка по заказам'],
          ['Прозрачные цены', 'Закупочная цена + понятные правила наценки'],
          ['Быстрый контакт', 'Кнопка WhatsApp на каждой карточке товара']
        ].map((item) => (
          <article key={item[0]} className="surface p-5">
            <h3 className="font-semibold">{item[0]}</h3>
            <p className="mt-2 text-sm text-slate-300">{item[1]}</p>
          </article>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Рекомендуемые товары</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featured.length
            ? featured.map((product) => (
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
              ))
            : <p className="text-slate-400">Добавьте featured-товары в админке.</p>}
        </div>
      </section>
    </div>
  );
}
