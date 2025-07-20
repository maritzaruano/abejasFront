import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/product.interface';
import { ProductShop } from '../../interfaces/product-shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductShopService {

    private productUrl = 'https://www.abstractbeezzz.com/back/product_shop.php'; // Cambia la URL según tu backend


    constructor(private http: HttpClient) {}


    get(order?: string, direction: 'asc' | 'desc' = 'asc'): Observable<ProductShop[]> {
        let params = '';
        if (order) {
            params = `?order=${order}&direction=${direction}`;
        }
        return this.http.get<ProductShop[]>(`${this.productUrl}${params}`);
    }

    getByIdCategory(id: number, order?: string, direction: 'asc' | 'desc' = 'asc'): Observable<ProductShop[]> {
        let params = `?idCategory=${id}`;
        if (order) {
            params += `&order=${order}&direction=${direction}`;
        }
        return this.http.get<ProductShop[]>(`${this.productUrl}${params}`);
    }

    getByIdSubCategory(id: number, order?: string, direction: 'asc' | 'desc' = 'asc'): Observable<ProductShop[]> {
        let params = `?idSubcategory=${id}`;
        if (order) {
            params += `&order=${order}&direction=${direction}`;
        }
        return this.http.get<ProductShop[]>(`${this.productUrl}${params}`);
    }
    
}
