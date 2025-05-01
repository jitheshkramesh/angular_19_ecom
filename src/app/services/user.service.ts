import { Injectable, signal, effect } from '@angular/core';
import { User } from '../app.store';
import * as CryptoJS from 'crypto-js';
 
const secretKey = 'my-secret-keyword';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private _user = signal<User | null>(this.getStoredUser());
  readonly user = this._user;
  readonly isLoggedIn = signal(!!this._user());

  constructor() {
    effect(() => {
      const current = this._user();
      if (current) {
        this.setStoredUser(current);
      } else {
        this.removeStoredUser();
      }
      this.isLoggedIn.set(!!current);
    });
  }

  login(user: User) {
    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), secretKey).toString();
    localStorage.setItem('user', encryptedUser);
    this._user.set(user);
  }

  logout() {
    this._user.set(null);
  }

  private getStoredUser(): User | null {
   
    if (typeof window !== 'undefined') { 
      const encryptedUser = localStorage.getItem('user');

      if (encryptedUser) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
        const decryptedUser = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedUser ? JSON.parse(decryptedUser) : null;
      } catch (error) {
        return null; // Handle invalid decryption
      }
    }
    return null;
    }
    return null; // Return null if SSR
  }

  private setStoredUser(user: User) {
    if (typeof window !== 'undefined') {
      const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), secretKey).toString();
      localStorage.setItem('user', encryptedUser);
    }
  }

  private removeStoredUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  }
}