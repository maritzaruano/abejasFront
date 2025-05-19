import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryPost } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http : HttpClient) { }

  getCategory(){
    return this.http.get("https://www.abstractbeezzz.com/back/category.php", { withCredentials: true })
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

  
}

  