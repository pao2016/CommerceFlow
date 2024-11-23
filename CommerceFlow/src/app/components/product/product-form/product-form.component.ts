import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product = {
    id: null,
    name: '',
    price: null,
    stock: null
  };
  constructor() { }

  ngOnInit(): void {
  }
  saveProduct(): void {
    console.log('Producto guardado:', this.product);
    // Aquí puedes implementar la lógica para enviar el producto al backend
  }
}
