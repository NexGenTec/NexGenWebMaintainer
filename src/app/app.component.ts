import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AlertController, ItemReorderEventDetail, LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  items = [
    { title: 'Users', link: '/users' },
    { title: 'Projects', link: '/projects' },
    { title: 'Tasks', link: '/tasks' },
    { title: 'Logs', link: '/logs' },
    { title: 'Group Chat', link: '/group-chat' },
    { title: 'Reports', link: '/reports' },
    { title: 'Products', link: '/products' },
    { title: 'Control Panel', link: '/control-panel' },
  ];  
  isLoggedIn = false;
  userName: string = '';
  userEmail: string = '';
  userRole: string = '';

  constructor(
    private authService: AuthService,
    private menu: MenuController,
    private alertController:AlertController,
    private loadingController:LoadingController )  {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
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
  
  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesion?',
      mode: 'ios',
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
          role: 'destructive',
          handler: async () => {
            // Cerrar el menú inmediatamente después de confirmar la acción
            this.menu.close();
  
            const loading = await this.loadingController.create({
              mode: 'ios',
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
