import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

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
