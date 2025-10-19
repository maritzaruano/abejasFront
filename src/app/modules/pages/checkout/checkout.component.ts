import { Component, Inject, OnInit ,PLATFORM_ID , inject } from '@angular/core';
import { CartService } from '../../../core/services/pages/cart.service';
import { ProductShop } from '../../../core/interfaces/product-shop.interface';
import { isPlatformBrowser } from '@angular/common';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  step = 1; // 👈 controla en qué paso estamos (1=Carrito, 2=Datos, 3=Stripe, 4=Confirmación)

  cartItems: ProductShop[] = [];
  subtotal = 0;
  shipping = 0; // costo fijo de envío
  total = 0;

  customer = {
    name: '',
    address: '',
    email: ''
  };

  isBrowser: boolean;

  pagoExitoso: boolean | null = null; // para paso 4

  constructor(
      private cartService: CartService,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.calcularTotales();

    if (this.isBrowser) {
      const params = new URLSearchParams(window.location.search);

      if (params.get('success')) {
        this.step = 4;
        this.pagoExitoso = true;
        this.cartService.clearCart(); // vaciar carrito tras pago
      }

      if (params.get('canceled')) {
        this.step = 4;
        this.pagoExitoso = false;
      }
    }
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

  continuarADatos() {
    if (this.cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    this.step = 2;
  }

  guardarDatos() {
    if (this.customer.name && this.customer.address && this.customer.email) {
      this.step = 3;
    } else {
      alert('Por favor completa todos los datos');
    }
  }

  async pagarConStripe() {
    const stripe = await loadStripe('pk_test_51S1cZv2SiqeO0gXPheCdBxnwYpOcCl9pMKU0IUsXLzqIAUWJm4xRlgegNho5GHOVIOlbYUuEVCZYCM3KRxSQCyW6007vPsPMuF'); // clave pública

    const response = await fetch('https://www.abstractbeezzz.com/back/create-checkout-session.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          { name: 'Honey Jar', price: 2000, quantity: 1 },
          { name: 'Bee Pollen', price: 1500, quantity: 2 }
        ]
      })
    });

    const session = await response.json();

    await stripe?.redirectToCheckout({ sessionId: session.id });
  }

  volverATienda() {
    window.location.href = '/';
  }

  finalizarCompra() { if (this.customer.name && this.customer.address && this.customer.email) { alert('¡Compra confirmada!'); this.cartService.clearCart(); this.cartItems = []; this.calcularTotales(); } }
}

