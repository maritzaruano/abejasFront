import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { LoadingService } from '../../../services/shared/loading.service';
import { Category } from '../../../core/interfaces/category';
import { Subcategory } from '../../../core/interfaces/Subcategory.interface';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  productos: any[] = [];
  productosFiltrados: any[] = [];
  productosPaginados: any[] = [];

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

  constructor(
    private loadingService: LoadingService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    this.categoryService.getProducts().subscribe(data => {
      this.productos = data;
      this.aplicarFiltros();
    });
  }

  obtenerSubcategoriasPorCategoria(idCategoria: number) {
    this.subcategorias = [];
    this.categoryService.getSubcategoriesByCategory(idCategoria).subscribe(data => {
      this.subcategorias = data;
    });
  }

  obtenerCategorias() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categorias = data;
    });
  }

  aplicarFiltros() {
    let resultado = [...this.productos];

    if (this.subcategoriaSeleccionada) {
      resultado = resultado.filter(p => p.subcategoryId === this.subcategoriaSeleccionada);
    } else if (this.categoriaSeleccionada) {
      resultado = resultado.filter(p => p.categoryId === this.categoriaSeleccionada);
    }

    this.productosFiltrados = resultado;
    this.paginaActual = 1;
    this.configurarPaginacion();
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
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { name, sub: null }, // limpia sub
      queryParamsHandling: 'merge'
    });

    this.categoriaSeleccionada = idCategoria;
    this.subcategoriaSeleccionada = null;
    this.obtenerSubcategoriasPorCategoria(idCategoria);
    this.aplicarFiltros();
  }


 seleccionarSubcategoria(idSubcategoria: number) {
  this.subcategoriaSeleccionada = idSubcategoria;

  // Buscar nombre de la subcategoría para mantener consistencia
  const subcategoria = this.subcategorias.find(s => s.id === idSubcategoria);
  const subName = subcategoria?.name || null;

  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { sub: subName },
    queryParamsHandling: 'merge'
  });

  this.aplicarFiltros();
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
  this.mostrarOrdenar = false; // Oculta el menú después de seleccionar
}
}
