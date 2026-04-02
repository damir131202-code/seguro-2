import { prisma } from '@/lib/db/prisma';
import { ImportForm } from '@/components/admin/import-form';

export default async function AdminImportPage() {
  const history = await prisma.importRun.findMany({ orderBy: { startedAt: 'desc' }, take: 20 });

  return (
    <div className="container-page space-y-5">
      <h1 className="text-2xl font-semibold">Импорт товаров</h1>
      <ImportForm />
      <section className="space-y-2">
        <h2 className="text-lg font-medium">История импортов</h2>
        {history.map((item) => (
          <div key={item.id} className="rounded-md border bg-white p-3 text-sm">
            {item.fileName} · {item.status} · создано: {item.createdCount}, обновлено: {item.updatedCount}, архивировано: {item.archivedCount}, ошибок: {item.errorCount}
          </div>
        ))}
      </section>
    </div>
  );
}
