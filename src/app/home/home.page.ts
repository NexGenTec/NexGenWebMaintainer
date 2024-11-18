import { Component } from '@angular/core';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { Roles } from '../models/Roles.model';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authenticationService: AuthenticationService
  ) {}

  openMenu() {
    this.menu.open();
  }

  canAccessUsers(): boolean {
    const allowedRoles = [
      Roles.Editor,
      Roles.Moderator,
      Roles.Manager,
      Roles.Admin,
      Roles.SuperAdmin
    ];
    const currentRole = this.authenticationService.getUserRole();
    return allowedRoles.includes(currentRole!);
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesion?',
      mode:'ios',
      message: 'Esta seguro de cerrar la sesion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('User cancelled logout');
          }
        },
        {
          text: 'Salir',
          role:'destructive',
          handler: async () => {
            const loading = await this.loadingController.create({
              mode:'ios',
              message: 'Cerrando sesion...',
              duration: 1500,
            });
            await loading.present();
            setTimeout(() => {
              this.authService.logout()
                .then(() => {
                  console.log('Logged out successfully');
                })
                .catch(error => {
                  console.error('Error during logout:', error);
                })
                .finally(() => {
                  loading.dismiss();
                });
            }, 3000);
          }
        }
      ]
    });

    await alert.present();
  }

}
