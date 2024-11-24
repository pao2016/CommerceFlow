import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order ';

@Injectable({
  providedIn: 'root'
})
export class OrderStateService {
  private apiUrl = 'http://localhost:3001/orders'; // URL del backend para órdenes

  // Estado centralizado
  private ordersSubject = new BehaviorSubject<Order[]>([]); // Lista de órdenes
  private selectedOrderSubject = new BehaviorSubject<Order | null>(null); // Orden seleccionada

  constructor(private http: HttpClient) { }

  // Obtener la lista de órdenes como observable
  getOrders$(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  // Obtener la orden seleccionada como observable
  getSelectedOrder$(): Observable<Order | null> {
    return this.selectedOrderSubject.asObservable();
  }

  // Cargar órdenes desde el backend y actualizar el estado
  loadOrders(): void {
    this.http.get<Order[]>(this.apiUrl).subscribe((orders) => {
      this.ordersSubject.next(orders); // Actualiza el estado
    });
  }

  // Guardar una orden (crear o actualizar)
  saveOrder(order: Order): void {
    if (order.id) {
      // Si la orden tiene ID, se actualiza
      this.http.put(`${this.apiUrl}/${order.id}`, order).subscribe(() => {
        this.loadOrders(); // Recargar las órdenes
      });
    } else {
      // Si no tiene ID, se crea una nueva
      this.http.post<Order>(this.apiUrl, order).subscribe(() => {
        this.loadOrders(); // Recargar las órdenes
      });
    }
  }

  // Seleccionar una orden
  selectOrder(order: Order): void {
    this.selectedOrderSubject.next(order);
  }

  // Deseleccionar la orden
  clearSelectedOrder(): void {
    this.selectedOrderSubject.next(null);
  }

  // Eliminar una orden
  deleteOrder(orderId: number): void {
    this.http.delete(`${this.apiUrl}/${orderId}`).subscribe(() => {
      this.loadOrders(); // Recargar las órdenes
    });
  }

  // Añadir una nueva orden
  addOrder(order: Order): void {
    this.http.post<Order>(this.apiUrl, order).subscribe((newOrder) => {
      // Actualizar el estado con la nueva orden
      const updatedOrders = [...this.ordersSubject.getValue(), newOrder];
      this.ordersSubject.next(updatedOrders);
    });
  }

  // Obtener una orden por ID
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }
}
