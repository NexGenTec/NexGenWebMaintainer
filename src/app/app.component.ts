import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  userName: string = '';
  userEmail: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.authService.getCurrentUser().then((user) => {
          if (user) {
            this.userEmail = user.email || '';
            this.userName = this.getDisplayNameFromEmail(this.userEmail);
          }
        });
      } else {
        this.userName = '';
        this.userEmail = '';
      }
    });
  }

  private getDisplayNameFromEmail(email: string): string {
    const namePart = email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase();
  }

  logout() {
    this.authService.logout();
  }
}
