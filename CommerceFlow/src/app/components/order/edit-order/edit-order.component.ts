import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../models/Order ';
import { OrderStateService } from '../../../services/order-state.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  order: Order | null = null; // Orden actual para editar
  isEditing: boolean = true; // Modo de edición

  constructor(
    private orderStateService: OrderStateService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  // Cargar la orden para editar basada en el ID de la ruta
  loadOrder(): void {
    const orderId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la URL
    if (orderId) {
      this.orderStateService.getOrderById(+orderId).subscribe(
        (order) => {
          this.order = order;
        },
        (error) => {
          console.error('Error al cargar la orden:', error);
        }
      );
    }
  }

  // Navegar de regreso a la lista de órdenes después de guardar
  onOrderSaved(): void {
    this.router.navigate(['/orders']);
  }
}
