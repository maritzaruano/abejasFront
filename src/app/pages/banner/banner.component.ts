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
  bannerAlt: string = '';
  bannerTitle: string = '';


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
    this.bannerAlt = bannerData.alt;  // Obtén el 'alt'
    this.bannerTitle = bannerData.title;  // Obtén el 'title'
   });
  }

  isOnRoute(route: string): boolean {
    return this.currentUrl === route; // Compara con la ruta deseada
  }

  isBlogOrBlogs(): boolean {
    const url = this.router.url;
    return url === '/blogs' ||  url.startsWith('/blog/') 
  }

  isGallery(): boolean {
    const url = this.router.url;
    return url === '/gallery'
  }

  isStore(): boolean {
    const url = this.router.url;
    return url === '/store' ||  url.startsWith('/store') 
  }

  isProductDetail(): boolean {
    const url = this.router.url;
    return url === '/product-detail' ||  url.startsWith('/product-detail') 
  }

  isCheckout(): boolean {
    const url = this.router.url;
    return url === '/checkout' ||  url.startsWith('/checkout') 
  }
}
