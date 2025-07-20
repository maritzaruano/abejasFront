import { Component, OnInit } from '@angular/core';
import { ProductShop } from '../../../core/interfaces/product-shop.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  producto!: ProductShop;
  cartCount = 0;
  mainImageUrl = '';

  ngOnInit(): void {
    // Simulación de un producto
    this.producto = {
      id: 1,
      name: 'Auriculares Bluetooth',
      description: 'Auriculares inalámbricos con cancelación de ruido y batería de larga duración.',
      price: 250,
      CategoryName: 'Electrónica',
      image_1_url: 'UploadsImageProducts/image_687d18be52bd26.13752753.JPEG',
      image_2_url: 'UploadsImageProducts/image_687c4abff41ac5.72166441.jpg',
      image_3_url: 'UploadsImageProducts/image_687d18be52bd26.13752753.JPEG',
      weight: "12",
      CategoryId: 1,
      SubcategoryId: 1,
      subCategoryName: "Leds",
      stock: "1",
      color: "blue"
    };

    this.mainImageUrl = 'https://abstractbeezzz.com/back/' + this.producto.image_1_url;
  }

  cambiarImagen(url: string) {
    this.mainImageUrl = 'https://abstractbeezzz.com/back/' + url;
  }

  agregarAlCarrito(producto: ProductShop) {
    // Aquí actualizarías el carrito en localStorage o un servicio temporal
    this.cartCount++;
  }

  irAlCarrito() {
    // navegación a carrito
  }
}