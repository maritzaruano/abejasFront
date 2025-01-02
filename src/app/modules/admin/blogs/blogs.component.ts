import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../../core/services/blogs.service';
import { Blog } from '../../../core/interfaces/blog.interface';
import { title } from 'process';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent implements OnInit {

  action = '';

  isModalOpen = false;
  task = { title: '', description: '' };

  blogs: Blog[] = [];

  formData: FormData = new FormData();

  blogForm : FormGroup;

  imageUrl: string | ArrayBuffer | null = null;

  constructor(private blogsService : BlogsService ,
    private formBuilder: FormBuilder
  ){
    this.blogForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      image: [null, Validators.required],
    });

  }

  ngOnInit(): void {
    this.obtenerBlogs();
  }

  obtenerBlogs(){
    this.blogsService.obtenerBlogs().subscribe((data: any) => {
      this.blogs = data;
    })
  }

  changeStatus(id: number){
    if(confirm("Esta seguro que desea eliminar este blog")){
      this.blogsService.changeStatusBlogs(id).subscribe((data: any) => {
        console.log(data)
        this.obtenerBlogs();
      })
    }
  }
  
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.blogForm.patchValue({
        image: file,
      });
      this.formData.append('image', file, file.name);

      // Optional: Previsualizar la imagen seleccionada
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result!;
      };
      reader.readAsDataURL(file);
    }
  }

  add(){
    this.action = 'New';
    this.blogForm.reset();
    this.openModal();
  }

  edit( item: Blog){
    this.action = 'Edit';

    this.blogForm.controls["title"].setValue(item.title);
    this.blogForm.controls["description"].setValue(item.description);

    this.openModal();
  }

  // Abre el modal
  openModal() {
    this.isModalOpen = true;
  }

  // Cierra el modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Maneja el envío del formulario
  onSubmit() {

    if (this.blogForm.invalid) {
      return;
    }

    const formValues = this.blogForm.value;
    this.formData.append('title', formValues.title);
    this.formData.append('description', formValues.description);

    // Aquí hacemos la solicitud HTTP para crear el post
    this.blogsService.createPost(this.formData).subscribe(
      (response) => {
        console.log('Post created successfully:', response);
        // Puedes hacer algo con la respuesta, como mostrar un mensaje de éxito
        this.obtenerBlogs();
      },
      (error) => {
        console.error('Error creating post:', error);
        // Puedes manejar errores, como mostrar un mensaje de error
      }
    );

    this.closeModal(); // Cierra el modal después de enviar el formulario

  }


}
