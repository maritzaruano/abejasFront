import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
        
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      let isAuthenticated = false;
    
      // Verificar si estamos en el navegador antes de acceder a localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        // Solo accedemos a localStorage si está disponible en el navegador
        const loginItem = localStorage.getItem('login');
        
        // Verificar si el valor 'login' está presente en localStorage
        if (loginItem !== null && loginItem !== undefined) {
          isAuthenticated = true;
        }
      }
    
      if (!isAuthenticated) {
        // Si no está autenticado, redirigimos al login
        this.router.navigate(['/login']);
        return false;
      }
    
      // Si está autenticado, permitimos el acceso
      return true;
    }

}