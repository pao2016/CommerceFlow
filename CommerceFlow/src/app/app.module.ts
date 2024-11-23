import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccordionModule } from 'primeng/accordion';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenubarModule } from 'primeng/menubar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProductModule } from './components/product/product.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api'; // MessageService
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    OrderComponent,
    MenuComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    MenubarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    TableModule,
    PaginatorModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ProductModule,
    MessagesModule,
    MessageModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
