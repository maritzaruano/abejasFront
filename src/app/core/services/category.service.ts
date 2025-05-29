import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Category, CategoryPost } from '../interfaces/category';
import { Subcategory } from '../interfaces/Subcategory.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private subcategorias: Subcategory[] = [
    { id: 1, name: 'Sub A1', categoriaId: 1 },
    { id: 2, name: 'Sub A2', categoriaId: 1 },
    { id: 3, name: 'Sub A3', categoriaId: 1 },
    { id: 4, name: 'Sub B1', categoriaId: 2 },
    { id: 5, name: 'Sub C1', categoriaId: 3 },
    { id: 6, name: 'Sub C2', categoriaId: 3 },
    { id: 7, name: 'Sub D1', categoriaId: 4 },
    { id: 8, name: 'Sub E1', categoriaId: 5 },
    { id: 9, name: 'Sub F1', categoriaId: 6 },
    { id: 10, name: 'Sub F2', categoriaId: 6 },
  ];

  private productos: Product[] = [
    { 
      id: 1, 
      name: "Camisa Azul", 
      price: 45, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNY4fq6BvtBLJA2IJxVdST3sMzAZiy9kdIw&s", 
      categoryId: 1, 
      categoryName: "prueba1",
      subcategoryId: 101,
      subCategoryName: "Sub A1"
    },
    { 
      id: 2, 
      name: "Laptop Dell", 
      price: 899, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNY4fq6BvtBLJA2IJxVdST3sMzAZiy9kdIw&s", 
      categoryId: 1, 
      categoryName: "prueba1",
      subcategoryId: 101,
      subCategoryName: "Sub A1"
    },
    { 
      id: 3, 
      name: "Sofá Reclinable", 
      price: 399, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNY4fq6BvtBLJA2IJxVdST3sMzAZiy9kdIw&s", 
      categoryId: 1, 
      categoryName: "prueba1",
      subcategoryId: 101,
      subCategoryName: "Sub A1"
    },
    { 
      id: 4, 
      name: "Camiseta Negra", 
      price: 25, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNY4fq6BvtBLJA2IJxVdST3sMzAZiy9kdIw&s", 
      categoryId: 1, 
      categoryName: "prueba1",
      subcategoryId: 101,
      subCategoryName: "Sub A1"
    },
    { id: 5, 
      name: "Smartphone X", 
      price: 699, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNY4fq6BvtBLJA2IJxVdST3sMzAZiy9kdIw&s", 
      categoryId: 1, 
      categoryName: "prueba1",
      subcategoryId: 101,
      subCategoryName: "Sub A1"
    },
    { 
      id: 6, 
      name: "Mesa de Centro", 
      price: 199, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNY4fq6BvtBLJA2IJxVdST3sMzAZiy9kdIw&s", 
      categoryId: 1, 
      categoryName: "prueba1",
      subcategoryId: 101,
      subCategoryName: "Sub A1"
    }
  ];

  constructor(private http : HttpClient) { }

  getCategory(): Observable<Category[]>{
    return this.http.get<Category[]>("https://www.abstractbeezzz.com/back/category.php", { withCredentials: true })
  }
  
  changeStatusCategory(id: number) {
    const body = { id };
    const options = {
      body: body
    };
    return this.http.delete("https://www.abstractbeezzz.com/back/category.php", options);
  }

  createCategory(formData: FormData) : Observable <any> {    
    return this.http.post('https://www.abstractbeezzz.com/back/category.php', formData)
 
  }

  updateCategory(categoryId: number, formData: CategoryPost): Observable<any> {
    return this.http.put(
      `https://www.abstractbeezzz.com/back/category.php?id=${categoryId}`, 
      formData
    );
  }

  //#region Subcategory

  getSubcategoriesByCategory(categoriaId: number): Observable<Subcategory[]> {
    const resultado = this.subcategorias.filter(sc => sc.categoriaId === categoriaId);
    return of(resultado).pipe(delay(500)); // simula llamada asíncrona
  }

  getProducts(): Observable<Product[]> {
    return of(this.productos).pipe(delay(500)); // simula API delay
  }

  getProductsByCategory(categoriaId: number): Observable<Product[]> {
    return of(this.productos.filter(p => p.categoryId === categoriaId)).pipe(delay(500));
  }

  getProductsBySubcategory(subcategoriaId: number): Observable<Product[]> {
    return of(this.productos.filter(p => p.categoryId === subcategoriaId)).pipe(delay(500));
  }

  //#endregion
  
}

  