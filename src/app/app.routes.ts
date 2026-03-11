import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [{
    path: '', pathMatch: 'full',
    redirectTo: 'login'
}, 
{
    path: 'movies-list',
    loadComponent: () => import('./pages/moviesearch/moviesearch.component')
        .then(m => m.MoviesearchComponent)
},
{
    path: 'products-list',
    loadComponent: () => import('./pages/products-list/products-list.component')
        .then(m => m.ProductsListComponent)
}, {
    path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
},
{
    path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
},
{
    path: 'user-posts', loadComponent: () => import('./user-posts/user-posts.component').then(m => m.UserPostsComponent)
},
{
    path: 'signal-search', loadComponent: () => import('./pages/signal-search/signal-search.component').then(m => m.SignalSearchComponent)
},
{
    path: 'subscribe-form', loadComponent: () => import('./pages/subscribe-form/subscribe-form.component').then(m => m.SubscribeFormComponent)
},
{
    path: 'content', loadComponent: () => import('./shared/components/layout/layout.component')
        .then(m => m.LayoutComponent), children: [
            {
                path: '', pathMatch: 'full',
                loadComponent: () => import('./components/dashboard/dashboard.component')
                    .then(m => m.DashboardComponent)
            }, {
                path: 'features',
                loadComponent: () => import('./components/features/features.component')
                    .then(m => m.FeaturesComponent)
            },]
}, {
    path: '**', component: LoginComponent
},
];
export const APP_ROUTES = routes;