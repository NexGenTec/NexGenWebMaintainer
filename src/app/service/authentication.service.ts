import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser: User | null = null;

  constructor(private firestore: AngularFirestore) {}

  async getUserById(userId: string) {
    return this.firestore.collection('users').doc(userId).ref.get();
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const storedUser = sessionStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  getCurrentUserFromStorage(): User | null {
    const storedUser = sessionStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  clearCurrentUser() {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
  }
}
