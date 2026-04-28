export interface ProductVariant {
  color: string | null;
  descriptions: string | null;
  descriptions_th: string | null;
  image_url: string;
  mess: string | null;
  name_en: string;
  name_th: string;
  pose: number | null;
  price: number;
  size_label: string;
  size_unit: string | null;
  size_value: string | null;
  sku: string;
  sort_inside: number | null;
  sort_product: number;
}

export interface CatalogProduct {
  base_price: number;
  card_id: string;
  category_id: number;
  category_slug: string
  cover_image: string;
  descriptions: string | null;
  descriptions_th: string | null;
  name_en: string;
  name_th: string;
  sort_product: number;
  variants: ProductVariant[];
}

export interface CatalogCategoryData {
  id: number;
  name: string;
  name_en: string;
  name_th: string;
  slug: string;
  sort_order: number;
  visible: boolean;
}

export interface PackageContent {
  name_en: string;
  name_th: string;
  qty: number;
  sku: string;
}

export interface CatalogPackage {
  base_price: number;
  bonus_type: string | null;
  bonus_value: string | null;
  contents: PackageContent[];
  description_en: string|null;
  description_th: string|null;
  discount_percent: number | null;
  id: number;
  image_url: string;
  items_count: number;
  name_en: string;
  name_th: string;
  price: number;
  sku: string;
  slug: string;
  sort_order: number;
  total_photos: number;
  visible: boolean;
}

export interface CatalogResponse {
  categories: CatalogCategoryData[];
  packages: CatalogPackage[];
  products: CatalogProduct[];
}

export interface CatalogCategory extends CatalogCategoryData {
  products: CatalogProduct[] | CatalogPackage[];
}

export type Catalog = CatalogCategory[];
