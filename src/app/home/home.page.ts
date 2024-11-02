import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menu: MenuController,
    private authService: AuthService
  ) {}

  openMenu() {
    this.menu.open();
  }

  logout() {
    this.authService.logout()
      .then(() => {
        console.log('Logged out successfully');
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  }

}
