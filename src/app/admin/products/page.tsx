import { prisma } from '@/lib/db/prisma';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ include: { brand: true, category: true }, take: 50 });

  return (
    <div className="container-page space-y-4">
      <h1 className="text-2xl font-semibold">Товары</h1>
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left"><tr><th className="p-2">Товар</th><th>SKU</th><th>Цена</th><th>Наличие</th><th>Активен</th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t"><td className="p-2">{p.name}</td><td>{p.sku}</td><td>{Number(p.retailPrice)}</td><td>{p.stockQty}</td><td>{p.isActive ? 'Да' : 'Нет'}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
