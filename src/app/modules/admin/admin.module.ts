import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar FormsModule

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { IndexComponent } from './index/index.component';

import { BlogsComponent } from './blogs/blogs.component';
import { UsersComponent } from './users/users.component';
import { GalleryComponent } from './gallery/gallery.component';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    AdminComponent,
    IndexComponent,
    BlogsComponent,
    UsersComponent,
    GalleryComponent,
    CategoryComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorComponent
  ]
})
export class AdminModule { }
