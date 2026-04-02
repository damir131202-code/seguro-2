# Seguro Comp Ecommerce (MVP)

Новый проект интернет-магазина Seguro Comp, полностью с нуля (Next.js + TypeScript + Prisma + PostgreSQL).

## Что реализовано
- Публичная часть: главная, каталог, категория, карточка товара, корзина, checkout, статические страницы.
- Минимальная админка: dashboard, товары, категории, бренды, импорт, наценки, заказы, настройки.
- Import module: CSV/XLSX, лог импортов, создание/обновление/архивирование товаров.
- Pricing engine с приоритетами наценок и округлением вверх до 100 ₸.
- Базовый SEO: metadata, sitemap, robots.
- Unit tests: pricing logic + import logic.

## Архитектура
- `src/app` — роуты App Router (public/admin/api).
- `src/lib/pricing` — независимый pricing engine.
- `src/lib/import` — парсинг и бизнес-логика импорта.
- `src/lib/services` — read model для storefront.
- `prisma/schema.prisma` — БД схема.
- `prisma/seed.ts` — demo seed с категориями MVP и товарами.

## Локальный запуск
```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

## Тесты
```bash
npm run test
```

## Важные правила наценки
Приоритет:
1. Наценка товара
2. Наценка бренда
3. Наценка категории
4. Глобальная наценка

После расчета цена округляется **вверх** до ближайших 100 ₸.

## Import workflow
1. Админка -> Импорт -> загрузка CSV/XLSX.
2. Парсинг файла и валидация строк.
3. Поиск продукта по `external_id` или `sku`.
4. Update/Create + пересчет retail price.
5. Товары, исчезнувшие из файла, архивируются (`isActive=false`).
6. Сохраняется статистика и история import run.

## Следующий этап
- Аутентификация для админки.
- Полноценная редактура сущностей через формы.
- Email/Telegram/WhatsApp нотификации заказа.
- Избранное/сравнение/акции.
