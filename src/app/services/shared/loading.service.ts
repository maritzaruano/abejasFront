import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

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
      timer(1000).subscribe(() => {
        this.visibilitySubject.next(false);
      });
    }
  
    toggle(): void {
      const currentState = this.visibilitySubject.getValue();
      this.visibilitySubject.next(!currentState);
    }
}