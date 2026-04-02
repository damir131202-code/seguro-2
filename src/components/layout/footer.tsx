export function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-800 bg-slate-950/80">
      <div className="container-page grid gap-4 py-8 text-sm text-slate-400 md:grid-cols-3">
        <p>© {new Date().getFullYear()} Seguro Comp</p>
        <p>Техника, комплектующие и серверные решения для Казахстана</p>
        <p className="md:text-right">WhatsApp: +7 (700) 000-00-00</p>
      </div>
    </footer>
  );
}
