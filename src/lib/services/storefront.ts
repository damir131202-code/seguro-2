import { prisma } from '@/lib/db/prisma';
import { mvpCategories } from '@/data/demo';

export async function getHomeData() {
  const [featured, categories] = await Promise.all([
    prisma.product.findMany({ where: { isFeatured: true, isActive: true }, take: 8, include: { brand: true, category: true } }),
    prisma.category.findMany({ where: { isActive: true } })
  ]).catch(() => [[], []]);

  return {
    featured,
    categories: categories.length ? categories : mvpCategories.map((name) => ({ id: name, name, slug: name.toLowerCase().replace(/\s+/g, '-') }))
  };
}
