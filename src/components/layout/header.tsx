import Link from 'next/link';

const nav = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/delivery', label: 'Доставка и оплата' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="container-page flex flex-wrap items-center gap-3 py-4">
        <Link href="/" className="rounded-lg bg-gradient-to-r from-brand-700 to-cyan-500 px-3 py-2 text-lg font-bold text-white">
          Seguro Comp
        </Link>
        <div className="min-w-[220px] flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-400">
          Поиск по каталогу, SKU или бренду
        </div>
        <nav className="hidden items-center gap-4 text-sm lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="muted transition hover:text-sky-300">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/cart" className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-slate-950">
          Корзина
        </Link>
        <Link href="/admin" className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200">
          Админка
        </Link>
      </div>
    </header>
  );
}
