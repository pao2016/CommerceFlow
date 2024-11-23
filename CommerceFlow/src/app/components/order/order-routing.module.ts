import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexOrderComponent } from './index-order/index-order.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  { path: '', component: IndexOrderComponent },         // Ruta principal para pedidos
  { path: 'create', component: CreateOrderComponent },  // Ruta para crear un pedido
  { path: 'edit/:id', component: EditOrderComponent },  // Ruta para editar un pedido
  { path: 'form', component: OrderFormComponent },      // Ruta para formulario genérico
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule { }
