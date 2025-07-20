import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Product, ProductPost, ProductPut } from '../interfaces/product.interface';




@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    private productUrl = 'https://www.abstractbeezzz.com/back/product.php'; // Cambia la URL según tu backend


    constructor(private http: HttpClient) {}

    // Método para crear producto
    create(data: FormData): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.productUrl, data);
    }

    update(data: FormData): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.productUrl, data);
    }

    get(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.productUrl);
    }

    getById(id: number): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.productUrl}/${id}`);
    }

    delete(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.productUrl}?id=${id}`);
    }
  
}
