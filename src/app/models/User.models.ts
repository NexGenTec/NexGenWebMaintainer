export interface User {
    id: string;
    name: string;
    email: string;
    role?: 'admin' | 'user'; // Tipos de roles
    phoneNumber?: string;
    address?: Address;
    createdAt?: Date;
    avatarUrl?: string;
    status?: 'active' | 'inactive' | 'suspended'; // Estado de usuario
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}
