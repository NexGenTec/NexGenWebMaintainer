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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modulos/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'control-panel',
    loadChildren: () => import('./modulos/control-panel/control-panel.module').then( m => m.ControlPanelPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./modulos/projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./modulos/tasks/tasks.module').then( m => m.TasksPageModule)
  },
  {
    path: 'logs',
    loadChildren: () => import('./modulos/logs/logs.module').then( m => m.LogsPageModule)
  },
  {
    path: 'group-chat',
    loadChildren: () => import('./modulos/group-chat/group-chat.module').then( m => m.GroupChatPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./modulos/reports/reports.module').then( m => m.ReportsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
