import { prisma } from '@/lib/db/prisma';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } });

  return (
    <div className="container-page space-y-4">
      <h1 className="text-2xl font-semibold">Заказы</h1>
      {orders.map((order) => (
        <article key={order.id} className="rounded-xl border bg-white p-4">
          <p className="font-medium">{order.customerName} · {order.phone}</p>
          <p className="text-sm text-slate-500">Статус: {order.status} · Позиций: {order.items.length}</p>
        </article>
      ))}
    </div>
  );
}
