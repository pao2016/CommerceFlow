import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private baseUrl = 'assets/data/mock-backend.json'; // Ruta al archivo JSON

  constructor(private http: HttpClient) { }

  // Obtener productos
  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  // Obtener pedidos
  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
}
