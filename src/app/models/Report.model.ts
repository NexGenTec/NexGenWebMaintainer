export interface Report {
    id: string;
    title: string;
    description: string;
    createdDate: Date;
    authorId: string;
    status: 'draft' | 'published' | 'archived';
    version: number;
    accessLevel: 'public' | 'private' | 'restricted';
    data: any;
    modifiedAt?: Date;
    tags?: string[];
    viewers: string[]; // Lista de IDs de usuarios que han visto el reporte
}
  