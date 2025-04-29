import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [{
    path: '', pathMatch: 'full',
    loadComponent: () => import('./pages/products-list/products-list.component')
        .then(m => m.ProductsListComponent)
}, {
    path: 'cart', component: CartComponent
}];
