import { Component, OnInit } from '@angular/core';
import { GeoPoint, Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Members } from 'src/app/models/Members.model';
import { MembersService } from 'src/app/service/members.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.page.html',
  styleUrls: ['./add-members.page.scss'],
})
export class AddMembersPage{
  memberForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private membersService: MembersService) {
    this.memberForm = this.fb.group({
      name: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      isActive: [false, [Validators.required]],
      role: ['miembros', [Validators.required]],
      creationDate: [Timestamp.now(), [Validators.required]],
      address: this.fb.group({
        latitude: [0, [Validators.required]],
        longitude: [0, [Validators.required]]
      }),
      memberNumber: [Math.floor(Math.random() * 1000000), [Validators.required]]
    });
  }

  onSubmit() {
    if (this.memberForm.valid) {
      const formData: Members = {
        ...this.memberForm.value,
        address: new GeoPoint(
          this.memberForm.value.address.latitude,
          this.memberForm.value.address.longitude
        ),
        creationDate: Timestamp.now() // Se asegura de tomar la fecha actual
      };

      this.membersService.addMember(formData).then(() => {
        console.log('Miembro agregado exitosamente');
        this.memberForm.reset(); // Resetea el formulario después de agregar el miembro
      }).catch(error => {
        console.error('Error al agregar el miembro:', error);
      });
    }
  }
}
