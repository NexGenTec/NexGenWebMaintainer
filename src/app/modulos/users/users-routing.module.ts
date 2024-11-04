import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  },  {
    path: 'add-members',
    loadChildren: () => import('./add-members/add-members.module').then( m => m.AddMembersPageModule)
  },
  {
    path: 'member-profile',
    loadChildren: () => import('./member-profile/member-profile.module').then( m => m.MemberProfilePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
