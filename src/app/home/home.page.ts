import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Roles } from '../models/Roles.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public Roles = Roles;

  constructor(
    private menu: MenuController,
  ) {}

  openMenu() {
    this.menu.open();
  }
}
