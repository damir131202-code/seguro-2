import Link from 'next/link';

const sections = [
  ['Товары', '/admin/products'],
  ['Категории', '/admin/categories'],
  ['Бренды', '/admin/brands'],
  ['Импорт', '/admin/import'],
  ['Правила наценки', '/admin/markup'],
  ['Заказы', '/admin/orders'],
  ['Настройки', '/admin/settings']
];

export default function AdminPage() {
  return (
    <div className="container-page space-y-5">
      <h1 className="text-2xl font-semibold">Админ-панель Seguro Comp</h1>
      <div className="grid gap-3 md:grid-cols-3">
        {sections.map(([label, href]) => (
          <Link key={href} href={href} className="rounded-lg border bg-white p-4 hover:border-brand-500">{label}</Link>
        ))}
      </div>
    </div>
  );
}
