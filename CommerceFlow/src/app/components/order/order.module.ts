import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { IndexOrderComponent } from './index-order/index-order.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderFormComponent } from './order-form/order-form.component';


@NgModule({
  declarations: [
    IndexOrderComponent,
    CreateOrderComponent,
    EditOrderComponent,
    OrderFormComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
