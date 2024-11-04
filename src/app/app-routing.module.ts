import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./modulos/users/users.module').then( m => m.UsersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'control-panel',
    loadChildren: () => import('./modulos/control-panel/control-panel.module').then( m => m.ControlPanelPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    loadChildren: () => import('./modulos/projects/projects.module').then( m => m.ProjectsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    loadChildren: () => import('./modulos/tasks/tasks.module').then( m => m.TasksPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'logs',
    loadChildren: () => import('./modulos/logs/logs.module').then( m => m.LogsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'group-chat',
    loadChildren: () => import('./modulos/group-chat/group-chat.module').then( m => m.GroupChatPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () => import('./modulos/reports/reports.module').then( m => m.ReportsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
