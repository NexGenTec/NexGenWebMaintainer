import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/User.models';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  email: string = 'nexgentechnologies2024@gmail.com';
  password: string = 'd1#TvpB59[%0';

  constructor(
    private auth: AngularFireAuth,
    private toastService:ToastService,
    private userService:AuthenticationService,
    private firestore: AngularFirestore,
    private router: Router,
    private loadingController: LoadingController) { }

  async onLogin() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      mode: 'ios',
      duration: 3000,
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(this.email, this.password);
      const firebaseUser = userCredential.user;

      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: ''
        };
        this.firestore.collection<User>('user').doc(user.id).set(user, { merge: true });
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
