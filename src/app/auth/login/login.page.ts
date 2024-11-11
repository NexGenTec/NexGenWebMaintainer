import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService } from 'src/app/service/toast.service';
import { User } from 'src/app/models/User.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = 'nexgentechnologies2024@gmail.com';
  password: string = 'd1#TvpB59[%0';

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private userService: AuthenticationService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  async onLogin() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      mode: 'ios',
      duration: 3000,
      spinner: 'crescent',
    });
    await loading.present();

    try {
      await this.authService.login(this.email, this.password);
      const firebaseUser = await this.authService.getCurrentUser();

      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || ''
        };
        this.userService.setCurrentUser(user);
        this.toastService.presentToast('Inicio de sesión exitoso', 3000, 'bottom', 'success');
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      this.toastService.presentToast('Error al iniciar sesión', 3000, 'bottom', 'danger');
    } finally {
      loading.dismiss();
    }
  }
}
