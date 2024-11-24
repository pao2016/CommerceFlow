import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from '../../../models/Order ';
import { Product } from '../../../models/product';
import { OrderStateService } from '../../../services/order-state.service';
import { ProductStateService } from '../../../services/product-state.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnChanges {
  @Input() orderData: Order | null = null; // Orden recibida para edición
  @Input() isEditing: boolean = false; // Indica si está en modo edición
  @Output() formSubmit: EventEmitter<void> = new EventEmitter<void>(); // Evento para indicar que se ha guardado

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderData'] && changes['orderData'].currentValue) {
      console.log('Datos de orden actualizados:', this.orderData);

      // Asegúrate de que todos los campos tengan valores válidos
      this.order = new Order(
        this.orderData?.id ?? null,
        this.orderData?.customerName ?? '',
        this.orderData?.items ?? [],
        this.orderData?.totalAmount ?? 0,
        this.orderData?.status ?? 'Pending',
        this.orderData?.createdAt ?? new Date().toISOString()
      );
    }
  }

  // Cargar productos disponibles
  loadProducts(): void {
    this.productStateService.loadProducts();
    this.productStateService.getProducts$().subscribe(
      (products) => {
        this.productOptions = products;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
        this.formMessages = [
          { severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos.' }
        ];
      }
    );
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

  // Guardar la orden
  saveOrder(): void {
    if (this.order.items.length === 0) {
      this.formMessages = [
        { severity: 'warn', summary: 'Advertencia', detail: 'Debe agregar al menos un producto.' }
      ];
      return;
    }

    this.order.totalAmount = this.calculateTotalAmount();

    this.orderStateService.saveOrder(this.order).subscribe(
      () => {
        this.formMessages = [
          { severity: 'success', summary: 'Éxito', detail: 'Orden guardada correctamente.' }
        ];
        this.formSubmit.emit(); // Emitir evento de guardado
      },
      (error) => {
        console.error('Error al guardar la orden:', error);
        this.formMessages = [
          { severity: 'error', summary: 'Error', detail: 'No se pudo guardar la orden.' }
        ];
      }
    );
  }

  // Calcular el monto total de la orden
  calculateTotalAmount(): number {
    return this.order.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
