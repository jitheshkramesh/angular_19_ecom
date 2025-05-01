import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Router } from 'express';

export interface User {
    email: string,
    password: string,
    name?: string,
    image?: string,
}

type AppState = { user: User | undefined };
const initialState: AppState = { user: undefined };

export const AppStore = signalStore({ providedIn: "root" }, withState(initialState),
    withMethods((store, router = inject(Router)) => ({
        login: () => {
            //call the login function
            console.log('login called');
            patchState(store, {
                user: {
                    email: 'test@test.com',
                    password: '123456'
                    // , name: 'test',
                    // image: 'https://picsum.photos/200/300'
                }
            }), router.navigate(['/dashboard']);
        }, logout: () => {
            //call the logout function  
            patchState(store, { user: undefined });
            router.navigate(['/login']);
        }
    })));

