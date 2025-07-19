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
      image_1_url: [null, [Validators.required]], // ahora guardará File
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
      this.subcategoryService.changeStatusCategory(id).subscribe((data: any) => {
        console.log(data);
      });
    }
  }

  add(){
    this.action = 'New';
    this.productForm.reset();
    this.openModal();
  }
  
  edit(item: Product){
    this.action = 'Edit';
    this.productId = item.id_product;

    this.currentImage1 = item.image_1_url;
    this.currentImage1Name = item.image_1_url ? item.image_1_url.split('/').pop() ?? null : null;
    this.currentImage2 = item.image_2_url;
    this.currentImage2Name = item.image_2_url ? item.image_2_url.split('/').pop() ?? null : null;
    this.currentImage3 = item.image_3_url;
    this.currentImage3Name = item.image_3_url ? item.image_3_url.split('/').pop() ?? null : null;

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
      this.productForm.patchValue({
        [controlName]: file
      });

      if (controlName === 'image_1_url') {
        this.currentImage1 = null;  // Oculta la imagen anterior
        this.currentImage1Name = file.name; // Muestra el nuevo nombre si quieres
      }
       if (controlName === 'image_2_url') {
        this.currentImage2 = null;  // Oculta la imagen anterior
        this.currentImage2Name = file.name; // Muestra el nuevo nombre si quieres
      }
       if (controlName === 'image_3_url') {
        this.currentImage3 = null;  // Oculta la imagen anterior
        this.currentImage2Name = file.name; // Muestra el nuevo nombre si quieres
      }
    }
  }

  private buildFormData(data: any): FormData {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return formData;
  }

  onSubmit() {
     if (this.productForm.invalid) {
      // Marca todos los controles como "tocados" para que aparezcan los errores
      this.productForm.markAllAsTouched();
      return; // Evita el envío
    }

    const formValues = this.productForm.value;
    const formData = this.buildFormData(formValues);

    if (this.action === "Edit") {
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
