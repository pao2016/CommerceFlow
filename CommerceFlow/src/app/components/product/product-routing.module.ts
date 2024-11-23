import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexProductComponent } from './index-product/index-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: '', component: IndexProductComponent }, // Ruta principal para productos
  { path: 'create', component: CreateProductComponent }, // Ruta para crear un producto
  { path: 'edit/:id', component: EditProductComponent }, // Ruta para editar un producto
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
