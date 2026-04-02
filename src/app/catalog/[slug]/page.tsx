import { prisma } from '@/lib/db/prisma';
import { ProductCard } from '@/components/catalog/product-card';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) return <div className="container-page">Категория не найдена.</div>;

  const products = await prisma.product.findMany({
    where: { categoryId: category.id, isActive: true },
    include: { brand: true },
    take: 40
  });

  return (
    <div className="container-page space-y-5">
      <h1 className="text-2xl font-semibold">{category.name}</h1>
      <div className="grid gap-4 md:grid-cols-3">
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
    </div>
  );
}
