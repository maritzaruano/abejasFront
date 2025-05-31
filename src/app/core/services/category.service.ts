import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, CategoryPost } from '../interfaces/category';
import { Subcategory } from '../interfaces/Subcategory.interface';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  private categorias: Category[] = [
    { id: 1, name: 'prueba1', description : '' },
    { id: 2, name: 'prueba2', description : '' },
    { id: 3, name: 'prueba3', description : '' }
  ];

  private subcategorias: Subcategory[] = [
    { id: 101, name: 'Sub A1', id_category: 1 , description: '' },
    { id: 102, name: 'Sub A2', id_category: 1  , description: ''},
    { id: 201, name: 'Sub B1', id_category: 2  , description: ''},
    { id: 301, name: 'Sub C1', id_category: 3 , description: '' }
  ];

  private productos: Product[] = [
    {
      id: 1,
      name: 'Camisa Azul',
      price: 45,
      image: 'https://ichef.bbci.co.uk/ace/ws/624/amz/worldservice/live/assets/images/2014/08/27/140827134553_bee_galeria_2_624x351_getty.jpg.webp',
      categoryId: 1,
      categoryName: 'prueba1',
      subcategoryId: 101,
      subCategoryName: 'Sub A1'
    },
    {
      id: 2,
      name: 'Camisa Roja',
      price: 50,
      image: 'https://ichef.bbci.co.uk/ace/ws/624/amz/worldservice/live/assets/images/2014/08/27/140827134553_bee_galeria_2_624x351_getty.jpg.webp',
      categoryId: 2,
      categoryName: 'prueba2',
      subcategoryId: 201,
      subCategoryName: 'Sub B1'
    },
    {
      id: 3,
      name: 'Camisa Verde',
      price: 80,
      image: 'https://ichef.bbci.co.uk/ace/ws/624/amz/worldservice/live/assets/images/2014/08/27/140827134553_bee_galeria_2_624x351_getty.jpg.webp',
      categoryId: 2,
      categoryName: 'prueba2',
      subcategoryId: 201,
      subCategoryName: 'Sub B1'
    },
    {
      id: 4,
      name: 'Camisa Olivo',
      price: 80,
      image: 'https://ichef.bbci.co.uk/ace/ws/624/amz/worldservice/live/assets/images/2014/08/27/140827134553_bee_galeria_2_624x351_getty.jpg.webp',
      categoryId: 1,
      categoryName: 'prueba2',
      subcategoryId: 102,
      subCategoryName: 'Sub B1'
    }
  ];

  getCategories(): Observable<Category[]> {
    return of(this.categorias);
  }

  getSubcategoriesByCategory(categoriaId: number): Observable<Subcategory[]> {
    const filtradas = this.subcategorias.filter(s => s.id_category === categoriaId);
    return of(filtradas);
  }

  getProducts(): Observable<Product[]> {
    return of(this.productos);
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
