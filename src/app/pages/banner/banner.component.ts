import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit {
  bannerImage: string = '';
  bannerText: string = '';
  currentUrl: string = '';

  constructor
    (
      public router: Router, 
      private bannerService: BannerService
    )
  {

    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url; // Obtiene la URL actual
    });
  };
  ngOnInit(): void {
   this.router.events.subscribe(() =>{
    const currentPages = this.router.url;
    const bannerData = this.bannerService.getBannerData(currentPages);
    this.bannerImage = bannerData.image;
    this.bannerText = bannerData.text
   });
  }

  isOnRoute(route: string): boolean {
    return this.currentUrl === route; // Compara con la ruta deseada
  }

  isBlogOrBlogs(): boolean {
    const url = this.router.url;
    return url === '/blogs' || url === '/gallery'|| url.startsWith('/blog/') 
  }

  isGallery(): boolean {
    const url = this.router.url;
    return url === '/gallety'
  }

}
