import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductShop } from '../../interfaces/product-shop.interface';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart_items';
  private items: ProductShop[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  constructor() {
    const stored = localStorage.getItem(this.cartKey);
    if (stored) {
      this.items = JSON.parse(stored);
      this.cartCount.next(this.items.length);
    }
  }

  getItems(): ProductShop[] {
    return this.items;
  }

  addToCart(product: ProductShop) {
    this.items.push(product);
    this.updateStorage();
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(p => p.id !== productId);
    this.updateStorage();
  }

  clearCart() {
    this.items = [];
    this.updateStorage();
  }

  private updateStorage() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    this.cartCount.next(this.items.length);
  }
}
