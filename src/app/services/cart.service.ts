import { Injectable,signal } from '@angular/core';
import { Product } from '../products/products.module'; 

@Injectable({
  providedIn: 'root'
})
export class CartService {  

  getTotalPrice() {
    //total price of the cart
    return this.cart().reduce((total, product) => total + product.price, 0);
  }

  cart = signal<Product[]>([]); 

  setCart(product: Product) {
    this.cart.update((cart) => [...cart, product]);
  }

  addToCart(product: Product) {
    this.cart.update((cart) => [...cart, product]);
  }

  removeFromCart(productId: number) {
    this.cart.update((cart) => cart.filter((product) => product.id !== productId));
  }

  //getCart from signal

}
