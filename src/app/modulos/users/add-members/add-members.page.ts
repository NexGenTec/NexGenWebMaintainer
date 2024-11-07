import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Members } from 'src/app/models/Members.model';
import { MembersService } from 'src/app/service/members.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.page.html',
  styleUrls: ['./add-members.page.scss'],
})
export class AddMembersPage {
  memberForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  memberNumber: number = Math.floor(Math.random() * 1000000);

  constructor(
    private fb: FormBuilder,
    private membersService: MembersService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {
    this.memberForm = this.fb.group({
      name: ['Juan Pérez', [Validators.required]],
      email: ['juan.perez@example.com', [Validators.required, Validators.email]],
      isActive: [true, [Validators.required]],
      role: ['miembros', [Validators.required]],
      address: ['123 Main St, Ciudad', [Validators.required]]
    });
  }

  async onSubmit() {
    console.log("Submitting form");
    console.log('Form Value:', this.memberForm.value);
    console.log('Is Form Valid:', this.memberForm.valid);

    if (this.memberForm.valid) {
      const loading = await this.loadingController.create({
        mode: 'ios',
        message: 'Agregando miembro...',
        duration: 1500
      });
      await loading.present();

      const memberData: Members = {
        ...this.memberForm.value,
        memberNumber: this.memberNumber
      };

      this.membersService.addMember(memberData).then(async () => {
        console.log('Member added successfully:', memberData);
        await this.showConfirmationAlert(this.memberForm.value.name, this.memberNumber);
        
        this.memberForm.reset();
        this.memberNumber = Math.floor(Math.random() * 1000000);
        await loading.dismiss();
        await this.modalController.dismiss();
      }).catch(async (error) => {
        console.error('Error adding member:', error);
        await loading.dismiss();
      });
    } else {
      console.error('Form is invalid:', this.memberForm.valid);
    } 
  }

  async showConfirmationAlert(name: string, memberNumber: number) {
    const alert = await this.alertController.create({
      header: 'Miembro Guardado',
      mode: 'ios',
      message: `Miembro ${name} guardado con ID: ${memberNumber}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
