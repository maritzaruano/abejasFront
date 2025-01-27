import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../../core/interfaces/blog.interface';
import { BlogsInfoService } from '../../../core/services/blogs-info.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
  selectedBlog!: Blog;


  constructor(private route: ActivatedRoute, 
    private router: Router,
    private blogInfoService: BlogsInfoService
  ) {}

  ngOnInit() {
    const blogId = Number(this.route.snapshot.paramMap.get('id'));
    // this.selectedBlog = this.blogs.find((blog) => blog.id === blogId)!;

    this.blogInfoService.obtenerBlogPorId(blogId).subscribe((data: any ) =>{
      this.selectedBlog = data.data;
    } )

    // if (!this.selectedBlog) {
    //   // Manejar el caso de un blog no encontrado
    //   this.router.navigate(['/blogs']);
    // }
  }

  goBack() {
    this.router.navigate(['/blogs']);
  }
}