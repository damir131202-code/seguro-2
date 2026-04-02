import Link from 'next/link';
import { formatCurrencyKzt } from '@/lib/utils/format';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    retailPrice: number;
    stockQty: number;
    brand?: { name: string };
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const whatsappText = encodeURIComponent(`Здравствуйте! Хочу заказать ${product.name} (${product.sku})`);

  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="line-clamp-2 font-medium">{product.name}</h3>
      <p className="mt-1 text-xs text-slate-500">SKU: {product.sku}</p>
      <p className="text-xs text-slate-500">Бренд: {product.brand?.name ?? 'Seguro'}</p>
      <p className="mt-3 text-xl font-semibold text-brand-700">{formatCurrencyKzt(product.retailPrice)}</p>
      <p className={`text-sm ${product.stockQty > 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
        {product.stockQty > 0 ? `В наличии: ${product.stockQty}` : 'Под заказ'}
      </p>
      <div className="mt-4 flex gap-2">
        <Link href={`/product/${product.slug}`} className="rounded-md border px-3 py-2 text-sm">Подробнее</Link>
        <a href={`https://wa.me/77000000000?text=${whatsappText}`} className="rounded-md bg-emerald-500 px-3 py-2 text-sm text-white">
          WhatsApp
        </a>
      </div>
    </article>
  );
}
