import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { LoadingService } from '../../../services/shared/loading.service';
import { Category } from '../../../core/interfaces/category';
import { Subcategory } from '../../../core/interfaces/Subcategory.interface';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
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

    this.route.queryParams.subscribe(params => {
      this.categoriaSeleccionada = params['name'] || null;
      this.subcategoriaSeleccionada = null;

      // this.obtenerProductos();
      this.obtenerCategorias();
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

  obtenerSubcategoriasPorCategoria(idCategoria : number){
    this.categoryService.getSubcategoriesByCategory(idCategoria).subscribe(data => {
      this.subcategorias = data;
      console.log(this.subcategorias)
    })
  }
  
  obtenerCategorias() {
    this.categoryService.getCategory().subscribe((data : Category[]) => {
      this.categorias = data;
    });
  }

  aplicarFiltros() {
    let resultado = [...this.productos];

    if (this.categoriaSeleccionada) {
      resultado = resultado.filter(p => p.categoria === this.categoriaSeleccionada);
    }

    if (this.subcategoriaSeleccionada) {
      resultado = resultado.filter(p => p.subcategoria === this.subcategoriaSeleccionada);
    }

    this.productosFiltrados = resultado;

    // Obtener subcategorías disponibles en base al resultado actual
    // const subcategoriasSet = new Set(this.productosFiltrados.map(p => p.subcategoria).filter(Boolean));
    // this.subcategorias = Array.from(subcategoriasSet);
    // this.mostrarSubcat = this.subcategorias.length > 0;

    this.paginaActual = 1;
    this.configurarPaginacion();
  }

  configurarPaginacion() {
    const fuente = this.productosFiltrados.length ? this.productosFiltrados : this.productos;
    this.totalPaginas = Math.ceil(fuente.length / this.productosPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    this.actualizarListado();
  }

  actualizarListado() {
    const fuente = this.productosFiltrados.length ? this.productosFiltrados : this.productos;
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    this.productosPaginados = fuente.slice(inicio, fin);
  }

  cambiarPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaActual = pagina;
    this.actualizarListado();
  }

  seleccionarCategoria(idCategoria: number , name: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { name },
      queryParamsHandling: 'merge'
    });

    this.obtenerSubcategoriasPorCategoria(idCategoria);
    this.categoriaSeleccionada = idCategoria;
    this.subcategoriaSeleccionada = null;
    this.aplicarFiltros();
  }

  seleccionarSubcategoria(sub: number) {
    this.subcategoriaSeleccionada = sub;
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
}
