import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductStateService } from 'src/app/services/product-state.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Input() isNew: boolean = true; // Indica si es creación o edición
  @Input() product: Product = new Product(); // Producto actual
  @Output() save = new EventEmitter<Product>(); // Emite el producto al guardar

  public formMessages: any[] = [];

  constructor(
    private productStateService: ProductStateService,
    private messageService: MessageService,
    private router: Router
  ) { }

  saveProduct() {
    console.log("El objeto a guardar:", this.product);

    if (this.isNew) {
      this.productStateService.addProduct(this.product); // Agrega el producto
    } else {
      // Implementa lógica de actualización si es necesario
      console.warn("Actualización no implementada.");
    }

    // Mostrar mensaje de éxito
    this.showSuccessMessage();

    // Redirigir después de un tiempo
    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 3000);
  }

  showSuccessMessage() {
    this.formMessages = [
      {
        severity: 'success',
        summary: this.isNew ? 'Producto Guardado' : 'Producto Actualizado',
        detail: this.isNew
          ? `El producto "${this.product.name}" se ha registrado exitosamente.`
          : `El producto "${this.product.name}" se ha actualizado exitosamente.`
      }
    ];

    // Limpia los mensajes después de 3 segundos
    setTimeout(() => {
      this.formMessages = [];
    }, 3000);
  }
}
