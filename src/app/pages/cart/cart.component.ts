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
    // Load cart from local storage if available
    const storedCart = this.cartService.cart();
    if (storedCart.length > 0) {
      this.cartService.cart.set(storedCart);
    } else {
      console.log('No items in cart');
    }
    // Set up a subscription to update the total price whenever the cart changes  
  }
  
  ngOnDestroy() {
    this.cartService.cart().forEach(product => this.cartService.setCart(product));
    console.log('Cart saved to local storage:', this.cartService.cart());
    this.cartService.cart.set([]);
  }
}