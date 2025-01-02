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
        console.log(isAuthenticated)
        // Verificar si estamos en el navegador antes de acceder a localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
          // Solo accedemos a localStorage si está disponible en el navegador
          if (localStorage.getItem('login') || localStorage.getItem('login') !== undefined) {
            isAuthenticated = true;
          }
        }

        console.log(typeof window !== 'undefined' && window.localStorage)

        if (!isAuthenticated) {
            this.router.navigate(['/login']);

            return false;
        }

        return true; 
    }

}