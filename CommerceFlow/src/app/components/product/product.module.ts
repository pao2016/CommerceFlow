import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { ProductRoutingModule } from './product-routing.module';
import { IndexProductComponent } from './index-product/index-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'; // Para las tarjetas
import { InputTextModule } from 'primeng/inputtext'; // Para pInputText
import { MessageService } from 'primeng/api'
import { MessagesModule } from 'primeng/messages';
@NgModule({
  declarations: [
    IndexProductComponent,
    CreateProductComponent,
    ProductFormComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    BrowserModule,
    TableModule,
    BrowserAnimationsModule,
    AccordionModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MessagesModule

  ],
  providers: [MessageService],
  exports: [ProductFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ProductModule { }
