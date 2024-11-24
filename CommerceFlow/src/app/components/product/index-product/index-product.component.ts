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
   * Eliminar un producto.
   * @param productId ID del producto a eliminar
   */
  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productStateService.deleteProduct(productId);
    }
  }
}
