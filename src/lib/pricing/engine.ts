export type MarkupContext = {
  productMarkupPct?: number | null;
  brandMarkupPct?: number | null;
  categoryMarkupPct?: number | null;
  globalMarkupPct: number;
};

export type PricingResult = {
  markupPct: number;
  markupSource: 'PRODUCT' | 'BRAND' | 'CATEGORY' | 'GLOBAL';
  rawRetailPrice: number;
  retailPrice: number;
};

export const roundUpToNearest100 = (value: number) => Math.ceil(value / 100) * 100;

export function resolveMarkup(ctx: MarkupContext): { pct: number; source: PricingResult['markupSource'] } {
  if (ctx.productMarkupPct !== null && ctx.productMarkupPct !== undefined) {
    return { pct: ctx.productMarkupPct, source: 'PRODUCT' };
  }
  if (ctx.brandMarkupPct !== null && ctx.brandMarkupPct !== undefined) {
    return { pct: ctx.brandMarkupPct, source: 'BRAND' };
  }
  if (ctx.categoryMarkupPct !== null && ctx.categoryMarkupPct !== undefined) {
    return { pct: ctx.categoryMarkupPct, source: 'CATEGORY' };
  }
  return { pct: ctx.globalMarkupPct, source: 'GLOBAL' };
}

export function calculateRetailPrice(purchasePrice: number, ctx: MarkupContext): PricingResult {
  if (!Number.isFinite(purchasePrice) || purchasePrice <= 0) {
    throw new Error('purchase_price must be a positive number');
  }

  const { pct, source } = resolveMarkup(ctx);
  const sanitizedPct = pct < 0 ? 0 : pct;
  const rawRetailPrice = purchasePrice * (1 + sanitizedPct / 100);
  const retailPrice = roundUpToNearest100(rawRetailPrice);

  return {
    markupPct: sanitizedPct,
    markupSource: source,
    rawRetailPrice,
    retailPrice
  };
}
