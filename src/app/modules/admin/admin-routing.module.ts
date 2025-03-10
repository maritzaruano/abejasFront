import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AuthGuard } from '../../core/guards/AuthGuard.guard';
import { UsersComponent } from './users/users.component';
import { GalleryComponent } from './gallery/gallery.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blogs',
    component: BlogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 


  
}
