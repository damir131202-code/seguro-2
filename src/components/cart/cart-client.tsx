'use client';

import { useEffect, useMemo, useState } from 'react';
import { formatCurrencyKzt } from '@/lib/utils/format';

type CartItem = { id: string; name: string; qty: number; price: number };

export function CartClient() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('seguro_cart');
    if (raw) setItems(JSON.parse(raw));
  }, []);

  const total = useMemo(() => items.reduce((acc, item) => acc + item.qty * item.price, 0), [items]);

  const update = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem('seguro_cart', JSON.stringify(next));
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between rounded-lg border bg-white p-3">
          <div>
            <p>{item.name}</p>
            <p className="text-sm text-slate-500">{formatCurrencyKzt(item.price)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => update(items.map((i) => (i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)))}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => update(items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)))}>+</button>
            <button onClick={() => update(items.filter((i) => i.id !== item.id))} className="text-red-500">Удалить</button>
          </div>
        </div>
      ))}
      <p className="text-xl font-semibold">Итого: {formatCurrencyKzt(total)}</p>
    </div>
  );
}
