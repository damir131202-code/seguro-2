import Link from 'next/link';
import { Hero } from '@/components/home/hero';
import { ProductCard } from '@/components/catalog/product-card';
import { getHomeData } from '@/lib/services/storefront';

export default async function HomePage() {
  const { featured, categories } = await getHomeData();

  return (
    <div className="container-page space-y-10">
      <Hero />

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Популярные категории</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <Link key={category.slug} href={`/catalog/${category.slug}`} className="rounded-lg border bg-white p-4 hover:border-brand-500">
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Рекомендуемые товары</h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
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
            : <p className="text-slate-600">Добавьте featured-товары в админке.</p>}
        </div>
      </section>
    </div>
  );
}
