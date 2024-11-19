import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Roles } from '../models/Roles.model';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective {
  private currentUserRole: Roles | null = null;

  constructor(
    private authService: AuthenticationService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    const currentUser = this.authService.getCurrentUser();
    this.currentUserRole = currentUser ? currentUser.role : null;
  }

  @Input() set appHasRole(allowedRoles: Roles[]) {
    if (this.currentUserRole && allowedRoles.includes(this.currentUserRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
