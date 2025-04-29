import { Component, input } from '@angular/core';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';

@Component({
  selector: 'app-cart-order-summary',
  imports: [PrimaryButtonComponent],
  templateUrl: './cart-order-summary.component.html',
  styleUrl: './cart-order-summary.component.scss'
})
export class CartOrderSummaryComponent {
  total=input.required<number>();
}
