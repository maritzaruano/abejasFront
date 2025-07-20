import { Component } from '@angular/core';
import { Subcategory } from '../../../core/interfaces/Subcategory.interface';
import { SubcategoryService } from '../../../core/services/subcategory.admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../core/interfaces/category';
import { ProductsService } from '../../../core/services/products.admin.service';
import { Product } from '../../../core/interfaces/product.interface';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  action = '';  
  isModalOpen = false;
  subcategory: Subcategory[] = [];
  category: Category[] = [];
  productId: number = 0;
  productForm: FormGroup;
  products: Product[] = [];

  currentImage1: string | null = null;
  currentImage2: string | null = null;
  currentImage3: string | null = null;

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
    });
  }

  ngOnInit(): void {
    this.getCategory();
    this.getProducts();
  }

  getProducts(){
    this.productService.get().subscribe((data: any) =>{
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

  changeStatusCategory(id: number) {
    if (confirm('¿Está seguro que desea eliminar esta imagen de la galeria?')) {
      this.productService.delete(id).subscribe((data: any) => {
        this.getProducts();
      });
    }
  }

  add() {
    this.action = 'New';

    this.productForm.reset({
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
      this.productForm.get(control)?.setValidators([Validators.required]);
      this.productForm.get(control)?.updateValueAndValidity();
    });

    this.openModal();
  }

  
  edit(item: Product) {
    this.action = 'Edit';
    this.productId = item.id_product;

    this.currentImage1 = item.image_1_url;
    this.currentImage1Name = null;
    this.currentImage2 = item.image_2_url;
    this.currentImage2Name = null;
    this.currentImage3 = item.image_3_url;
    this.currentImage3Name = null;

    // Quitar los requeridos porque en edición las imágenes no son obligatorias
    ['image_1_url', 'image_2_url', 'image_3_url'].forEach(control => {
      this.productForm.get(control)?.clearValidators();
      this.productForm.get(control)?.updateValueAndValidity();
    });

    this.productForm.patchValue({
      name: item.name,
      description: item.description,
      price: item.price,
      height_in: item.height_in,
      options: item.options,
      sku: item.sku,
      stock: item.stock,
      weight_oz: item.weight_oz,
      width_in: item.width_in,
      id_category: item.CategoryId,
      shiping_cost: item.shiping_cost,
      length_in: item.length_in,
      size: item.size
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
      this.productForm.get(controlName)?.setValue(file, { emitModelToViewChange: false });
      this.productForm.get(controlName)?.markAsTouched();

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

    // Validación: si es creación y no hay imágenes seleccionadas
    if (this.action !== 'Edit') {
      debugger;

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

    // Agregar todos los campos excepto imágenes
    for (const key in formValues) {
      if (!['image_1_url', 'image_2_url', 'image_3_url'].includes(key)) {
        formData.append(key, formValues[key]);
      }
    }

    // Agregar imágenes SOLO si son archivos nuevos
    ['image_1_url', 'image_2_url', 'image_3_url'].forEach(imgKey => {
      const file = formValues[imgKey];
      if (file instanceof File) {
        formData.append(imgKey, file);
      }
    });

    if (this.action === 'Edit') {
      formData.append('id_product', this.productId.toString());
      this.productService.update(formData).subscribe({
        next: () => this.getProducts(),
        error: (err) => console.error('Error updating product:', err)
      });
    } else {
      this.productService.create(formData).subscribe({
        next: () => this.getProducts(),
        error: (err) => console.error('Error creating product:', err)
      });
    }

    this.closeModal();
  }


}
