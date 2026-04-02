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
    <article className="surface p-4 transition hover:border-cyan-400/40">
      <div className="mb-3 h-36 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900" />
      <h3 className="line-clamp-2 text-base font-medium">{product.name}</h3>
      <p className="mt-1 text-xs text-slate-400">SKU: {product.sku}</p>
      <p className="text-xs text-slate-400">Бренд: {product.brand?.name ?? 'Seguro'}</p>
      <p className="mt-3 text-2xl font-bold text-cyan-300">{formatCurrencyKzt(product.retailPrice)}</p>
      <p className={`text-sm ${product.stockQty > 0 ? 'text-emerald-400' : 'text-amber-300'}`}>
        {product.stockQty > 0 ? `В наличии: ${product.stockQty}` : 'Под заказ'}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/product/${product.slug}`} className="rounded-md border border-slate-700 px-3 py-2 text-center text-sm">Подробнее</Link>
        <a href={`https://wa.me/77000000000?text=${whatsappText}`} className="rounded-md bg-cyan-400 px-3 py-2 text-center text-sm font-semibold text-slate-950">
          WhatsApp
        </a>
      </div>
    </article>
  );
}
