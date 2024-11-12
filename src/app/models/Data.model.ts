export interface HomeData {
    welcomeMessage: string;
    notifications: Notification[];
    stats: Statistics;
    recentActivities: Activity[];
}

export interface Notification {
    id: string;
    message: string;
    date: Date;
    type: 'info' | 'warning' | 'success'; // Tipo de notificación
    read: boolean; // Estado de lectura de la notificación
}

export interface Statistics {
    totalUsers: number;
    totalProjects: number;
    completedTasks: number;
    pendingTasks: number;
}

export interface Activity {
    id: string;
    description: string;
    userId: string;
    date: Date;
}
