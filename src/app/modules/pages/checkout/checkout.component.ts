import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/pages/cart.service';
import { ProductShop } from '../../../core/interfaces/product-shop.interface';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: ProductShop[] = [];
  subtotal = 0;
  shipping = 10000; // costo fijo de envío
  total = 0;

  customer = {
    name: '',
    address: '',
    email: ''
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.calcularTotales();
  }

  calcularTotales() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    this.total = this.subtotal + this.shipping;
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getItems();
    this.calcularTotales();
  }

  finalizarCompra() {
    if (this.customer.name && this.customer.address && this.customer.email) {
      alert('¡Compra confirmada!');
      this.cartService.clearCart();
      this.cartItems = [];
      this.calcularTotales();
    }
  }

  volverATienda() {
    window.location.href = '/'; // Ajusta según tu routing
  }
}
