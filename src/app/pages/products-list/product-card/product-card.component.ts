import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../../products/products.module';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  
product = input.required<Product>();
cartService=inject(CartService);

}
