import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  
  scrollbarTop(){
    window.scroll(0,0);
   
  }
  whatsappMessage: string;
  constructor() {
    const message = 'Hello! I have a Honey bee situation 🐝🐝 and would like your Live Honey Bee Removal Services. Can you help me? Thank you!';
    // Codificamos el mensaje usando encodeURIComponent
    this.whatsappMessage = encodeURIComponent(message);
  }

}
