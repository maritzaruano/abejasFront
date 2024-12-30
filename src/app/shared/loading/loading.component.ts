import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/shared/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  
  isLoading = false;
  private subscription: Subscription | undefined;

  constructor(private loadingService: LoadingService){

  }

  ngOnInit(): void {
    this.subscription = this.loadingService.visibility$.subscribe(
      visible => this.isLoading = visible
    );
  }

  close(): void {
    this.loadingService.hide();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
