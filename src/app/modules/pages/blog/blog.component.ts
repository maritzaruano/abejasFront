import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

  bannerImage: string = 'assets/img/construccion.png';
  bannerText: string = 'Working on';

  blogs = [
    { title: 'Blog 1', description: 'Descripción 1', date: new Date('2024-12-20'), image: 'assets/img/association_cell.jpg' },
    { title: 'Blog 2', description: 'Descripción 2', date: new Date('2024-12-21'), image: 'assets/img/Imagen2.jpg' },
    { title: 'Blog 3', description: 'Descripción 3', date: new Date('2024-12-22'), image: 'assets/img/Imagen3.jpg' },
    { title: 'Blog 4', description: 'Descripción 4', date: new Date('2024-12-23'), image: 'assets/img/Imagen4.jpg' },
    { title: 'Blog 5', description: 'Descripción 5', date: new Date('2024-12-24'), image: 'assets/img/Imagen5.jpg' },
    { title: 'Blog 6', description: 'Descripción 6', date: new Date('2024-12-25'), image: 'assets/img/Imagen6.jpg' },
    { title: 'Blog 7', description: 'Descripción 7', date: new Date('2024-12-26'), image: 'assets/img/Imagen7.jpg' },
    { title: 'Blog 8', description: 'Descripción 8', date: new Date('2024-12-27'), image: 'assets/img/live_bee.jpg' },
    { title: 'Blog 9', description: 'Descripción 9', date: new Date('2024-12-28'), image: 'assets/img/beekeeper_collage_beekeeper.jpg' },
    { title: 'Blog 10', description: 'Descripción 10', date: new Date('2024-12-29'), image: 'assets/img/association_cell.jpg' },
    { title: 'Blog 11', description: 'Descripción 11', date: new Date('2024-12-30'), image: 'assets/img/bee_removal_comb_collage.jpg' },
    // Puedes agregar más blogs si lo deseas
  ];

  // Variables para la paginación
  currentPage = 1;
  blogsPerPage = 10;
  totalPages: number[] = [];

  constructor() {
    this.calculateTotalPages();
  }

  // Calcula el número total de páginas
  calculateTotalPages() {
    const totalBlogs = this.blogs.length;
    const pages = Math.ceil(totalBlogs / this.blogsPerPage);
    this.totalPages = Array.from({ length: pages }, (_, i) => i + 1);
  }

  // Cambia de página
  changePage(page: number) {
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
  }

  // Devuelve los blogs que se deben mostrar para la página actual
  get blogsToShow() {
    const startIndex = (this.currentPage - 1) * this.blogsPerPage;
    return this.blogs.slice(startIndex, startIndex + this.blogsPerPage);
  }
}
