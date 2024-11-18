import { Injectable } from '@angular/core';
import { User } from '../models/User.models';
import { Roles } from '../models/Roles.model';
import { RolePermissions } from '../permissions.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser: User | null = null;
  private currentRole: Roles | null = null;

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentRole = this.currentUser ? this.currentUser.role as Roles : Roles.Guest; // Asignar rol
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.currentRole = user.role as Roles; // Establecer el rol al usuario
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getUserRole(): Roles | null {
    return this.currentRole;
  }

  getUserPermissions() {
    return this.currentRole ? RolePermissions[this.currentRole] : {};
  }

  clearCurrentUser() {
    this.currentUser = null;
    this.currentRole = null;
    localStorage.removeItem('currentUser');
  }
}
