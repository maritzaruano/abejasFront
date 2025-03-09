import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ServicesComponent } from './services/services.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  {
    path: '', // Ruta base vacía
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutComponent },
      { path: 'blogs', component: BlogComponent },
      { path: 'blog/:id', component: BlogDetailComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent},
      { path: 'store', component: StoreComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
