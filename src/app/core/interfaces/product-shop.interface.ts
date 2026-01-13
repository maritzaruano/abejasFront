export interface ProductVariant {
  id: number;               // id del variant
  id_product: number;
  price: number;
  weight_oz: string;
  stock: string;
  color: string;
  image_1_url: string;
  image_2_url: string;
  image_3_url: string;

  // agregado para tu carrito
  quantity?: number;
}

export interface ProductShop {
  id: number;               // id del producto
  name: string;
  description: string;

  SubcategoryId: number;
  subCategoryName: string;
  CategoryId: number;
  CategoryName: string;

  variants: ProductVariant[]; // ← ahora es un array de variants
}