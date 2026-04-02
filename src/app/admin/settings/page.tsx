import { prisma } from '@/lib/db/prisma';

export default async function AdminSettingsPage() {
  const setting = await prisma.siteSetting.findFirst();
  return (
    <div className="container-page space-y-4">
      <h1 className="text-2xl font-semibold">Настройки сайта</h1>
      <div className="rounded-xl border bg-white p-4 text-sm">
        <p>Название: {setting?.siteName ?? 'Seguro Comp'}</p>
        <p>Out-of-stock поведение: {setting?.outOfStockBehaviour ?? 'PREORDER'}</p>
        <p>WhatsApp: {setting?.whatsappPhone ?? '77000000000'}</p>
      </div>
    </div>
  );
}
