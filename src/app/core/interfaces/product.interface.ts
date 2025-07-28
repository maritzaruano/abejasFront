export interface Product {
  id: number; // id variant
  name: string;
  id_product: number;
  description: string;
  price: number;
  options: string;
  image: string;
  id_subcategory: number;
  subCategoryName: string;
  CategoryId: number;
  CategoryName: string;
  stock: string;
  tax: number,
  weight_oz: string;
  length_in: string;
  width_in: string;
  height_in: string;
  image_1_url: string;
  sku: string;
  image_2_url: string;
  image_3_url: string;
  size: string;
  shiping_cost: number;

}

export interface ProductAdmin {
  id: number; // id variant
  name: string;
  description: string;
  id_subcategory: number;
  subCategoryName: string;
  status: boolean;
  CategoryId: number;
  CategoryName: string;
  variants: VariantAdmin[];
}

export interface VariantAdmin {
  id: number; // id variant
  description_variant	: string;
  id_product: number;
  price: number;
  options: string;
  image: string;
  stock: string;
  tax: number,
  weight_oz: string;
  length_in: string;
  width_in: string;
  height_in: string;
  image_1_url: string;
  sku: string;
  image_2_url: string;
  image_3_url: string;
  size: string;
  shiping_cost: number;

}

export interface ProductList {
  id: number; // id variant
  name: string;
}


export interface ProductPost {
  name: string;
  description: string;
  price: string;
  options: string;
  image: string;
  id_subcategory: string;
  stock: string;
  tax: string,
  weight_oz: string;
  length_in: string;
  width_in: string;
  height_in: string;
  image_1_url: string;
  sku: string;
  image_2_url: string;
  image_3_url: string;
  size: string;
  shiping_cost: string;
}


export interface ProductPut {
  id_product: number;
  name: string;
  description: string;
  price: number;
  options: string;
  tax: number,
  image: string;
  id_subcategory: number;
  stock: string;
  weight_oz: string;
  length_in: string;
  width_in: string;
  height_in: string;
  image_1_url: string;
  sku: string;
  image_2_url: string;
  image_3_url: string;
  size: string;
  shiping_cost: number;
}

export interface ApiResponse {
  status: string;
  message: string;
}


export interface ProductCategory{
  id: number;
  name: string;
  description: string;
  price: number;
  image_1_url: string;
  id_subcategory: number;
  subCategoryName: string;
  CategoryId: number;
  CategoryName: string;
}