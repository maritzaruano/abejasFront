import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  // Lista de imágenes
  images = [
    '/assets/img/gallery6.jpg',
    '/assets/img/1.jpg',
    '/assets/img/3.jpg'
  ];
  currentImageIndex: number = 0;  // Índice de la imagen actual

  // Abrir el modal con la imagen seleccionada
  openModal(imageUrl: string) {
    const index = this.images.indexOf(imageUrl);
    if (index !== -1) {
      this.currentImageIndex = index; // Establecemos el índice de la imagen que se ha seleccionado
    }
  }

  // Cambiar a la siguiente imagen
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  // Cambiar a la imagen anterior
  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  // Cerrar el modal
  closeModal() {
    this.currentImageIndex = -1;
  }

  // Obtener la imagen que se está mostrando en el modal
  get modalImageUrl() {
    return this.images[this.currentImageIndex];
  }
}
