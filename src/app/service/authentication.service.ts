import { Injectable } from '@angular/core';
import { User } from '../models/User.models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private User: User | null = null;

  constructor() {
    const storedUser = localStorage.getItem('User');
    this.User = storedUser ? JSON.parse(storedUser) : null;
  }

  setCurrentUser(user: User) {
    this.User = user;
    localStorage.setItem('User', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    return this.User;
  }

  clearCurrentUser() {
    this.User = null;
    localStorage.removeItem('User');
  }
}
