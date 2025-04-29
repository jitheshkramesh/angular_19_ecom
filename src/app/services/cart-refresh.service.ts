import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Product } from '../products/products.module';

@Injectable({
  providedIn: 'root'
})
export class CartRefreshService {
 
    // Removed duplicate constructor
  
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
      if (isPlatformBrowser(this.platformId)) {
        // const stored = localStorage.getItem('cartitems');
        let stored = null;
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          // Safe to use localStorage
          stored = localStorage.getItem(this.localStorageKey);
        }
        this.cartre.set(stored ? JSON.parse(stored) : null);
  
        effect(() => {
          const current = this.cartre();
          if (current) {
            localStorage.setItem(this.localStorageKey, JSON.stringify(current));
          } else {
            localStorage.removeItem(this.localStorageKey);
          }
        });
      }
    }
  
    private readonly localStorageKey = 'cart';
  
    getTotalPrice() {
      //total price of the cart
      return this.cartre().reduce((total, product) => total + product.price, 0);
    }
  
    cartre = signal<Product[]>([]);
  
    private loadCart(): Product[] | null {
      let stored = null;
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        // Safe to use localStorage
        stored = localStorage.getItem(this.localStorageKey);
      }
      return stored ? JSON.parse(stored) : null;
    }
  
    setCart(cart: Product[] | null) {
      //set the cart in local storage
      if (cart) {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(this.localStorageKey, JSON.stringify(cart));
        }
      }
    }
  
    getCart() {
      //get the cart from local storage 
      const storedCart = this.loadCart();
      if (storedCart) {
        this.cartre.set(storedCart);
      } else {
        this.cartre.set([]);
      }
      return this.cartre;
    }
  
    addToCart(product: Product) {
      this.cartre.update((cart) => [...cart, product]);
    }
  
    removeFromCart(productId: number) {
      this.cartre.update((cart) => cart.filter((product) => product.id !== productId));
    }
  
  }
