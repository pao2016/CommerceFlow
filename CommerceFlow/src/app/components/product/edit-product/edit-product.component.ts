import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStateService } from '../../../services/product-state.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product = new Product(); // Aseguramos que nunca sea null para evitar el error
  productId: number | null = null; // ID del producto desde la URL

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productStateService: ProductStateService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id; // Convertir ID a número
      this.productStateService.getProductById(this.productId).subscribe({
        next: (product) => {
          if (product) {
            this.product = product; // Asignar el producto recibido
            console.log('Producto recibido para editar:', product);
          } else {
            console.error(`Producto con ID ${this.productId} no encontrado.`);
            this.router.navigate(['/products']); // Redirigir si no se encuentra
          }
        },
        error: (err) => {
          console.error(`Error al obtener el producto con ID ${this.productId}:`, err);
          this.router.navigate(['/products']); // Redirigir en caso de error
        }
      });
    } else {
      console.error('ID del producto no válido en la URL.');
      this.router.navigate(['/products']); // Redirigir si no hay ID
    }
  }
}
