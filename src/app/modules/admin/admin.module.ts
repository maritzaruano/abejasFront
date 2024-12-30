import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { IndexComponent } from './index/index.component';

import { BlogsComponent } from './blogs/blogs.component';
import { UsersComponent } from './users/users.component';
import { GalleryComponent } from './gallery/gallery.component';


@NgModule({
  declarations: [
    AdminComponent,
    IndexComponent,
    BlogsComponent,
    UsersComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
