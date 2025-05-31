import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ApiResponse, ProductRequest, ProductUpdate } from '../interfaces/products.interface';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    private productUrl = 'https://www.abstractbeezzz.com/back/products.php'; // Cambia la URL según tu backend


    constructor(private http: HttpClient) {}

    // Método para crear producto
    create(data: ProductRequest): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.productUrl, data);
    }

    update(data: ProductUpdate): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(this.productUrl, data);
    }

    get(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.productUrl);
    }

    getById(id: number): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.productUrl}/${id}`);
    }

    delete(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.productUrl}/${id}`);
    }
  
}
