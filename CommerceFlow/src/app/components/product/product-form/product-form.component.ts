import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductStateService } from 'src/app/services/product-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() isNew: boolean = true; // Indica si es creación o edición
  @Input() productData!: Product; // Producto recibido desde el padre
  @Output() save = new EventEmitter<Product>(); // Emite el producto al guardar

  public product: Product = new Product(); // Producto gestionado internamente
  public formMessages: any[] = []; // Mensajes del formulario

  constructor(
    private productStateService: ProductStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.productData) {
      this.product = { ...this.productData }; // Clonar datos iniciales
      console.log('Producto inicializado en el formulario desde OnInit:', this.product);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productData'] && changes['productData'].currentValue) {
      this.product = { ...changes['productData'].currentValue }; // Actualizar el producto si cambian los datos
      console.log('Producto actualizado en el formulario desde OnChanges:', this.product);
    }
  }

  saveProduct(): void {
    console.log('El objeto a guardar:', this.product);

    if (!this.product.name || !this.product.price) {
      this.showErrorMessage('Todos los campos obligatorios deben ser completados.');
      return;
    }

    // Guardar o actualizar el producto
    this.productStateService.saveProduct(this.product);

    // Emitir el evento de guardar
    this.save.emit(this.product);

    // Mostrar mensaje de éxito
    this.showSuccessMessage();

    // Redirigir después de un tiempo
    this.redirectToProducts();
  }

  private showSuccessMessage(): void {
    const summary = this.isNew ? 'Producto Guardado' : 'Producto Actualizado';
    const detail = this.isNew
      ? `El producto "${this.product.name}" se ha registrado exitosamente.`
      : `El producto "${this.product.name}" se ha actualizado exitosamente.`;

    this.formMessages = [
      {
        severity: 'success',
        summary,
        detail
      }
    ];

    this.clearMessagesAfterDelay();
  }

  private showErrorMessage(detail: string): void {
    this.formMessages = [
      {
        severity: 'error',
        summary: 'Error',
        detail
      }
    ];

    this.clearMessagesAfterDelay();
  }

  private clearMessagesAfterDelay(): void {
    setTimeout(() => {
      this.formMessages = [];
    }, 3000);
  }

  private redirectToProducts(): void {
    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 3000);
  }
}
