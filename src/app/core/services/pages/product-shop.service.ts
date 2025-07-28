import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductShop } from '../../interfaces/product-shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductShopService {

  private productUrl = 'https://www.abstractbeezzz.com/back/product_shop.php'; 

  constructor(private http: HttpClient) {}

  get(page: number, limit: number, order?: string, direction: 'asc' | 'desc' = 'asc'): Observable<any> {
    let params = `?page=${page}&limit=${limit}`;
    if (order) {
      params += `&order=${order}&direction=${direction}`;
    }
    return this.http.get<any>(`${this.productUrl}${params}`);
  }

  getByIdCategory(
    id: number,
    page: number,
    limit: number,
    order?: string,
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<any> {
    let params = `?idCategory=${id}&page=${page}&limit=${limit}`;
    if (order) {
      params += `&order=${order}&direction=${direction}`;
    }
    return this.http.get<any>(`${this.productUrl}${params}`);
  }

  getByIdSubCategory(
    id: number,
    page: number,
    limit: number,
    order?: string,
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<any> {
    let params = `?idSubcategory=${id}&page=${page}&limit=${limit}`;
    if (order) {
      params += `&order=${order}&direction=${direction}`;
    }
    return this.http.get<any>(`${this.productUrl}${params}`);
  }

  getById(id: number): Observable<ProductShop> {
    return this.http.get<ProductShop>(`${this.productUrl}?id=${id}`);
  }
}
