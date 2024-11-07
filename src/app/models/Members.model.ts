export interface Members {
  id: string; // ID único generado automáticamente por Firestore para identificar el documento
  name: string; // Nombre completo del miembro
  photo?: string; // URL de la foto de perfil del miembro
  email: string; // Dirección de correo electrónico del miembro
  isActive: boolean; // Estado activo del miembro, indica si el miembro está activo o inactivo
  role: 'miembros' | 'admins'; // Rol del miembro, puede ser 'miembros' para usuarios regulares o 'admins' para administradores
  // creationDate?: Timestamp; // Fecha de creación del miembro en Firestore, de tipo Timestamp
  address: string; // Dirección del miembro, representada como coordenadas de latitud y longitud en un GeoPoint
  memberNumber: number; // Número único asignado al miembro para identificarlo en el sistema
}
