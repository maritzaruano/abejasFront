import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { HeaderComponent } from '../../pages/header/header.component';
import { FooterComponent } from '../../pages/footer/footer.component';
import { NavComponent } from '../../pages/nav/nav.component';
import { BannerComponent } from '../../pages/banner/banner.component';
import { FooterbannerComponent } from '../../pages/footerbanner/footerbanner.component';
import { ToastComponent } from '../../shared/toast/toast/toast.component';
import { InformationComponent } from '../../pages/information/information.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagesComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    BannerComponent,
    FooterbannerComponent,
    ToastComponent,
    BlogDetailComponent,
    InformationComponent,
    AboutComponent,       // Asegúrate de declarar estos
    ContactComponent,
    GalleryComponent,
    HomeComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
