import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Necesario para usar routerLink

import { OrderRoutingModule } from './order-routing.module';
import { IndexOrderComponent } from './index-order/index-order.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table'; // Para p-table
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button'; // Para p-button
import { CardModule } from 'primeng/card'; // Para las tarjetas
import { InputTextModule } from 'primeng/inputtext'; // Para pInputText
import { MessagesModule } from 'primeng/messages'; // Para mensajes
import { MessageService } from 'primeng/api'; // Servicio para mensajes PrimeNG
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    IndexOrderComponent,
    CreateOrderComponent,
    EditOrderComponent,
    OrderFormComponent,
  ],
  imports: [
    CommonModule, // Incluye directivas básicas como ngIf y pipes como currency
    RouterModule, // Para routerLink
    OrderRoutingModule, // Rutas específicas para órdenes
    FormsModule, // Para formularios
    TableModule, // Para p-table
    BrowserAnimationsModule, // Necesario para animaciones de PrimeNG
    ButtonModule, // Para botones
    CardModule, // Para tarjetas
    InputTextModule, // Para campos de texto
    MessagesModule, // Para mensajes
    DropdownModule
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite componentes personalizados como p-table
  exports: [OrderFormComponent], // Exporta el formulario si lo necesitas fuera del módulo
})
export class OrderModule { }
