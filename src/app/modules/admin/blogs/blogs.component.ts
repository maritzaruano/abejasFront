import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlogsService } from '../../../core/services/blogs.service';
import { Blog, BlogPut } from '../../../core/interfaces/blog.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  otherImage = false;
  idSelected: number = 0;
  action = '';
  isModalOpen = false;
  isModalImageOpen = false;
  task = { title: '', description: '' };
  blogs: Blog[] = [];

  formData: FormData = new FormData();
  formDataUpdate: FormData = new FormData();

  blogForm: FormGroup;
  imageUrl: string | ArrayBuffer | null = null;
  imageUrlEdit: string | ArrayBuffer | null = '';

  constructor(
    private blogsService: BlogsService,
    private formBuilder: FormBuilder
  ) {
    this.blogForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      image: [null],
    });
  }

  ngOnInit(): void {
    this.obtenerBlogs();
  }

  obtenerBlogs() {
    this.blogsService.obtenerBlogs().subscribe((data: any) => {
      this.blogs = data;
    });
  }

  changeStatus(id: number) {
    if (confirm('¿Está seguro que desea eliminar este blog?')) {
      this.blogsService.changeStatusBlogs(id).subscribe((data: any) => {
        console.log(data);
        this.obtenerBlogs();
      });
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.blogForm.patchValue({
        image: file,
      });
      this.formData.append('image', file, file.name);

      // Previsualizar la imagen seleccionada
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result!;
      };
      reader.readAsDataURL(file);
    }
  }

  onImageSelectedUpdate(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.blogForm.patchValue({
        image: file,
      });
      this.formDataUpdate.append('image', file, file.name);

      // Previsualizar la imagen seleccionada
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrlEdit = e.target?.result!;
      };
      reader.readAsDataURL(file);
    }
  }

  add() {
    this.idSelected = 0;
    this.imageUrl = '';
    this.action = 'New';
    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // Restablecer el valor del input
    }
    this.blogForm.reset();
    this.openModal();
  }

  changeImage() {
    this.otherImage = true;
    this.imageUrl = '';
  }

  edit(item: Blog) {
    this.idSelected = item.id;
    this.otherImage = false;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // Restablecer el valor del input
    }
    this.imageUrl = '';
    this.action = 'Edit';

    this.blogForm.controls['title'].setValue(item.title);
    this.blogForm.controls['description'].setValue(item.description);

    this.imageUrl = environment.apiUrl + 'back/' + item.image;

    this.openModal();
  }

  editImage(item: Blog) {
    this.imageUrlEdit = environment.apiUrl + 'back/' + item.image;
    this.idSelected = item.id;
    this.openModalImage();
  }

  editImageForm(){
    this.blogsService.editImg(this.idSelected,this.formDataUpdate).subscribe(
      (response) => {
        console.log('Image Blog actualizado exitosamente:', response);
        this.obtenerBlogs();
        this.closeModalImage();
      },
      (error) => {
        console.error('Error al actualizar el post:', error);
      }
    );
  }

  // Maneja el envío del formulario
  onSubmit() {
    this.blogForm.markAllAsTouched();

    if (this.blogForm.invalid && this.imageUrl == '') {
      return;
    }

    const formValues = this.blogForm.value;

    // Limpia el FormData antes de agregar los nuevos valores
    this.formData = new FormData();

    // Agregar siempre title y description al FormData


    // Si se seleccionó una imagen, la agregamos al FormData
    if (formValues.image) {
      this.formData.append('image', formValues.image, formValues.image.name);
    }

    if (this.action == 'New') {
      this.formData.append('title', formValues.title);
      this.formData.append('description', formValues.description);
      // Solicitar creación del nuevo post
      this.blogsService.createPost(this.formData).subscribe(
        (response) => {
          console.log('Blog creado exitosamente:', response);
          this.obtenerBlogs();
        },
        (error) => {
          console.error('Error al crear el post:', error);
        }
      );
    } else {

      let blog : BlogPut = {
        description: formValues.description,
        title: formValues.title ,
        id: this.idSelected
      }

      this.blogsService.editPut(blog).subscribe(
        (response) => {
          console.log('Blog actualizado exitosamente:', response);
          this.obtenerBlogs();
        },
        (error) => {
          console.error('Error al actualizar el post:', error);
        }
      );
    }

    this.otherImage = false;
    this.closeModal(); // Cierra el modal después de enviar el formulario
  }

  // Abre el modal
  openModal() {
    this.isModalOpen = true;
  }

  // Cierra el modal
  closeModal() {
    this.isModalOpen = false;
  }


  // Abre el modal
  openModalImage() {
    this.isModalImageOpen = true;
  }

  // Cierra el modal
  closeModalImage() {
    this.isModalImageOpen = false;
    this.formDataUpdate = new FormData();
  }
}