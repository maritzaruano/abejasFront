import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPut } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class GalleryInfoService {

    constructor(private http : HttpClient) { }

    obtenerGalleries(): Observable<any> {
      const url = `https://www.abstractbeezzz.com/back/gallery_info.php`;
      return this.http.get(url, { withCredentials: true });
    }

    // obtenerGalleryPorId(id: number){
    //   const url = `https://www.abstractbeezzz.com/back/blog_by_id.php?id=${id}`;
    //   return this.http.get(url, { withCredentials: true });
    // }
}