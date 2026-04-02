import Link from 'next/link';
import { CartClient } from '@/components/cart/cart-client';

export default function CartPage() {
  return (
    <div className="container-page space-y-6">
      <h1 className="text-2xl font-semibold">Корзина</h1>
      <CartClient />
      <Link href="/checkout" className="inline-block rounded-md bg-brand-500 px-4 py-2 text-white">Перейти к оформлению</Link>
    </div>
  );
}
