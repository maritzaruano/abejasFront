import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  currentPage = 1;
  blogsPerPage = 10;
  totalPages: number[] = [];
  
  blogs = [];

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
