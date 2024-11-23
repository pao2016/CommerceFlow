import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { IndexProductComponent } from './index-product/index-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [
    IndexProductComponent,
    CreateProductComponent,
    ProductFormComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
