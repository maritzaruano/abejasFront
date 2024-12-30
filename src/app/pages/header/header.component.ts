import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  whatsappMessage: string;

  constructor() {
    const message = 'Hello! I have a Honey bee situation 🐝🐝 and would like your Live Honey Bee Removal Services. Can you help me? Thank you!';
    // Codificamos el mensaje usando encodeURIComponent
    this.whatsappMessage = encodeURIComponent(message);
  }

}
