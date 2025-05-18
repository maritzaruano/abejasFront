import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '../../../services/shared/loading.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
  
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  menuOptions = [
    'Honey', 'Candles', 'Beexwax'
  ];


  filtros = [
    { nombre: 'Price', checked: false },
    { nombre: 'Size', checked: false },
    { nombre: 'Weight', checked: false },
  ];

  subcategorias = ['Subcat A', 'Subcat B', 'Subcat C'];
  subcategoriaSeleccionada: string | null = null;

  mostrarFiltro = false;
  mostrarSubcat = false;

  productos = Array.from({ length: 105 }, (_, i) => ({
    nombre: `Producto ${i + 1}`,
    precio: Math.floor(Math.random() * 100) + 10,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNY4fq6BvtBLJA2IJxVdST3sMzAZiy9kdIw&s',
    categoria: ['Ropa', 'Tecnología', 'Hogar'][i % 3]
  }));

  paginaActual = 1;
  productosPorPagina = 20;
  productosPaginados : any = [] ;
  paginas: number[] = [];
  totalPaginas = 0;


  constructor(private loadingService: LoadingService){

  }
  ngOnInit(): void {
    this.loadingService.show();
    this.configurarPaginacion();
    this.loadingService.hide();
  }

  toggleFiltroDropdown() {
    this.mostrarFiltro = !this.mostrarFiltro;
    this.mostrarSubcat = false;
  }

  toggleSubcatDropdown() {
    this.mostrarSubcat = !this.mostrarSubcat;
    this.mostrarFiltro = false;
  }

  seleccionarSubcategoria(sub: string) {
    this.subcategoriaSeleccionada = sub;
    this.mostrarSubcat = false;
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  configurarPaginacion() {
    this.totalPaginas = Math.ceil(this.productos.length / this.productosPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    this.actualizarListado();
  }

  cambiarPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaActual = pagina;
    this.actualizarListado();
  }

  actualizarListado() {
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    this.productosPaginados = this.productos.slice(inicio, fin);
  }

}
