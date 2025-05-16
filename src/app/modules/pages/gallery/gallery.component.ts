import { Component, OnInit, HostListener } from '@angular/core';
import { GalleryInfoService } from '../../../core/services/gallery-info.service';

export interface Hexagon {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  hexagonImages: Hexagon[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  currentHexagons: Hexagon[] = [];
  totalPages: number[] = [];

  // Variable para almacenar el hexágono seleccionado
  selectedHexagon: Hexagon | null = null;
  selectedHexagonIndex: number = -1; // Índice del hexágono seleccionado en la lista

  constructor(private galleryInfoService: GalleryInfoService) { }

  ngOnInit(): void {
    this.galleryInfoService.obtenerGalleries().subscribe((data) => {
      this.hexagonImages = data.data || [];
      this.updatePagination();
      this.loadHexagons();
    });
  }

  loadHexagons() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentHexagons = this.hexagonImages.slice(startIndex, endIndex);
  }

  updatePagination() {
    const totalPages = Math.ceil(this.hexagonImages.length / this.itemsPerPage);
    this.totalPages = Array(totalPages).fill(0);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.loadHexagons();
  }

  getRows(hexagons: Hexagon[]): Hexagon[][] {
    const rows: Hexagon[][] = [];
    let currentRow: Hexagon[] = [];
    let isThree = true;

    for (let i = 0; i < hexagons.length; i++) {
      if (isThree) {
        currentRow.push(hexagons[i]);
        if (currentRow.length === 3) {
          rows.push(currentRow);
          currentRow = [];
          isThree = false;
        }
      } else {
        currentRow.push(hexagons[i]);
        if (currentRow.length === 2) {
          rows.push(currentRow);
          currentRow = [];
          isThree = true;
        }
      }
    }

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  }

  // Método para abrir el modal
  openModal(hexagon: Hexagon) {
    this.selectedHexagon = hexagon;
    this.selectedHexagonIndex = this.hexagonImages.findIndex(h => h === hexagon);
  }

  // Método para cerrar el modal
  closeModal() {
    this.selectedHexagon = null;
    this.selectedHexagonIndex = -1; // Restablecer el índice del hexágono seleccionado
  }

  // Método para ir a la imagen anterior
  prevImage() {
    if (this.selectedHexagonIndex > 0) {
      this.selectedHexagonIndex--;
      this.selectedHexagon = this.hexagonImages[this.selectedHexagonIndex];
    }
  }

  // Método para ir a la imagen siguiente
  nextImage() {
    if (this.selectedHexagonIndex < this.hexagonImages.length - 1) {
      this.selectedHexagonIndex++;
      this.selectedHexagon = this.hexagonImages[this.selectedHexagonIndex];
    }
  }

  // Detectar la tecla ESC para cerrar el modal
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.selectedHexagon) {
      this.closeModal(); // Cierra el modal si se presiona ESC
    }
  }

  // Detectar el botón de retroceso en dispositivos móviles (popstate)
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    if (this.selectedHexagon) {
      this.closeModal(); // Cierra el modal si se presiona el botón de retroceso
    }
  }

  // Metodo para asegurar que cuando el modal se cierre (ya sea por popstate o escape) la pagina no se desplace
  scrollbarTop(){
    window.scroll(0, 0);
  }
}
