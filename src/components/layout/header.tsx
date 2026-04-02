import Link from 'next/link';

const nav = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/delivery', label: 'Доставка и оплата' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/admin', label: 'Админка' }
];

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold text-brand-700">Seguro Comp</Link>
        <nav className="flex items-center gap-4 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-700">
              {item.label}
            </Link>
          ))}
          <Link href="/cart" className="rounded-md bg-brand-500 px-3 py-2 text-white">Корзина</Link>
        </nav>
      </div>
    </header>
  );
}
