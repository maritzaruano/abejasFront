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

  private productos: ProductCategory[] = [
    {
      id: 1,
      name: 'Camisa Azul',
      price: 45,
      image: 'https://ichef.bbci.co.uk/ace/ws/624/amz/worldservice/live/assets/images/2014/08/27/140827134553_bee_galeria_2_624x351_getty.jpg.webp',
      categoryId: 1,
      categoryName: 'prueba1',
      id_subcategory: 101,
      subCategoryName: 'Sub A1',
      description:'',
    },
    {
      id: 2,
      name: 'Camisa Roja',
      price: 50,
      image: 'https://ichef.bbci.co.uk/ace/ws/624/amz/worldservice/live/assets/images/2014/08/27/140827134553_bee_galeria_2_624x351_getty.jpg.webp',
      categoryId: 2,
      categoryName: 'prueba2',
      id_subcategory: 201,
      subCategoryName: 'Sub B1',
      description:''
    },
    {
      id: 3,
      name: 'Camisa Verde',
      price: 80,
      image: 'https://ichef.bbci.co.uk/ace/ws/624/amz/worldservice/live/assets/images/2014/08/27/140827134553_bee_galeria_2_624x351_getty.jpg.webp',
      categoryId: 2,
      categoryName: 'prueba2',
      id_subcategory: 201,
      subCategoryName: 'Sub B1',
      description:'',
    },
    {
      id: 4,
      name: 'Camisa Olivo',
      price: 80,
      image: 'https://ichef.bbci.co.uk/ace/ws/624/amz/worldservice/live/assets/images/2014/08/27/140827134553_bee_galeria_2_624x351_getty.jpg.webp',
      categoryId: 1,
      categoryName: 'prueba2',
      id_subcategory: 102,
      subCategoryName: 'Sub B1',
      description:'test'
    }
  ];

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('https://www.abstractbeezzz.com/back/category.php');
  }

  getSubcategoriesByCategory(categoriaId: number): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>('https://www.abstractbeezzz.com/back/subcategory.php?'+categoriaId);
  }

  getProducts(): Observable<ProductCategory[]> {
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
