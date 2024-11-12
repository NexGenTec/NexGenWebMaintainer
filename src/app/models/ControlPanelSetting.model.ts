export interface ControlPanelSettings {
    id: string;
    settingName: string;
    value: any;
    category: 'UserManagement' | 'SystemSettings' | 'NotificationPreferences';
    updatedBy: string;
    updatedAt: Date;
    permissions: 'admin' | 'user';
}
  