import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { CartOrderSummaryComponent } from "./cart-order-summary/cart-order-summary.component";

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CartOrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
  total = this.cartService.getTotalPrice();

  ngOnInit() {
    const user = this.cartService.getCart();
    console.log('User on init:', user);
  }
  ngOnDestroy() {
    this.cartService.setCart(this.cartService.cart());
    console.log('Cart saved to local storage:', this.cartService.cart());
    this.cartService.cart.set([]);
  }
}