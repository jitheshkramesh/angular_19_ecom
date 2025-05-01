import { Component, inject, signal } from '@angular/core';
import { Product } from '../../products/products.module';
import { ProductCardComponent } from './product-card/product-card.component'; 
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
 
  
  async ngOnInit() {  
 
    
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    this.products.set(data.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      imageUrl: item.image,
      stock: item.stock
    })));
  }

  cartService = inject(CartService);
  products = signal<Product[]>([]);
  // Uncomment the following lines to use hardcoded products instead of fetching from API 

  // products = signal<Product[]>([
  //   {
  //     id: 1,
  //     title: 'Product 1',
  //     price: 100,
  //     imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  //     stock: 10
  //   },
  //   {
  //     id: 2,
  //     title: 'Product 2',
  //     price: 200,
  //     imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  //     stock: 5
  //   },
  //   {
  //     id: 3,
  //     title: 'Product 3',
  //     price: 300,
  //     imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  //     stock: 0
  //   }
  // ]);

  addToCart(Product: Product) {
    console.log('Product added to cart:', Product);

  }
}
