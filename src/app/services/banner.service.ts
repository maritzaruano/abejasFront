import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private bannerData: { [key: string]: { image: string; text: string; alt: string; title: string; } } = {
    '/home': { image: 'assets/img/bee_removal_services.jpg', text: 'Live Bee Removal Services <br/>All Bees Saved', title: 'Honey Bees from bee removal service', alt: 'Queen and worker bees during a live honey bee removal, illustrating safe relocation to protect the hive and bees.'},
    '/gallery': { image: 'assets/img/construccion.jpg', text: 'We’re working on it!' , title: 'Honey Bees from bee removal service', alt: 'Queen and worker bees during a live honey bee removal, illustrating safe relocation to protect the hive and bees.'},
    '/contact': { image: 'assets/img/bee_removal_services.jpg', text: 'Contact Us',title: 'Honey Bees from bee removal service', alt: 'Queen and worker bees during a live honey bee removal, illustrating safe relocation to protect the hive and bees.' },
    '/about-us': { image: 'assets/img/bee_removal_services.jpg', text: 'About Us' , title: 'Honey Bees from bee removal service', alt: 'Queen and worker bees during a live honey bee removal, illustrating safe relocation to protect the hive and bees.'},
    '/blogs': { image: 'assets/img/construccion.jpg', text: 'We’re working on it!', title: 'Honey Bees from bee removal service', alt: 'Queen and worker bees during a live honey bee removal, illustrating safe relocation to protect the hive and bees.' },
    '/services': { image: 'assets/img/bee_removal_services.jpg', text: 'Services', title: 'Honey Bees from bee removal service', alt: 'Queen and worker bees during a live honey bee removal, illustrating safe relocation to protect the hive and bees.' },
    '/privacy-policy': { image: 'assets/img/bee_removal_services.jpg', text: 'Privacy Policy', title: 'Honey Bees from bee removal service', alt: 'Queen and worker bees during a live honey bee removal, illustrating safe relocation to protect the hive and bees.' },
    
  };
  

  getBannerData(path: string): { image: string; text: string , alt: string; title: string } {
    return this.bannerData[path] || this.bannerData['/home'];
  }

}
