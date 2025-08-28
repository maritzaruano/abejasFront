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
      this.cartCount.next(this.getTotalQuantity());
    }
  }

  getItems(): ProductShop[] {
    return this.items;
  }

  addToCart(product: ProductShop) {
    const existing = this.items.find(p => p.id === product.id);

    if (existing) {
      // Si ya existe, solo incrementamos la cantidad
      existing.quantity = (existing.quantity || 1) + (product.quantity || 1);
    } else {
      // Si no existe, lo agregamos con cantidad = 1 (o la que venga)
      this.items.push({ ...product, quantity: product.quantity || 1 });
    }

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
    this.cartCount.next(this.getTotalQuantity());
  }

  private getTotalQuantity(): number {
    return this.items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }
}
