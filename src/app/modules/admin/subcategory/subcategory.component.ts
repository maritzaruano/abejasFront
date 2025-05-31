import { Component } from '@angular/core';
import { SubcategoryService } from '../../../core/services/subcategory.admin.service';
import { Subcategory, SubCategoryPost, SubCategoryPut } from '../../../core/interfaces/Subcategory.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/interfaces/category';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss'
})
export class SubcategoryComponent {
  action = '';  
  isModalOpen = false;
  subcategory : Subcategory [] = [];
  formData: FormData = new FormData();
  subcategoryId: number = 0;
  categoryForm : FormGroup;

  categories: Category [] = [];

  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService, 
    private formBuilder: FormBuilder ){
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      id_category: ['', [Validators.required]]
    })

  }

    ngOnInit(): void {
      this.getSubCategory();
      this.getCategories();
    }

    getCategories(){
      this.categoryService.getCategory().subscribe((data: any) =>{
        this.categories = data;
      })
    }

    getSubCategory() {
      this.subcategoryService.getSubCategories().subscribe((data: any) => {
        this.subcategory = data;
      });
    }

    changeStatusCategory(id: number) {
      if (confirm('¿Está seguro que desea eliminar esta imagen de la galeria?')) {
        this.subcategoryService.changeStatusCategory(id).subscribe((data: any) => {
          console.log(data);
          this.getSubCategory();
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
    
    edit(item: Subcategory){
      this.action = 'Edit';
      this.subcategoryId  = item.id;
      this.categoryForm.controls["name"].setValue(item.name);
      this.categoryForm.controls["description"].setValue(item.description)
      this.categoryForm.controls["id_category"].setValue(item.id_category)

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

          let categoryP : SubCategoryPut = {
            id: this.subcategoryId,
            name: formValues.name,
            description: formValues.description,
            id_category: formValues.id_category
          }
    
          this.subcategoryService.updateSubCategory(categoryP).subscribe({
            next: (response : any) => {
              console.log('Subcategory updated successfully:', response);
              this.getSubCategory();
            },
            error: (error) => {
              console.error('Error updating subcategory:', error);
              this.getSubCategory();
            },
            complete: () => {

              console.log('Update subcategory request completed.');
            }
          });
        }else{
          const formValues = this.categoryForm.value;
          let newSubCategory: SubCategoryPost = {
            name: formValues.name,
            description: formValues.description,
            id_category: formValues.id_category
          };

          //Aquí hacemos la solicitud HTTP para crear el post
          this.subcategoryService.createSubCategory(newSubCategory).subscribe(
            (response) => {
              console.log('User created successfully:', response);
              // Puedes hacer algo con la respuesta, como mostrar un mensaje de éxito
              this.getSubCategory();
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
