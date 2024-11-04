import { Injectable } from '@angular/core';
import { User } from '../models/User.models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser: User | null = null;

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  clearCurrentUser() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
