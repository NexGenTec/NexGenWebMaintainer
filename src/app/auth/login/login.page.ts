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
    const storedUser = this.userService.getCurrentUserFromStorage();
    if (storedUser) {
      this.userService.setCurrentUser(storedUser);
      this.router.navigate(['/home']);
    }
  }

  async onLogin() {
    const loading = await this.loadingController.create({
      mode: 'ios',
      message: 'Iniciando sesión...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      await this.authService.login(this.email, this.password);
      const firebaseUser = await this.authService.getCurrentUser();

      if (firebaseUser) {
        const userDoc = await this.userService.getUserById(firebaseUser.uid);
        if (userDoc.exists) {
          const existingUser = userDoc.data() as User;

          this.userService.setCurrentUser(existingUser);
          this.toastService.presentToast('Inicio de sesión exitoso', 3000, 'top', 'success');
          this.router.navigate(['/home']);
        } else {
          this.toastService.presentToast('Usuario no registrado en el sistema', 3000, 'top', 'danger');
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      this.toastService.presentToast('Credenciales inválidas o error en el servidor', 3000, 'top', 'danger');
    } finally {
      loading.dismiss();
    }
  }
}