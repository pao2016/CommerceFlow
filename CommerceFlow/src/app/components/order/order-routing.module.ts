import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexOrderComponent } from './index-order/index-order.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderFormComponent } from './order-form/order-form.component';

// Definición de rutas específicas para el módulo de órdenes
const routes: Routes = [
  {
    path: '', // Ruta principal (base) para el módulo de órdenes
    component: IndexOrderComponent, // Componente para listar órdenes
  },
  {
    path: 'create', // Ruta para crear una nueva orden
    component: CreateOrderComponent,
  },
  {
    path: 'edit/:id', // Ruta para editar una orden específica (según ID)
    component: EditOrderComponent,
  },
  {
    path: 'form', // Ruta para un formulario genérico de órdenes
    component: OrderFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Uso de forChild para submódulos de rutas
  exports: [RouterModule], // Exportar RouterModule para que las rutas estén disponibles
})
export class OrderRoutingModule { }
