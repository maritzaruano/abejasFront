import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { LoadingService } from '../../../services/shared/loading.service';
import { Category } from '../../../core/interfaces/category';
import { Subcategory } from '../../../core/interfaces/Subcategory.interface';
import { ProductCategory } from '../../../core/interfaces/product.interface';
import { ProductShop } from '../../../core/interfaces/product-shop.interface';
import { ProductShopService } from '../../../core/services/pages/product-shop.service';
import { CartService } from '../../../core/services/pages/cart.service';
import { CartCheckoutService } from '../../../services/shared/cart.checkout.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  productos: ProductShop[] = [];
  productosFiltrados: ProductShop[] = [];
  productosPaginados: ProductShop[] = [];

  categorias: Category[] = [];
  subcategorias: Subcategory[] = [];

  categoriaSeleccionada: number | null = null;
  subcategoriaSeleccionada: number | null = null;

  mostrarOrdenar = false;
  criterioOrden: string = '';

  paginaActual = 1;
  productosPorPagina = 20;
  totalPaginas = 0;
  paginas: number[] = [];

  mostrarFiltro = false;
  mostrarSubcat = false;

  cartCount = 0;
  
  constructor(
    private loadingService: LoadingService,
    private productShopService: ProductShopService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private cartCheckoutService: CartCheckoutService,
    private router: Router
  ) {
    
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  ngOnInit(): void {
    this.loadingService.show();

    this.obtenerCategorias(); // cargar primero

    this.route.queryParams.subscribe(params => {
      const name = params['name'] || null;
      const subName = params['sub'] || null;

      if (!name && !subName) {
        // Sin filtros en la URL, limpiar selección
        this.categoriaSeleccionada = null;
        this.subcategoriaSeleccionada = null;
        this.subcategorias = [];
        this.obtenerProductos();
        return;
      }

      if (name && this.categorias.length) {
        const categoria = this.categorias.find(c => c.name === name);
        this.categoriaSeleccionada = categoria ? categoria.id : null;
      }

      if (this.categoriaSeleccionada) {
        this.categoryService.getSubcategoriesByCategory(this.categoriaSeleccionada).subscribe(subs => {
          this.subcategorias = subs;

          if (subName) {
            const sub = subs.find(s => s.name === subName);
            this.subcategoriaSeleccionada = sub ? sub.id : null;
          }

          this.obtenerProductos();
        });
      } else {
        this.subcategoriaSeleccionada = null;
        this.obtenerProductos();
      }
    });

    this.loadingService.hide();
  }



  get subcategoriaSeleccionadaNombre(): string {
    const sub = this.subcategorias.find(s => s.id === this.subcategoriaSeleccionada);
    return sub ? sub.name : 'Subcategory';
  }

  obtenerProductos() {
    this.paginaActual = 1; // reset página al cambiar filtro
    this.aplicarFiltros();
  }


  obtenerSubcategoriasPorCategoria(idCategoria: number) {
    this.subcategorias = [];
    this.categoryService.getSubcategoriesByCategory(idCategoria).subscribe({
    next: (data) => {
      this.subcategorias = data;
    },
    error: (err) => {
      console.error('Error al obtener subcategorías:', err);
      alert('Hubo un error al cargar las subcategorías. Intenta nuevamente.');
    },
    complete: () => {
      console.log('Petición completada');
    }
  });
  }

  obtenerCategorias() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categorias = data;
    });
  }

  aplicarFiltros() {
    const orderParam =
      this.criterioOrden === 'precio'
        ? 'price'
        : this.criterioOrden === 'nombre'
        ? 'name'
        : undefined;

    if (this.subcategoriaSeleccionada) {
      this.productShopService
        .getByIdSubCategory(
          this.subcategoriaSeleccionada,
          this.paginaActual,
          this.productosPorPagina,
          orderParam
        )
        .subscribe({
          next: (response) => {
            this.productosFiltrados = response.items;
            this.totalPaginas = response.totalPages;
            this.paginas = Array.from(
              { length: this.totalPaginas },
              (_, i) => i + 1
            );
            this.productosPaginados = this.productosFiltrados;
          },
          error: (err) => {
            console.error('Error obteniendo productos por subcategoría:', err);
          },
        });
    } else if (this.categoriaSeleccionada) {
      this.productShopService
        .getByIdCategory(
          this.categoriaSeleccionada,
          this.paginaActual,
          this.productosPorPagina,
          orderParam
        )
        .subscribe({
          next: (response) => {
            this.productosFiltrados = response.items;
            this.totalPaginas = response.totalPages;
            this.paginas = Array.from(
              { length: this.totalPaginas },
              (_, i) => i + 1
            );
            this.productosPaginados = this.productosFiltrados;
          },
          error: (err) => {
            console.error('Error obteniendo productos por categoría:', err);
          },
        });
    } else {
      this.productShopService
        .get(this.paginaActual, this.productosPorPagina, orderParam)
        .subscribe({
          next: (response) => {
            this.productosFiltrados = response.items;
            this.totalPaginas = response.totalPages;
            this.paginas = Array.from(
              { length: this.totalPaginas },
              (_, i) => i + 1
            );
            this.productosPaginados = this.productosFiltrados;
          },
          error: (err) => {
            console.error('Error obteniendo todos los productos:', err);
          },
        });
    }
  }





  configurarPaginacion() {
    const fuente = this.productosFiltrados; // usar siempre los filtrados
    this.totalPaginas = Math.ceil(fuente.length / this.productosPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    this.actualizarListado();
  }

  actualizarListado() {
    const fuente = this.productosFiltrados; // usar siempre los filtrados
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    this.productosPaginados = fuente.slice(inicio, fin);
  }

  cambiarPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaActual = pagina;
    this.actualizarListado();
  }

  seleccionarCategoria(idCategoria: number, name: string) {
    this.categoriaSeleccionada = idCategoria;
    this.subcategoriaSeleccionada = null;

    // Actualiza la URL; queryParams.subscribe disparará obtenerProductos()
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { name, sub: null },
      queryParamsHandling: 'merge'
    });

    this.obtenerSubcategoriasPorCategoria(idCategoria);
  }


  seleccionarSubcategoria(idSubcategoria: number) {
    this.subcategoriaSeleccionada = idSubcategoria;

    const subcategoria = this.subcategorias.find(s => s.id === idSubcategoria);
    const subName = subcategoria?.name || null;

    // Actualiza la URL; queryParams.subscribe disparará obtenerProductos()
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sub: subName },
      queryParamsHandling: 'merge'
    });

    this.mostrarSubcat = false;
  }

  toggleFiltroDropdown() {
    this.mostrarFiltro = !this.mostrarFiltro;
    this.mostrarSubcat = false;
  }

  toggleSubcatDropdown() {
    this.mostrarSubcat = !this.mostrarSubcat;
    this.mostrarFiltro = false;
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  ordenarPor(criterio: string) {
    this.criterioOrden = criterio;
    this.mostrarOrdenar = false;
    this.aplicarFiltros(); // volver a cargar la lista ordenada
  }

  irAStore() {
    this.router.navigate(['/store'], { queryParams: {} });
  }

  //Carro de compra
  irAlCarrito() {
    this.router.navigate(['/cart']);
  }

  verDetalleProducto(producto: ProductShop) {
    this.router.navigate(['/product-detail', producto.id_product]);
  }

  showCart(){
    this.cartCheckoutService.show();
  }

  descargarCatalogo() {
    const link = document.createElement('a');
    link.href = 'https://www.abstractbeezzz.com/back/pdf/catalogo.pdf';
    link.target = '_blank'; 
    link.download = 'Catalog2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
