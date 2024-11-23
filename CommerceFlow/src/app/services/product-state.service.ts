import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {
  private apiUrl = 'http://localhost:3000/products'; // URL del backend simulado

  // Estado centralizado
  private productsSubject = new BehaviorSubject<Product[]>([]); // Lista de productos
  private selectedProductSubject = new BehaviorSubject<Product | null>(null); // Producto seleccionado

  constructor(private http: HttpClient) { }

  // Obtener la lista de productos como observable
  getProducts$(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  // Obtener el producto seleccionado como observable
  getSelectedProduct$(): Observable<Product | null> {
    return this.selectedProductSubject.asObservable();
  }

  // Cargar productos desde el backend y actualizar el estado
  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe((products) => {
      this.productsSubject.next(products); // Actualiza el estado
    });
  }

  // Guardar un producto (crear o actualizar)
  saveProduct(product: Product): void {
    if (product.id) {
      // Si el producto tiene ID, se actualiza
      this.http.put(`${this.apiUrl}/${product.id}`, product).subscribe(() => {
        this.loadProducts(); // Recargar los productos
      });
    } else {
      // Si no tiene ID, se crea uno nuevo
      this.http.post<Product>(this.apiUrl, product).subscribe(() => {
        this.loadProducts(); // Recargar los productos
      });
    }
  }

  // Seleccionar un producto
  selectProduct(product: Product): void {
    this.selectedProductSubject.next(product);
  }

  // Deseleccionar el producto
  clearSelectedProduct(): void {
    this.selectedProductSubject.next(null);
  }

  // Eliminar un producto
  deleteProduct(productId: number): void {
    this.http.delete(`${this.apiUrl}/${productId}`).subscribe(() => {
      this.loadProducts(); // Recargar los productos
    });
  }

  addProduct(product: Product): void {
    this.http.post<Product>(this.apiUrl, product).subscribe((newProduct) => {
      // Actualizar el estado con el nuevo producto
      const updatedProducts = [...this.productsSubject.getValue(), newProduct];
      this.productsSubject.next(updatedProducts);
    });
  }
}
