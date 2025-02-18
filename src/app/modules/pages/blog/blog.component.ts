import { Component, OnInit } from '@angular/core';
import { BlogsInfoService } from '../../../core/services/blogs-info.service';
import { Blog } from '../../../core/interfaces/blog.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {

  bannerImage: string = 'assets/img/construccion.png';
  bannerText: string = 'Working on';

  blogs: any[] = [];

  // Variables para la paginación
  currentPage = 1;
  blogsPerPage = 10;
  totalPages: number[] = [];

  constructor(private blogInfoService: BlogsInfoService) {

  }

  getBlogs() {
    this.blogInfoService.obtenerBlogs(this.currentPage, this.blogsPerPage).subscribe(
      (response: any) => {
        this.blogs = response.data; // Solo los blogs de la página actual
        this.currentPage = response.current_page; // Página actual desde el backend
        this.totalPages = Array.from({ length: response.total_pages }, (_, i) => i + 1); // Total de páginas
      },
      (error) => {
        console.error('Error al cargar blogs:', error);
        this.blogs = [];
      }
    );
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
    this.getBlogs(); // Vuelve a cargar los blogs de la nueva página
  }

  // Devuelve los blogs que se deben mostrar para la página actual
  get blogsToShow() {
    const startIndex = (this.currentPage - 1) * this.blogsPerPage;
    return this.blogs.slice(startIndex, startIndex + this.blogsPerPage);
  }


  ngOnInit(){
    this.getBlogs();
  }
}
