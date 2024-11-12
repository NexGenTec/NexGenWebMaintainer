import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: Product[] = [
    {
        id: '1',
        name: 'Camiseta Deportiva',
        description: 'Camiseta cómoda y transpirable para hacer deporte. Perfecta para correr, entrenar y más.',
        price: 25,
        category: 'Ropa',
        stock: 50,
        dimensions: { width: 20, height: 30, depth: 5, weight: 0.3 },
        imageUrl: 'https://img.freepik.com/psd-premium/camiseta-blanca-blanco-sobre-fondo-transparente_125540-5436.jpg?semt=ais_hybrid',
        supplier: {
            id: 'sup1',
            name: 'Nike Supplier',
            contactEmail: 'support@nike.com',
            phone: '+123456789'
        },
        variations: [
            { id: 'v1', name: 'Camiseta Roja', price: 25, stock: 20 },
            { id: 'v2', name: 'Camiseta Azul', price: 25, stock: 30 }
        ]
    },
    {
        id: '2',
        name: 'Zapatos de Running',
        description: 'Zapatos ligeros, diseñados para correr largas distancias sin perder comodidad ni estilo.',
        price: 70,
        category: 'Calzado',
        stock: 30,
        dimensions: { width: 10, height: 25, depth: 8, weight: 0.5 },
        imageUrl: 'https://media.istockphoto.com/id/1249496770/es/foto/zapatillas.jpg?s=612x612&w=0&k=20&c=Arj4lfGFm1ifhSbgn-fC3OZjMzTi34xE1EHdT3Dknmo=',
        supplier: {
            id: 'sup2',
            name: 'Adidas Supplier',
            contactEmail: 'support@adidas.com',
            phone: '+987654321'
        },
        variations: [
            { id: 'v3', name: 'Zapatos Negros', price: 70, stock: 15 },
            { id: 'v4', name: 'Zapatos Blancos', price: 70, stock: 15 }
        ]
    },
    {
        id: '3',
        name: 'Mochila Deportiva',
        description: 'Mochila resistente con múltiples compartimentos para guardar tus pertenencias de forma organizada.',
        price: 45,
        category: 'Accesorios',
        stock: 25,
        dimensions: { width: 15, height: 40, depth: 25, weight: 0.7 },
        imageUrl: 'https://img.freepik.com/psd-premium/mochila-gris-aislada-sobre-fondo-transparente-png-psd_888962-1587.jpg',
        supplier: {
            id: 'sup3',
            name: 'Reebok Supplier',
            contactEmail: 'support@reebok.com',
            phone: '+456123789'
        },
        variations: [
            { id: 'v5', name: 'Mochila Gris', price: 45, stock: 10 },
            { id: 'v6', name: 'Mochila Negra', price: 45, stock: 15 }
        ]
    },
    {
        id: '4',
        name: 'Gorra Deportiva',
        description: 'Gorra ligera y ajustable para protegerte del sol mientras practicas deportes al aire libre.',
        price: 18,
        category: 'Accesorios',
        stock: 60,
        dimensions: { width: 20, height: 25, depth: 10, weight: 0.1 },
        imageUrl: 'https://img.freepik.com/psd-gratis/tapa-blanca-blanco-aislada-sobre-fondo-transparente_125540-3849.jpg?semt=ais_hybrid',
        supplier: {
            id: 'sup4',
            name: 'Puma Supplier',
            contactEmail: 'support@puma.com',
            phone: '+654987123'
        },
        variations: [
            { id: 'v7', name: 'Gorra Blanca', price: 18, stock: 30 },
            { id: 'v8', name: 'Gorra Negra', price: 18, stock: 30 }
        ]
    }
  ];

  constructor() {}

  ngOnInit() {
    // Aquí podrías cargar los productos desde un servicio o una base de datos
  }

  editProduct(product:Product){

  }

  deleteProduct(product:Product){

  }

  openAddProductForm(){

  }
}
