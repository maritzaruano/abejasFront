import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  menuOpen = false;

  // Método para alternar el estado del menú
  toggleMenu() {
    this.menuOpen = !this.menuOpen;

  }

  scrollbarTop(){
    window.scroll(0,0);
   
  }

}
