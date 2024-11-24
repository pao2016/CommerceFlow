import { Component, OnInit } from '@angular/core';
import { OrderStateService } from 'src/app/services/order-state.service';
import { Order } from '../../../models/Order ';

@Component({
  selector: 'app-index-order',
  templateUrl: './index-order.component.html',
  styleUrls: ['./index-order.component.css']
})
export class IndexOrderComponent implements OnInit {
  orders: Order[] = []; // Lista de órdenes
  totalRecords: number = 0; // Total de registros (si es necesario para paginación)
  loading: boolean = true; // Indicador de carga

  constructor(private orderStateService: OrderStateService) { }

  ngOnInit(): void {
    this.orderStateService.loadOrders(); // Carga inicial de órdenes
    this.loadOrders();
  }

  /**
   * Carga las órdenes desde el servicio.
   */
  loadOrders(): void {
    this.orderStateService.getOrders$().subscribe((data) => {
      this.orders = data; // Actualiza la lista de órdenes
      console.log("order", this.orders);
      this.loading = false; // Detiene el indicador de carga
    });
  }



  /**
   * Acción para editar una orden existente.
   * @param order Orden seleccionada
   */
  onEditOrder(order: Order): void {
    console.log('Edit order action:', order);
    // Maneja la lógica para editar la orden seleccionada
    this.orderStateService.selectOrder(order); // Selecciona la orden en el estado
  }

  /**
   * Acción para eliminar una orden existente.
   * @param order Orden seleccionada
   */
  onDeleteOrder(order: Order): void {
    if (confirm(`¿Está seguro de que desea eliminar la orden #${order.id}?`)) {
      this.orderStateService.deleteOrder(order.id!); // Llama al servicio para eliminar
    }
  }
}
