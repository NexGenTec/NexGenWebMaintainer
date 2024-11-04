import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Members } from 'src/app/models/Members.model';
import { AuthService } from 'src/app/service/auth.service';
import { AddMembersPageModule } from './add-members/add-members.module';
import { AddMembersPage } from './add-members/add-members.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage  {

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController) {}

  searchTerm = '';
  segmentValue: string = 'miembros';
  // users: Members[] = [
  //   { name: 'George Lindeof', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', email: 'george@domain.com', isActive: true, role: 'miembros' },
  //   { name: 'Alice Johnson', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', email: 'alice@domain.com', isActive: true, role: 'miembros' },
  //   { name: 'Bob Smith', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', email: 'bob@domain.com', isActive: true, role: 'miembros' },
  //   { name: 'Catherine Zeta', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', email: 'catherine@domain.com', isActive: true, role: 'miembros' },
  //   { name: 'Daniel Craig', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', email: 'daniel@domain.com', isActive: true, role: 'miembros' },
  //   { name: 'Eva Green', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', email: 'eva@domain.com', isActive: true, role: 'miembros' },
  //   { name: 'Frank Underwood', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', email: 'frank@domain.com', isActive: true, role: 'miembros' },
  //   { name: 'Grace Kelly', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', email: 'grace@domain.com', isActive: true, role: 'miembros' },
  //   { name: 'Hugh Jackman', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', email: 'hugh@domain.com', isActive: true, role: 'miembros' },
  //   { name: 'Isla Fisher', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', email: 'isla@domain.com', isActive: true, role: 'miembros' },
  //   { name: 'Jack Ryan', photo: 'https://lh3.googleusercontent.com/a/ACg8ocJ1kC00P6IWGLLUMFnamSYZ_l402ptDozectaPc4QAC1yyLIJk=s288-c-no', email: 'jack@domain.com', isActive: true, role: 'admins' },
  //   { name: 'Kate Winslet', photo: 'https://lh3.googleusercontent.com/a/ACg8ocJ1kC00P6IWGLLUMFnamSYZ_l402ptDozectaPc4QAC1yyLIJk=s288-c-no', email: 'kate@domain.com', isActive: true, role: 'admins' },
  //   { name: 'Leonardo DiCaprio', photo: 'https://lh3.googleusercontent.com/a/ACg8ocJ1kC00P6IWGLLUMFnamSYZ_l402ptDozectaPc4QAC1yyLIJk=s288-c-no', email: 'leo@domain.com', isActive: true, role: 'admins' },
  // ];
  
  filteredUsers: Members[] = [];

  // ngOnInit() {
  //   this.filterUsers();
  // }

  // filterUsers() {
  //   this.filteredUsers = this.users.filter(user =>
  //     user.role === this.segmentValue &&
  //     user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

  // segmentChanged(event: any) {
  //   this.segmentValue = event.detail.value;
  //   this.filterUsers();
  // }

  async addNewUser() {
    const modal = await this.modalController.create({
      component: AddMembersPage,
    });
    return await modal.present();
  }

  importMembers() {

  }

  exportMembers() {

  }

  openFilters(event: CustomEvent) {
    const selectedValue = event.detail.value;
    console.log('Filtro seleccionado:', selectedValue);
  }

  editUser(user: Members) {

  }

  deleteUser(user: Members) {

  }

  loginAsUser(user: Members) {
    
  }

}
