import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('../app/auth/login//login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./auth/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then( m => m.UsersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module').then( m => m.ProductsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'control-panel',
    loadChildren: () => import('./modules/control-panel/control-panel.module').then( m => m.ControlPanelPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    loadChildren: () => import('./modules/projects/projects.module').then( m => m.ProjectsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    loadChildren: () => import('./modules/tasks/tasks.module').then( m => m.TasksPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'logs',
    loadChildren: () => import('./modules/logs/logs.module').then( m => m.LogsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'group-chat',
    loadChildren: () => import('./modules/group-chat/group-chat.module').then( m => m.GroupChatPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () => import('./modules/reports/reports.module').then( m => m.ReportsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
