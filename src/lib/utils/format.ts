export const formatCurrencyKzt = (value: number | string) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0
  }).format(Number(value));

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-я0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
