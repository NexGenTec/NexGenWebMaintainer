export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    dimensions?: Dimensions;
    supplier?: Supplier;
    variations: ProductVariation[];
    imageUrl?: string;
}

export interface Dimensions {
    width: number;
    height: number;
    depth: number;
    weight: number;
}

export interface Supplier {
    id: string;
    name: string;
    contactEmail: string;
    phone: string;
}

export interface ProductVariation {
    id: string;
    name: string;
    price: number;
    stock: number;
}
