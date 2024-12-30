import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private bannerData: { [key: string]: { image: string; text: string } } = {
    '/home': { image: 'assets/img/live_bee.jpg', text: 'Live Bee Removal Services <br/>All Bees Saved'},
    '/gallery': { image: 'assets/img/construccion.jpg', text: 'We’re working on it!' },
    '/contact': { image: 'assets/img/live_bee.jpg', text: 'Contact Us' },
    '/about-us': { image: 'assets/img/live_bee.jpg', text: 'About Us' },
    '/blogs': { image: 'assets/img/construccion.jpg', text: 'We’re working on it!' },
    '/services': { image: 'assets/img/live_bee.jpg', text: 'Services' },
    
  };
  

  getBannerData(path: string): { image: string; text: string } {
    return this.bannerData[path] || this.bannerData['/home'];
  }

}
