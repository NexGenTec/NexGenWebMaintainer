export interface Log {
    id: string;
    userId: string;
    action: string;
    timestamp: Date;
    details?: string;
    actionType: 'create' | 'update' | 'delete' | 'read';
    entityId?: string; // ID de la entidad afectada
    entityType: 'User' | 'Project' | 'Task' | 'Report';
}
