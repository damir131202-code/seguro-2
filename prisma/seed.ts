import { PrismaClient, AvailabilityStatus, MarkupScope } from '@prisma/client';
import { slugify } from '../src/lib/utils/format';

const prisma = new PrismaClient();

const categories = [
  'Ноутбуки','Видеокарты','Процессоры','Материнские платы','Оперативная память','SSD','HDD','Мониторы','Блоки питания','Корпуса','Серверы','Аксессуары'
];

const brands = ['ASUS', 'MSI', 'Gigabyte', 'Intel', 'AMD', 'Kingston', 'Samsung', 'Dell'];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.markupRule.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.siteSetting.deleteMany();

  await prisma.siteSetting.create({
    data: {
      siteName: 'Seguro Comp',
      globalMarkupPct: 20,
      outOfStockBehaviour: 'PREORDER',
      whatsappPhone: '77000000000',
      contactEmail: 'sales@seguro-comp.kz'
    }
  });

  const categoryEntities = await Promise.all(categories.map((name) => prisma.category.create({ data: { name, slug: slugify(name) } })));
  const brandEntities = await Promise.all(brands.map((name) => prisma.brand.create({ data: { name, slug: slugify(name) } })));

  for (let i = 0; i < 36; i += 1) {
    const category = categoryEntities[i % categoryEntities.length];
    const brand = brandEntities[i % brandEntities.length];
    const purchasePrice = 50000 + i * 15000;
    const retailPrice = Math.ceil((purchasePrice * 1.2) / 100) * 100;

    await prisma.product.create({
      data: {
        externalId: `SUP-${i + 1}`,
        sku: `SKU-${1000 + i}`,
        name: `${category.name} ${brand.name} Model ${i + 1}`,
        slug: slugify(`${category.name}-${brand.name}-${i + 1}`),
        brandId: brand.id,
        categoryId: category.id,
        purchasePrice,
        retailPrice,
        stockQty: i % 5 === 0 ? 0 : 5 + (i % 17),
        availabilityStatus: i % 5 === 0 ? AvailabilityStatus.PREORDER : AvailabilityStatus.IN_STOCK,
        shortDescription: `Краткое описание для товара ${i + 1}`,
        description: `Полное описание товара ${i + 1}. Подходит для розничных и B2B заказов.`,
        specifications: { warranty: '12 месяцев', country: 'Китай' },
        images: ['https://placehold.co/600x600/png'],
        isActive: true,
        isFeatured: i < 8,
        lastImportedAt: new Date()
      }
    });
  }

  await prisma.markupRule.create({ data: { scope: MarkupScope.CATEGORY, percentage: 18, categoryId: categoryEntities[0].id } });
  await prisma.markupRule.create({ data: { scope: MarkupScope.BRAND, percentage: 22, brandId: brandEntities[0].id } });

  console.log('Seed completed');
}

main().finally(async () => prisma.$disconnect());
