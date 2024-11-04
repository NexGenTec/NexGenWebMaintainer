import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import { FilterUsersRolPipe } from "../../pipe/filter-users-rol.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule,
    FilterUsersRolPipe
],
  declarations: [UsersPage]
})
export class UsersPageModule {}
