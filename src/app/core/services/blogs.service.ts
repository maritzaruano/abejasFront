import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http : HttpClient) { }

  obtenerBlogs(){
    return this.http.get("https://www.abstractbeezzz.com/back/blog.php", { withCredentials: true })
  }

  
  changeStatusBlogs(id: number) {
    const body = { id };
    const options = {
      body: body,
      withCredentials: true
    };
    return this.http.delete("https://www.abstractbeezzz.com/back/blog.php", options);
  }

  createPost(formData: FormData): Observable<any> {
    const options = {
      withCredentials: true
    };
    return this.http.post('https://www.abstractbeezzz.com/back/blog.php', formData , options);
  }
}
