export type SupplierRow = {
  external_id?: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  purchase_price: number;
  stock_qty: number;
  description?: string;
  short_description?: string;
  specifications?: Record<string, string>;
  image_urls?: string[];
};

export type ImportStats = {
  created: number;
  updated: number;
  archived: number;
  skipped: number;
  errors: number;
};
