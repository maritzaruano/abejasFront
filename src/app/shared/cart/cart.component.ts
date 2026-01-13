import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartCheckoutService } from '../../services/shared/cart.checkout.service';
import { Router } from '@angular/router';
import { ProductShop } from '../../core/interfaces/product-shop.interface';
import { CartService } from '../../core/services/pages/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'] // 👈 también era styleUrls (plural)
})
export class CartComponent {
  isOpen = false;
  private subscription: Subscription | undefined;

  cartItems: ProductShop[] = [];
  subtotal = 0;
  shipping = 0; // costo fijo de envío
  total = 0;

  constructor(
    private cartService: CartService,
    private cartCheckoutService: CartCheckoutService,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    
    this.subscription = this.cartCheckoutService.visibility$.subscribe(
      visible => this.isOpen = visible
    );

    this.cartItems = this.cartService.getItems();
    this.calcularTotales();
  }
  // #region status modal
  close(): void {
    this.cartCheckoutService.hide();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  irAlCheckout(): void {
    this.cartCheckoutService.hide();
    this.router.navigate(['/checkout']);
  }
  //#endregion

  removeFromCart(productId: number) {
    debugger;
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getItems();
    this.calcularTotales()
  }

calcularTotales() {
  this.subtotal = this.cartItems.reduce(
    (sum, item) => sum + item.variants[0].price * (item.variants[0].quantity || 1), 
    0
  );
  this.total = this.subtotal + this.shipping;
}
}
