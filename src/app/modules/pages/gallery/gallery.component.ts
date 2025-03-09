import { Component, OnInit } from '@angular/core';
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
  // Usamos el modelo Hexagon en lugar de un array de strings
  hexagonImages: Hexagon[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;
  currentHexagons: Hexagon[] = [];
  totalPages: number[] = [];

  constructor(private galleryInfoService: GalleryInfoService) { 
  }

  ngOnInit(): void {
    this.galleryInfoService.obtenerGalleries().subscribe((data) => {
      this.hexagonImages = data.data || []; // Evita errores si data.data es undefined
      this.updatePagination(); // Llamar después de recibir los datos
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

  openModal(hexagon: Hexagon) {
    alert(`Abrir imagen: ${hexagon.title}\n${hexagon.description}`);
  }
}
