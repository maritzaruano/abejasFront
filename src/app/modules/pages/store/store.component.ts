import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../services/shared/loading.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
  
  constructor(private loadingService: LoadingService){

  }
  ngOnInit(): void {
    this.loadingService.show();
    this.loadingService.hide();
  }

}
