import { prisma } from '@/lib/db/prisma';

export default async function AdminMarkupPage() {
  const settings = await prisma.siteSetting.findFirst();
  const rules = await prisma.markupRule.findMany();

  return (
    <div className="container-page space-y-4">
      <h1 className="text-2xl font-semibold">Настройки наценки</h1>
      <p>Глобальная наценка: {settings?.globalMarkupPct ?? 20}%</p>
      <div className="rounded-xl border bg-white p-4">
        {rules.map((rule) => (
          <p key={rule.id}>{rule.scope}: {rule.percentage}%</p>
        ))}
      </div>
    </div>
  );
}
