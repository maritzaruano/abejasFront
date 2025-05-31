import { Component, OnInit } from '@angular/core';
import { Category, CategoryPost } from '../../../core/interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { get } from 'http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{


  action = '';  
  isModalOpen = false;
  category: Category [] = [];
  formData: FormData = new FormData();
  categoryId: number = 0;
  categoryForm : FormGroup;

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder ){
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.getCategory();
    
  }

  getCategory() {
    this.categoryService.getCategory().subscribe((data: any) => {
      this.category = data;
    });
  }

  changeStatusCategory(id: number) {
    if (confirm('¿Está seguro que desea eliminar esta imagen de la galeria?')) {
      this.categoryService.changeStatusCategory(id).subscribe((data: any) => {
        console.log(data);
        this.getCategory();
      });
    }
  }

  add(){
    this.action = 'New';
    this.categoryForm.reset();
    
    this.categoryForm.controls["name"].setValidators([Validators.required]);
    this.categoryForm.controls["description"].updateValueAndValidity();
    
    this.openModal();
  }
  
  edit(item: Category){
    this.action = 'Edit';
    this.categoryId  = item.id;
    this.categoryForm.controls["name"].setValue(item.name);
    this.categoryForm.controls["description"].setValue(item.description)

    this.openModal();
  }
  
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

   onSubmit() {  
      if (this.categoryForm.invalid) {
        return;
      }   
  
      if(this.action == "Edit"){
        const formValues = this.categoryForm.value;
        let categoryP : CategoryPost = {
          name: formValues.name,
          description: formValues.description
        }
  
        this.categoryService.updateCategory(this.categoryId, categoryP).subscribe({
          next: (response) => {
            this.getCategory();
          },
          error: (error) => {
            this.getCategory(); // Asegúrate de que tiene sentido llamar también en caso de error
          },
          complete: () => {

          }
        });

      }else{
        const formValues = this.categoryForm.value;
        this.formData.append('name', formValues.name);
        this.formData.append('description', formValues.description);

        //Aquí hacemos la solicitud HTTP para crear el post
        this.categoryService.createCategory(this.formData).subscribe(
          (response) => {
            console.log('User created successfully:', response);
            // Puedes hacer algo con la respuesta, como mostrar un mensaje de éxito
            this.getCategory();
          },
          (error) => {
            console.error('Error creating categoty:', error);
            // Puedes manejar errores, como mostrar un mensaje de error
          }
        );
      }

    this.closeModal(); // Cierra el modal después de enviar el formulario
  
  }


}
