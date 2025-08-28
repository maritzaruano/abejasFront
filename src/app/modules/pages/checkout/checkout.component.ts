import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/pages/cart.service';
import { ProductShop } from '../../../core/interfaces/product-shop.interface';

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

  pagoExitoso: boolean | null = null; // para paso 4

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.calcularTotales();

    // Detectar si Stripe redirigió a success o cancel
    const params = new URLSearchParams(window.location.search);
    if (params.get('success')) {
      this.step = 4;
      this.pagoExitoso = true;
      this.cartService.clearCart();
    }
    if (params.get('canceled')) {
      this.step = 4;
      this.pagoExitoso = false;
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

  pagarConStripe() {
    fetch('http://localhost:3000/create-checkout-session', { // 👈 tu backend
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: this.cartItems,
        customer: this.customer
      })
    })
    .then(res => res.json())
    .then(data => {
      window.location.href = data.url; // Redirige a Stripe Checkout
    })
    .catch(err => console.error('Error al crear sesión de Stripe', err));
  }

  volverATienda() {
    window.location.href = '/';
  }

  finalizarCompra() { if (this.customer.name && this.customer.address && this.customer.email) { alert('¡Compra confirmada!'); this.cartService.clearCart(); this.cartItems = []; this.calcularTotales(); } }
}
