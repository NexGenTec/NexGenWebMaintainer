import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Members } from 'src/app/models/Members.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  constructor(private authService: AuthService,private router: Router) {}

  searchTerm = '';
  segmentValue: string = 'miembros';
  users: Members[] = [
    { name: 'George Lindeof', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', mobile: '+1 234 56 78', email: 'george@domain.com', isActive: true, role: 'miembros' },
    { name: 'Alice Johnson', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', mobile: '+1 234 56 79', email: 'alice@domain.com', isActive: true, role: 'miembros' },
    { name: 'Bob Smith', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', mobile: '+1 234 56 80', email: 'bob@domain.com', isActive: true, role: 'miembros' },
    { name: 'Catherine Zeta', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', mobile: '+1 234 56 81', email: 'catherine@domain.com', isActive: true, role: 'miembros' },
    { name: 'Daniel Craig', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', mobile: '+1 234 56 82', email: 'daniel@domain.com', isActive: true, role: 'miembros' },
    { name: 'Eva Green', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', mobile: '+1 234 56 83', email: 'eva@domain.com', isActive: true, role: 'miembros' },
    { name: 'Frank Underwood', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', mobile: '+1 234 56 84', email: 'frank@domain.com', isActive: true, role: 'miembros' },
    { name: 'Grace Kelly', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', mobile: '+1 234 56 85', email: 'grace@domain.com', isActive: true, role: 'miembros' },
    { name: 'Hugh Jackman', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', mobile: '+1 234 56 86', email: 'hugh@domain.com', isActive: true, role: 'miembros' },
    { name: 'Isla Fisher', photo: 'https://ionicframework.com/docs/img/demos/avatar.svg', mobile: '+1 234 56 87', email: 'isla@domain.com', isActive: true, role: 'miembros' },
    { name: 'Jack Ryan', photo: 'https://lh3.googleusercontent.com/a/ACg8ocJ1kC00P6IWGLLUMFnamSYZ_l402ptDozectaPc4QAC1yyLIJk=s288-c-no', mobile: '+1 234 56 88', email: 'jack@domain.com', isActive: true, role: 'admins' },
    { name: 'Kate Winslet', photo: 'https://lh3.googleusercontent.com/a/ACg8ocJ1kC00P6IWGLLUMFnamSYZ_l402ptDozectaPc4QAC1yyLIJk=s288-c-no', mobile: '+1 234 56 89', email: 'kate@domain.com', isActive: true, role: 'admins' },
    { name: 'Leonardo DiCaprio', photo: 'https://lh3.googleusercontent.com/a/ACg8ocJ1kC00P6IWGLLUMFnamSYZ_l402ptDozectaPc4QAC1yyLIJk=s288-c-no', mobile: '+1 234 56 90', email: 'leo@domain.com', isActive: true, role: 'admins' },
  ];
  filteredUsers: Members[] = [];

  ngOnInit() {
    this.filterUsers();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.role === this.segmentValue &&
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
    this.filterUsers(); // Re-filter users when segment changes
  }

  addNewUser() {
    // Add new user logic
  }

  importMembers() {
    // Import members logic
  }

  exportMembers() {
    // Export members logic
  }

  openFilters() {
    // Open filters logic
  }

  editUser(user: Members) {
    // Edit user logic
  }

  deleteUser(user: Members) {
    // Delete user logic
  }

  loginAsUser(user: Members) {
    // Login as user logic
  }

}
