import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Product, ProductPost, ProductPut } from '../interfaces/product.interface';




@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    private productUrl = 'https://www.abstractbeezzz.com/back/product.php'; // Cambia la URL según tu backend
    private productAdminUrl = 'https://www.abstractbeezzz.com/back/product_admin.php';
    private variantAdminUrl = 'https://www.abstractbeezzz.com/back/variant_admin.php';

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

    // Método para crear producto
    createProduct(data: FormData): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.productAdminUrl, data);
    }

    getProduct(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.productAdminUrl);
    }

    updateProduct(data: FormData): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.productAdminUrl, data);
    }

    deleteProduct(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.productAdminUrl}?id_product=${id}`);
    }

    getListProduct(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.productUrl}`);
    }

    //Metodo para crear variant

    createVariant(data: FormData): Observable<ApiResponse> {
        debugger;
        return this.http.post<ApiResponse>(this.variantAdminUrl, data);
    }

    updateVariant(data: FormData): Observable<ApiResponse> {
        debugger;
        return this.http.post<ApiResponse>(this.variantAdminUrl, data);
    }
  
}
