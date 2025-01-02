import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../../core/interfaces/blog.interface';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
  selectedBlog!: Blog;

  blogs: Blog[] = [
    {
      id: 1,
      title: 'Blog Principal',
      image: 'assets/img/live_bee.jpg',
      created_at: new Date('2024-12-20'),
      description: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet eros sed nunc varius, non volutpat sapien bibendum.</p>
      <p>Nulla facilisi. Proin laoreet, arcu ac sollicitudin efficitur, felis tortor posuere nisi, a venenatis justo lorem eget odio.</p>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>`
    },
    {
      id: 2,
      title: 'Blog Secundario',
      image: 'ruta-imagen-secundaria.jpg',
      created_at: new Date('2024-12-21'),
      description: 'Contenido completo del blog secundario. Incluye detalles interesantes sobre el tema.'
    }
    // Agrega más blogs aquí
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedBlog = this.blogs.find((blog) => blog.id === blogId)!;

    if (!this.selectedBlog) {
      // Manejar el caso de un blog no encontrado
      this.router.navigate(['/blogs']);
    }
  }

  goBack() {
    this.router.navigate(['/blogs']);
  }
}