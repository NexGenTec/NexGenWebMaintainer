import { Roles } from '../app/models/Roles.model';

export const RolePermissions = {
  [Roles.Guest]: {
    canViewContent: true,
    canEditContent: false,
    canDeleteContent: false,
    canManageUsers: false,
  },
  [Roles.User]: {
    canViewContent: true,
    canEditContent: true,
    canDeleteContent: false,
    canManageUsers: false,
  },
  [Roles.Editor]: {
    canViewContent: true,
    canEditContent: true,
    canDeleteContent: true,
    canManageUsers: false,
  },
  [Roles.Moderator]: {
    canViewContent: true,
    canEditContent: true,
    canDeleteContent: true,
    canManageUsers: false,
    canModerateContent: true,
  },
  [Roles.Manager]: {
    canViewContent: true,
    canEditContent: true,
    canDeleteContent: true,
    canManageUsers: true,
    canViewReports: true,
  },
  [Roles.Admin]: {
    canViewContent: true,
    canEditContent: true,
    canDeleteContent: true,
    canManageUsers: true,
    canViewReports: true,
    canManageSettings: true,
  },
  [Roles.SuperAdmin]: {
    canViewContent: true,
    canEditContent: true,
    canDeleteContent: true,
    canManageUsers: true,
    canViewReports: true,
    canManageSettings: true,
    hasFullAccess: true,
  },
};
