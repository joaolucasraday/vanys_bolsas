export type CategoryKey =
  | 'todas'
  | 'estruturadas'
  | 'totes'
  | 'tiracolo'
  | 'clutches';

export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<CategoryKey, 'todas'>;
  categoryLabel: string;
  material: string;
  price: number;
  availability: 'Disponível' | 'Edição Limitada';
  shortDescription: string;
  dimensions: string;
  craftNote: string;
  gallery: string[];
  variants: ColorVariant[];
}

export interface LookbookEntry {
  id: string;
  title: string;
  subtitle: string;
  seasonNote: string;
  image: string;
  productId: string;
}

export interface CartItem {
  productId: string;
  variantName: string;
  variantHex: string;
  name: string;
  categoryLabel: string;
  price: number;
  image: string;
  quantity: number;
}
