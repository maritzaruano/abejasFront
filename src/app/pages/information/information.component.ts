import { Component } from '@angular/core';
import { INFORMATION } from '../../core/constants/information.constants';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  information = INFORMATION;

  whatsappMessage: string;

  constructor() {
    const message = 'Hello! I have a Honey bee situation 🐝🐝 and would like your Live Honey Bee Removal Services. Can you help me? Thank you!';
    // Codificamos el mensaje usando encodeURIComponent
    this.whatsappMessage = encodeURIComponent(message);
  }
}
