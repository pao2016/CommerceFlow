import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/Order ';
import { Product } from 'src/app/models/product';
import { OrderStateService } from 'src/app/services/order-state.service';
import { ProductStateService } from 'src/app/services/product-state.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  order: Order = new Order(); // Orden actual
  formMessages: any[] = []; // Mensajes del formulario
  productOptions: Product[] = []; // Opciones de productos
  selectedProduct: Product | null = null; // Producto seleccionado para agregar

  constructor(
    private orderStateService: OrderStateService,
    private productStateService: ProductStateService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  // Cargar productos disponibles
  loadProducts(): void {
    this.productStateService.loadProducts(); // Cargar productos desde el servicio
    this.productStateService.getProducts$().subscribe(
      (products) => {
        this.productOptions = products; // Actualizar las opciones de productos
      },
      (error) => {
        console.error('Error al cargar productos:', error);
        this.formMessages = [
          { severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos.' }
        ];
      }
    );
  }

  // Guardar la orden
  saveOrder(): void {
    if (this.order.items.length === 0) {
      this.formMessages = [
        { severity: 'warn', summary: 'Advertencia', detail: 'Debe agregar al menos un producto.' }
      ];
      return;
    }

    this.order.totalAmount = this.calculateTotalAmount();

    // Llamar al servicio para guardar la orden
    this.orderStateService.saveOrder(this.order);
    this.formMessages = [
      { severity: 'success', summary: 'Éxito', detail: 'Orden guardada correctamente.' }
    ];
    // this.resetForm();
  }

  // Agregar un producto a la orden
  addProductToOrder(): void {
    if (!this.selectedProduct) return;

    const existingItem = this.order.items.find(
      (item) => item.productId === this.selectedProduct!.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.order.items.push({
        productId: this.selectedProduct.id,
        productName: this.selectedProduct.name,
        quantity: 1,
        price: this.selectedProduct.price
      });
    }

    this.selectedProduct = null; // Reinicia la selección
  }

  // Eliminar un producto de la orden
  removeProductFromOrder(item: any): void {
    this.order.items = this.order.items.filter(
      (product) => product.productId !== item.productId
    );
  }

  // Calcular el monto total de la orden
  calculateTotalAmount(): number {
    return this.order.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Reiniciar el formulario
  resetForm(): void {
    this.order = new Order();
    this.formMessages = [];
  }
}
