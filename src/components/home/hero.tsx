import Link from 'next/link';

export function Hero() {
  return (
    <section className="surface relative overflow-hidden px-6 py-12 md:px-12">
      <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute -bottom-8 left-1/3 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
      <h1 className="relative max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
        Надёжный магазин электроники для retail и B2B клиентов в Казахстане
      </h1>
      <p className="relative mt-4 max-w-2xl text-slate-300">
        Удобный каталог, прозрачное наличие, автоматический пересчёт цен и быстрый заказ через WhatsApp.
      </p>
      <div className="relative mt-7 flex flex-wrap gap-3">
        <Link href="/catalog" className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950">Открыть каталог</Link>
        <a className="rounded-lg border border-slate-700 px-4 py-2" href="https://wa.me/77000000000">Заказать в WhatsApp</a>
      </div>
    </section>
  );
}
