import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, CategoryPost } from '../interfaces/category';
import { Subcategory, SubCategoryPost, SubCategoryPut } from '../interfaces/Subcategory.interface';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http : HttpClient) { }


  createSubCategory(formData: SubCategoryPost) : Observable <any> {    
    return this.http.post('https://www.abstractbeezzz.com/back/subcategories.php', formData)
  }

  updateSubCategory( formData: SubCategoryPut): Observable<any> {
    return this.http.put(
      `https://www.abstractbeezzz.com/back/subcategories.php`, 
      formData
    );
  }

  changeStatusCategory(id: number) {
    const body = { id };
    const options = {
      body: body
    };
    return this.http.delete("https://www.abstractbeezzz.com/back/subcategories.php", options);
  }

  getSubCategories(){
    return this.http.get("https://www.abstractbeezzz.com/back/subcategories.php", { withCredentials: true })
  }
  
}
