import { AvailabilityStatus, MarkupScope, Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/prisma';
import { calculateRetailPrice } from '@/lib/pricing/engine';
import { slugify } from '@/lib/utils/format';
import type { SupplierRow, ImportStats } from './types';

async function getOrCreateBrand(name: string) {
  const slug = slugify(name);
  return prisma.brand.upsert({
    where: { slug },
    update: { name },
    create: { name, slug }
  });
}

async function getOrCreateCategory(name: string) {
  const slug = slugify(name);
  return prisma.category.upsert({
    where: { slug },
    update: { name },
    create: { name, slug }
  });
}

async function getMarkups(brandId: string, categoryId: string) {
  const [settings, brandRule, categoryRule] = await Promise.all([
    prisma.siteSetting.findFirst(),
    prisma.markupRule.findFirst({ where: { scope: MarkupScope.BRAND, brandId, isActive: true } }),
    prisma.markupRule.findFirst({ where: { scope: MarkupScope.CATEGORY, categoryId, isActive: true } })
  ]);

  return {
    globalMarkupPct: settings?.globalMarkupPct ?? 20,
    brandMarkupPct: brandRule?.percentage,
    categoryMarkupPct: categoryRule?.percentage
  };
}

export async function runSupplierImport(rows: SupplierRow[], fileName: string, sourceType: 'CSV' | 'XLSX') {
  const stats: ImportStats = { created: 0, updated: 0, archived: 0, skipped: 0, errors: 0 };
  const seenSkus = new Set<string>();

  const importRun = await prisma.importRun.create({
    data: {
      sourceType,
      fileName,
      status: 'PROCESSING'
    }
  });

  for (const row of rows) {
    try {
      if (!row.sku || !row.name) {
        stats.skipped += 1;
        continue;
      }

      seenSkus.add(row.sku);

      const [brand, category] = await Promise.all([getOrCreateBrand(row.brand), getOrCreateCategory(row.category)]);
      const markups = await getMarkups(brand.id, category.id);
      const existing = await prisma.product.findFirst({
        where: {
          OR: [{ externalId: row.external_id }, { sku: row.sku }]
        }
      });

      const pricing = calculateRetailPrice(row.purchase_price, {
        globalMarkupPct: markups.globalMarkupPct,
        brandMarkupPct: markups.brandMarkupPct,
        categoryMarkupPct: markups.categoryMarkupPct,
        productMarkupPct: existing?.markupOverridePct
      });

      const baseData: Prisma.ProductUncheckedCreateInput = {
        externalId: row.external_id,
        sku: row.sku,
        name: row.name,
        slug: slugify(`${row.name}-${row.sku}`),
        brandId: brand.id,
        categoryId: category.id,
        purchasePrice: row.purchase_price,
        retailPrice: pricing.retailPrice,
        stockQty: row.stock_qty,
        availabilityStatus: row.stock_qty > 0 ? AvailabilityStatus.IN_STOCK : AvailabilityStatus.PREORDER,
        description: row.description,
        shortDescription: row.short_description,
        specifications: row.specifications ?? {},
        images: row.image_urls ?? [],
        isActive: true,
        archivedAt: null,
        lastImportedAt: new Date()
      };

      if (existing) {
        await prisma.product.update({ where: { id: existing.id }, data: baseData });
        stats.updated += 1;
      } else {
        await prisma.product.create({ data: baseData });
        stats.created += 1;
      }
    } catch {
      stats.errors += 1;
    }
  }

  const archivedProducts = await prisma.product.updateMany({
    where: {
      sku: { notIn: [...seenSkus] },
      isActive: true
    },
    data: {
      isActive: false,
      archivedAt: new Date(),
      availabilityStatus: AvailabilityStatus.OUT_OF_STOCK
    }
  });
  stats.archived = archivedProducts.count;

  await prisma.importRun.update({
    where: { id: importRun.id },
    data: {
      status: stats.errors > 0 ? 'PARTIAL_SUCCESS' : 'SUCCESS',
      createdCount: stats.created,
      updatedCount: stats.updated,
      archivedCount: stats.archived,
      skippedCount: stats.skipped,
      errorCount: stats.errors,
      details: stats,
      finishedAt: new Date()
    }
  });

  return stats;
}
