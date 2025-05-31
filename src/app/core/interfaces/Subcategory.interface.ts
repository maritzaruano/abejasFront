export interface Subcategory {
  id: number;
  name: string;
  description: string;
  id_category: number;
  category?: string;
}

export interface SubCategoryPost{
  name: string;
  description: string;
  id_category: number;
}

export interface SubCategoryPut{
  id: number;
  name: string;
  description: string;
  id_category: number;
}