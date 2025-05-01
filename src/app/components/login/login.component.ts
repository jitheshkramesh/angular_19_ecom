import {  Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true, // Declare this component as standalone
  imports: [
    RouterModule,      // For this.router.navigate()
    RouterLink,        // For <a routerLink="...">
    FormsModule        // For [(ngModel)]
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy { 
  //appStore = Inject(AppStore);
  password = '';
  email = '';  
  
  constructor( private cartService: CartService,private router: Router,private userService: UserService) {}

  ngOnInit() {
    // this.cartService.isLoggedIn.subscribe((isLoggedIn) => {
    //   if (isLoggedIn) {
    //     this.router.navigate(['/products-list']);
    //   }
    // });
  }

  async onLoginTest() {
    console.log('Login clicked', this.email, this.password);

    this.userService.login({ email: this.email, password: this.password });

    if (!this.destroyed) {
      this.router.navigate(['/products-list']);
    }

  }

  private destroyed = false;

  ngOnDestroy() {
    this.destroyed = true;
  }

  // onLogin(event: Event) {
  //   console.log('Login clicked', this.email, this.password);
  //   event.preventDefault();
  //   this.appStore.login(this.email, this.password);
  // }
}
