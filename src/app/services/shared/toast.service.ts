import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
    private messageSubject = new BehaviorSubject<string | null>(null); // Mensaje inicial es null
    message$ = this.messageSubject.asObservable();
  
    show(message: string): void {
      this.messageSubject.next(message); // Establece el mensaje
      setTimeout(() => {
        this.hide(); // Oculta el mensaje después de 3 segundos
      }, 3000);
    }
  
    hide(): void {
      this.messageSubject.next(null); // Limpia el mensaje
    }
}