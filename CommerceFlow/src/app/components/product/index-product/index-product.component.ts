import { Component, OnInit } from '@angular/core';
import { ProductStateService } from 'src/app/services/product-state.service';
@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css']
})
export class IndexProductComponent implements OnInit {
  products: any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;

  constructor(private productStateService: ProductStateService) { }

  ngOnInit(): void {
    this.productStateService.loadProducts();
    this.loadProducts();
  }

  /**
   * Carga los productos desde el servicio.
   */
  loadProducts(): void {
    this.productStateService.getProducts$().subscribe((data) => {
      this.products = data;
    });
  }

  /**
   * Acción para crear un nuevo producto.
   */
  onNewProduct(): void {
    console.log('New product action');
    // Redirige al formulario de creación o abre un modal
  }

  /**
   * Acción para editar un producto existente.
   * @param product Producto seleccionado
   */
  onEditProduct(product: any): void {
    console.log('Edit product action:', product);
    // Maneja la lógica para editar el producto seleccionado
  }
}
