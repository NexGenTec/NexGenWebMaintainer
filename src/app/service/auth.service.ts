import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('isLoggedIn'));
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthenticationService
  ) {
    this.afAuth.onAuthStateChanged(user => {
      const isAuthenticated = !!user;
      this.isLoggedInSubject.next(isAuthenticated);
      if (isAuthenticated) {
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        localStorage.removeItem('isLoggedIn');
      }
    });
  }

  async login(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    localStorage.setItem('isLoggedIn', 'true');
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    localStorage.removeItem('isLoggedIn');
    this.authService.clearCurrentUser();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  async getCurrentUser() {
    return this.afAuth.currentUser;
  }
}
