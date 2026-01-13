import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ProductShop } from '../../interfaces/product-shop.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart_items';
  private items: ProductShop[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  private isBrowser: boolean;

  cartCount$ = this.cartCount.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const stored = localStorage.getItem(this.cartKey);
      if (stored) {
        this.items = JSON.parse(stored);
        // this.cartCount.next(this.getTotalQuantity());
      }
    }
  }

  getItems(): ProductShop[] {
    return this.items;
  }

  addToCart(product: ProductShop) {
    const existing = this.items.find(p => p.id === product.id);

    if (existing) {
      existing.variants[0].quantity = (existing.variants[0].quantity || 1) + (product.variants[0].quantity || 1);
    } else {
      this.items.push({ ...product, variants: product.variants || 1 });
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
    if (this.isBrowser) {
      localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    }
    // this.cartCount.next(this.getTotalQuantity());
  }

  private getTotalQuantity(): number {
    return this.items.reduce((acc, item) => acc + (item.variants[0].quantity || 1), 0);
  }
}
