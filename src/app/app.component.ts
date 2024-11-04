import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  items = [
    { title: 'Home', link: '/home' },
    { title: 'Users', link: '/users' },
    { title: 'Projects', link: '/projects' },
    { title: 'Tasks', link: '/tasks' },
    { title: 'Logs', link: '/logs' },
    { title: 'Group Chat', link: '/group-chat' },
    { title: 'Reports', link: '/reports' },
    { title: 'Control Panel', link: '/control-panel' },
  ];  
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

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const movedItem = this.items.splice(ev.detail.from, 1)[0];
    this.items.splice(ev.detail.to, 0, movedItem);
    ev.detail.complete();
  }  

  logout() {
    this.authService.logout();
  }
}
