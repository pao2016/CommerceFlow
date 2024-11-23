import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductStateService } from 'src/app/services/product-state.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  @Input() isNew: boolean = true;
  @Output() save = new EventEmitter<Product>();
  public objDProduct: Product = new Product();
  constructor(private productStateService: ProductStateService) { }
  saveProduct() {
    console.log("el objeto a guardar", this, this.objDProduct);
    this.productStateService.addProduct(this.objDProduct);
  }
}
