import { Injectable,signal } from '@angular/core';
import { Product } from '../products/products.module'; 
import { signalStore, withState } from '@ngrx/signals';
import { BehaviorSubject } from 'rxjs';
const secretKey = 'my-secret-keyword';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CartService {  

  private _cart = signal<Product[] | [null]>(this.getCartItems());
  readonly carts = this._cart;

    private getCartItems(): Product[] | [null] {
       
      console.log('getCartItems called');
        if (typeof window !== 'undefined') { 
          const encryptedCart = localStorage.getItem('cart');
          console.log('getCartItems encryptedCart:', encryptedCart);
          if (encryptedCart) {
          try {
            console.log('getCartItems encryptedCart 2:', encryptedCart);
            const bytes = CryptoJS.AES.decrypt(encryptedCart, secretKey);
            console.log('getCartItems encryptedCart 3:', encryptedCart);
            const decryptedItems = bytes.toString(CryptoJS.enc.Utf8);
            console.log('getCartItems encryptedCart 4:', encryptedCart);
            console.log('getCartItems encryptedCart 5:', (decryptedItems));
            console.log('setCartItems:', JSON.parse(decryptedItems));
            localStorage.setItem('cartitems', JSON.parse(decryptedItems));
           
            return decryptedItems ? JSON.parse(decryptedItems) : [null];
          } catch (error) {
            return [null]; // Handle invalid decryption
          }
        }
        return [null];
        }
        return [null]; // Return null if SSR
      }
   
  getTotalPrice() {
    this.getCartItems();
    //total price of the cart
    return this.getCartItems().reduce((total, product) => total + (product ? product.price : 0), 0);
  }

  cart = signal<Product[]>([]); 

  setCart(product: Product) {
    this.cart.update((cart) => [...cart, product]);
    if (typeof window !== 'undefined') {
      const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(this.cart), secretKey).toString();
      localStorage.setItem('cart', encryptedUser);
    }
  }

  addToCart(product: Product) {
    this.cart.update((cart) => [...cart, product]);
    if (typeof window !== 'undefined') {
         const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(this.cart), secretKey).toString();
         localStorage.setItem('cart', encryptedUser);
       }
  }

  removeFromCart(productId: number) {
    this.cart.update((cart) => cart.filter((product) => product.id !== productId));
    if (typeof window !== 'undefined') {
      const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(this.cart), secretKey).toString();
      localStorage.setItem('cart', encryptedUser);
    }
  }

  //getCart from signal

}
