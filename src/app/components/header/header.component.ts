import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  cartService = inject(CartService);
  userService = inject(UserService);
  router = inject(Router);

  showButtonClicked() {
    console.log('Header Component Button clicked!');
  }

  Logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
