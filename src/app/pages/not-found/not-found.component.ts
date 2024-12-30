import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  bannerImage: string = 'assets/img/404.jpg'
  bannerText : string = 'Oops! This page doesn’t exist in our hive. Buzz back to the homepage and keep exploring!'

}

