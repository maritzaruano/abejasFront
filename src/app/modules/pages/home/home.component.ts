import { Component, ElementRef, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private titleService: Title, private metaService: Meta) { 
    // Establecemos el título de la página
    this.titleService.setTitle('Abstract Beezzz | Safe Live Honey Bee Removal Experts Stuart');

    // Establecemos la metadata de la página (descripción, palabras clave, etc.)
    this.metaService.updateTag({ name: 'description', content: 'Abstract Beezzz offers professional live honey bee removal and relocation in Stuart, Martin, Port St. Lucie, and Palm Beach Counties. Expert solutions.' });
    this.metaService.updateTag({ name: 'keywords', content:'bee removalist, bee hive removal, honey bee removal, bee nest removal,bee removal cost'})
    this.metaService.updateTag({ name: 'author', content: 'Abstract Beezzz'});
    this.metaService.updateTag({ name: 'publisher', content: 'Abstract Beezzz'})
    this.metaService.updateTag({ name: 'lang', content: 'en'}) 
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    
  
  }

  

  bannerImage: string = 'assets/img/home.jpg';
  @ViewChild('videoElement', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;

  togglePlay() {
    const video: HTMLVideoElement | null = document.querySelector('.my-video-class');
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
  
}
