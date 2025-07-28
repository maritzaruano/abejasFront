import { Component, OnInit } from '@angular/core';
import { ProductShop } from '../../../core/interfaces/product-shop.interface';
import { ProductShopService } from '../../../core/services/pages/product-shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../core/services/pages/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  producto!: ProductShop;
  cartCount = 0;
  mainImageUrl = '';
  id!: number;

  quantity = 1; // cantidad seleccionada por defecto

  constructor(
    private productShopService: ProductShopService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      console.error('ID de producto no válido');
      this.router.navigate(['/store']);
      return;
    }

    // Suscribirse al contador del carrito
    this.cartService.cartCount$.subscribe(count => this.cartCount = count);

    this.getProducto(this.id);
  }

  getProducto(id: number) {
    this.productShopService.getById(id).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.mainImageUrl = 'https://abstractbeezzz.com/back/' + this.producto.image_1_url;
      },
      error: (err) => {
        console.error('Error obteniendo producto:', err);
        this.router.navigate(['/store']);
      }
    });
  }

  cambiarImagen(url: string) {
    this.mainImageUrl = 'https://abstractbeezzz.com/back/' + url;
  }

  agregarAlCarrito(producto: ProductShop) {
    if (this.quantity < 1) {
      this.quantity = 1; // validación mínima
    }

    const productToAdd = { ...producto, quantity: this.quantity };
    this.cartService.addToCart(productToAdd);
  }

  irAlCarrito() {
    this.router.navigate(['/checkout']); // redirige a la página del carrito/checkout
  }
}
