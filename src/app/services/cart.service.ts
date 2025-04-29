import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Product } from '../products/products.module';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService { 
  // Removed duplicate constructor

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('cartitems');
      this.cart.set(stored ? JSON.parse(stored) : null);

      effect(() => {
        const current = this.cart();
        if (current) {
          localStorage.setItem('cartitems', JSON.stringify(current));
        } else {
          localStorage.removeItem('cartitems');
        }
      });
    }
  }

  private readonly localStorageKey = 'cart';

  getTotalPrice() {
    //total price of the cart
    return this.cart().reduce((total, product) => total + product.price, 0);
  }

  cart = signal<Product[]>([]);

  private loadCart(): Product[] | null {
    const stored = localStorage.getItem(this.localStorageKey);
    return stored ? JSON.parse(stored) : null;
  }

  setCart(cart: Product[] | null) {
   //set the cart in local storage
    if (cart) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(cart));
    }
  }

  getCart() {
    //get the cart from local storage 
    const storedCart = this.loadCart();
    if (storedCart) {
      this.cart.set(storedCart);
    } else {
      this.cart.set([]);
    }
    return this.cart; 
  }

  addToCart(product: Product) {
    this.cart.update((cart) => [...cart, product]);
  }

  removeFromCart(productId: number) {
    this.cart.update((cart) => cart.filter((product) => product.id !== productId));
  }
 
}
