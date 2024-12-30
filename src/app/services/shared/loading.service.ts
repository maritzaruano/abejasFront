import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
    private visibilitySubject = new BehaviorSubject<boolean>(false); // Inicialmente oculto
    visibility$ = this.visibilitySubject.asObservable();
  
    show(): void {
      this.visibilitySubject.next(true);
    }
  
    hide(): void {
      this.visibilitySubject.next(false);
    }
  
    toggle(): void {
      const currentState = this.visibilitySubject.getValue();
      this.visibilitySubject.next(!currentState);
    }
}