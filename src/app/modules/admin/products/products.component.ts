import { Component } from '@angular/core';
import { Subcategory } from '../../../core/interfaces/Subcategory.interface';
import { SubcategoryService } from '../../../core/services/subcategory.admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../core/interfaces/category';
import { ProductsService } from '../../../core/services/products.admin.service';
import { Product, ProductAdmin, VariantAdmin } from '../../../core/interfaces/product.interface';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  action = '';  
  actionVariant = '';  
  isModalOpen = false;
  isModalVariantOpen = false;
  subcategory: Subcategory[] = [];
  category: Category[] = [];
  productId: number = 0;
  variantId: number = 0;
  productForm: FormGroup;
  variantForm: FormGroup;
  products: ProductAdmin[] = [];
  productList: ProductAdmin[] = [];

  currentImage1: string | null | undefined = null;
  currentImage2: string | null | undefined = null;
  currentImage3: string | null | undefined = null;

  currentImage1Name: string | null = null;
  currentImage2Name: string | null = null;
  currentImage3Name: string | null = null;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService, 
    private formBuilder: FormBuilder
  ){
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      id_subcategory: ['', [Validators.required]],
      id_category: ['', [Validators.required]],
    });

    this.variantForm = this.formBuilder.group({
      id_product: ['' , Validators.required],
      description_variant: ['' , Validators.required],
      options: ['', [Validators.required]],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      size: ['', Validators.required],
      weight_oz: ['', [Validators.required]],
      length_in: ['', [Validators.required]],
      width_in: ['', [Validators.required]],
      height_in: ['', [Validators.required]],
      image_1_url: [null],
      image_2_url: [null],
      image_3_url: [null],
      sku: ['', [Validators.required]],
      tax: [0, [Validators.required]],
      shiping_cost: [0, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getCategory();
    this.getProducts();
  }

  getProducts(){
    this.productService.getProduct().subscribe((data: any) =>{
      this.products = data;
    });
  }

  getCategory() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.category = data;
    });
  }

  getSubCategory(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value ?? ""; 
    const id = value ? Number(value) : null;

    if (id !== null) {
      this.subcategoryService.getSubCategoriesByCategory(id).subscribe((data: any) => {
        this.subcategory = data;
      });
    } else {
      this.subcategory = [];
    }
  }

  changeStatusCategory(item : any) {
    if (confirm('¿Está seguro que desea eliminar esta imagen de la galeria?')) {
      this.productService.deleteProduct(item.id).subscribe((data: any) => {
        this.getProducts();
      });
    }
  }

  add() {
    this.action = 'New';


    this.openModal();
  }


  
  edit(item: ProductAdmin) {
    this.action = 'Edit';
    this.productId = item.id;



    this.productForm.patchValue({
      name: item.name,
      description: item.description,
      id_category: item.CategoryId,
    });

    this.subcategoryService.getSubCategoriesByCategory(item.CategoryId).subscribe((data: any) => {
      this.subcategory = data;
      this.productForm.patchValue({
        id_subcategory: item.id_subcategory
      });
      this.openModal();
    });
  }

  
  openModal() {
    this.isModalOpen = true;
  }



  closeModal() {
    this.isModalOpen = false;
  }


  onFileSelected(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      // Actualiza el FormControl sin tocar el DOM del input
      this.variantForm.get(controlName)?.setValue(file, { emitModelToViewChange: false });
      this.variantForm.get(controlName)?.markAsTouched();

      const previewUrl = URL.createObjectURL(file);

      if (controlName === 'image_1_url') {
        this.currentImage1 = previewUrl;
        this.currentImage1Name = file.name;
      } 
      else if (controlName === 'image_2_url') {
        this.currentImage2 = previewUrl;
        this.currentImage2Name = file.name;
      } 
      else if (controlName === 'image_3_url') {
        this.currentImage3 = previewUrl;
        this.currentImage3Name = file.name;
      }
    }
  }


  onSubmit() {
    debugger;

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return; // Evita envío si el formulario no es válido
    }

    const formValues = this.productForm.value;

    const formData = new FormData();

    Object.keys(this.productForm.controls).forEach(key => {
      const value = this.productForm.get(key)?.value;

      if (value instanceof File) {
        // Si es archivo, añadir directamente
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        // Si no es archivo, convertir a string
        formData.append(key, value.toString());
      }
    });
    
    if (this.action === 'Edit') {
      formData.append('id_product', this.productId.toString());
      this.productService.updateProduct(formData).subscribe({
        next: () => this.getProducts(),
        error: (err) => console.error('Error updating product:', err)
      });
    } else {
      this.productService.createProduct(formData).subscribe({
        next: () => this.getProducts(),
        error: (err) => console.error('Error creating product:', err)
      });
    }

    this.closeModal();
  }

  //#region Variant zone
  
    openModalVariant() {
      this.isModalVariantOpen = true;
    }


    closeModalVariant() {
      this.isModalVariantOpen = false;
    }

    addVariant() {
      this.actionVariant = 'New';

      this.variantForm.reset({
        image_1_url: null,
        image_2_url: null,
        image_3_url: null
      });

      this.currentImage1 = null;
      this.currentImage2 = null;
      this.currentImage3 = null;

      this.currentImage1Name = null;
      this.currentImage2Name = null;
      this.currentImage3Name = null;

      // Imágenes obligatorias en nuevo producto
      ['image_1_url', 'image_2_url', 'image_3_url'].forEach(control => {
        this.variantForm.get(control)?.setValidators([Validators.required]);
        this.variantForm.get(control)?.updateValueAndValidity();
      });


      this.getAllProductsList();
      this.openModalVariant();
    }


  editVariant(event: Event, variants: VariantAdmin[]) {
    this.actionVariant = 'Edit';

    const selectedId = +(event.target as HTMLSelectElement).value;
    this.variantId = selectedId;
    const selectedVariant = variants.find(v => v.id === selectedId);

    if (!selectedVariant) return;

    // Traer lista de productos y dejar el id_product seleccionado
    this.getAllProductsList(() => {
      this.variantForm.patchValue({
        id_product: selectedVariant.id_product // aquí queda seleccionado
      });
    });

    this.currentImage1 = selectedVariant.image_1_url;
    this.currentImage1Name = null;
    this.currentImage2 = selectedVariant.image_2_url;
    this.currentImage2Name = null;
    this.currentImage3 = selectedVariant.image_3_url;
    this.currentImage3Name = null;

    ['image_1_url', 'image_2_url', 'image_3_url'].forEach(control => {
      this.variantForm.get(control)?.clearValidators();
      this.variantForm.get(control)?.updateValueAndValidity();
    });

    this.variantForm.patchValue({
      description_variant: selectedVariant.description_variant,
      price: selectedVariant.price,
      height_in: selectedVariant.height_in,
      options: selectedVariant.options,
      sku: selectedVariant.sku,
      stock: selectedVariant.stock,
      weight_oz: selectedVariant.weight_oz,
      width_in: selectedVariant.width_in,
      shiping_cost: selectedVariant.shiping_cost,
      length_in: selectedVariant.length_in,
      size: selectedVariant.size
    });

    this.openModalVariant();
  }


    getAllProductsList(callback?: () => void){
      this.productService.getListProduct().subscribe((data: any) =>{
        this.productList = data;
        if (callback) callback();
      });
    }

    onSubmitVariant(){

      if (this.variantForm.invalid) {
        console.log('Form is invalid');
        Object.keys(this.variantForm.controls).forEach(key => {
          const control = this.variantForm.get(key);
          if (control?.invalid) {
            console.log(`${key} is invalid. Errors:`, control.errors);
          }
        });
        this.variantForm.markAllAsTouched();
        return; // Evita envío si el formulario no es válido
      }


      const formValues = this.variantForm.value;

      if (this.actionVariant !== 'Edit') {

        const hasAnyImage =
          formValues.image_1_url instanceof File ||
          formValues.image_2_url instanceof File ||
          formValues.image_3_url instanceof File;

        if (!hasAnyImage) {
          alert('Debes subir al menos una imagen para crear un producto.');
          return;
        }
      }

      const formData = new FormData();

      //Agregar todos los campos excepto imágenes
      for (const key in formValues) {
        if (!['image_1_url', 'image_2_url', 'image_3_url'].includes(key)) {
          formData.append(key, formValues[key]);
        }
      }

      //Agregar imágenes SOLO si son archivos nuevos
      ['image_1_url', 'image_2_url', 'image_3_url'].forEach(imgKey => {
        const file = formValues[imgKey];
        if (file instanceof File) {
          formData.append(imgKey, file);
        }
      });

      if (this.actionVariant === 'Edit') {
        formData.append('id_variant', this.variantId.toString());
        this.productService.updateVariant(formData).subscribe({
          next: () => this.getProducts(),
          error: (err) => console.error('Error updating product:', err)
        });
      } else {
        this.productService.createVariant(formData).subscribe({
          next: () => this.getProducts(),
          error: (err) => console.error('Error creating product:', err)
        });
      }

      this.closeModalVariant();

    }

  //#endregion

}
