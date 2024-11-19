import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from '../directives/has-role.directive'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [
    HasRoleDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HasRoleDirective,
  ],
})
export class SharedModule {}
