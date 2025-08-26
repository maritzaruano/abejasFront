import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartCheckoutService } from '../../services/shared/cart.checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'] // 👈 también era styleUrls (plural)
})
export class CartComponent {
  isOpen = false;
  private subscription: Subscription | undefined;

  constructor(
    private cartService: CartCheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.cartService.visibility$.subscribe(
      visible => this.isOpen = visible
    );
  }

  close(): void {
    this.cartService.hide();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  irAlCheckout(): void {
    this.cartService.hide();
    this.router.navigate(['/checkout']);
  }
}
