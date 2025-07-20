import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, CategoryPost } from '../interfaces/category';
import { Subcategory } from '../interfaces/Subcategory.interface';
import { Product, ProductCategory } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }


  private subcategorias: Subcategory[] = [
    { id: 101, name: 'Sub A1', id_category: 1 , description: '' },
    { id: 102, name: 'Sub A2', id_category: 1  , description: ''},
    { id: 201, name: 'Sub B1', id_category: 2  , description: ''},
    { id: 301, name: 'Sub C1', id_category: 3 , description: '' }
  ];


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('https://www.abstractbeezzz.com/back/category.php');
  }

  getSubcategoriesByCategory(categoriaId: number): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>('https://www.abstractbeezzz.com/back/subcategories.php?id='+categoriaId);
  }

  getProducts(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>('https://www.abstractbeezzz.com/back/product.php');
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

  changeStatusCategory(id: number) {
    const body = { id };
    const options = {
      body: body
    };
    return this.http.delete("https://www.abstractbeezzz.com/back/category.php", options);
  }

  getCategory(){
    return this.http.get("https://www.abstractbeezzz.com/back/category.php", { withCredentials: true })
  }
  
}
