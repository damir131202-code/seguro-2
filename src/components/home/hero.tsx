import Link from 'next/link';

export function Hero() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-brand-900 to-brand-500 px-6 py-12 text-white md:px-12">
      <h1 className="max-w-2xl text-3xl font-bold md:text-4xl">Seguro Comp — техника и комплектующие для дома и бизнеса</h1>
      <p className="mt-4 max-w-2xl text-white/90">Современный магазин электроники в Казахстане: честные цены, понятное наличие и быстрый заказ через WhatsApp.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/catalog" className="rounded-md bg-white px-4 py-2 text-brand-700">Перейти в каталог</Link>
        <a className="rounded-md border border-white px-4 py-2" href="https://wa.me/77000000000">Заказать в WhatsApp</a>
      </div>
    </section>
  );
}
