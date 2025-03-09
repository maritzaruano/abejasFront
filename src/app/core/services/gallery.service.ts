import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPut } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  [x: string]: any;

  constructor(private http : HttpClient) { }

  obtenerGalleries(){
    return this.http.get("https://www.abstractbeezzz.com/back/gallery.php", { withCredentials: true })
  }
  
  changeStatusGalleries(id: number) {
    const body = { id };

    const options = {
      body: body,
      withCredentials: true
    };

    return this.http.delete("https://www.abstractbeezzz.com/back/gallery.php", options);
  }

  createPost(formData: FormData): Observable<any> {
    const options = {
      withCredentials: true
    };
    return this.http.post('https://www.abstractbeezzz.com/back/gallery.php', formData , options);
  }

  editPut(formData: BlogPut): Observable<any> {
    const options = {
      withCredentials: true
    };
    return this.http.put('https://www.abstractbeezzz.com/back/gallery.php', formData , options);
  }


  editImg(userId: number, formData: FormData): Observable<any> {
    const options = {
      withCredentials: true
    };
    return this.http.post(`https://www.abstractbeezzz.com/back/gallery_img.php?id=${userId}`, formData , options);
  }
}
