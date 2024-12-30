import { Component } from '@angular/core';
import { ToastService } from '../../../services/shared/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  message: string | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.message$.subscribe(
      msg => this.message = msg
    );
  }

}
