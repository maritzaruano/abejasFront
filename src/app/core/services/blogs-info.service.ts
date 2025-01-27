import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPut } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogsInfoService {

    constructor(private http : HttpClient) { }

    obtenerBlogs(page: number, limit: number): Observable<any> {
      const url = `https://www.abstractbeezzz.com/back/blog_info.php?page=${page}&limit=${limit}`;
      return this.http.get(url, { withCredentials: true });
    }

    obtenerBlogPorId(id: number){
      const url = `https://www.abstractbeezzz.com/back/blog_by_id.php?id=${id}`;
      return this.http.get(url, { withCredentials: true });
    }
}