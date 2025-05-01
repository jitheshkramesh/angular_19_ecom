import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ProductsListComponent } from "./pages/products-list/products-list.component";
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular_19_ecom';
  cartService = inject(CartService);
  userService = inject(UserService);
   
}
