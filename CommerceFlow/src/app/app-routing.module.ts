import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Lazy loading para productos
  {
    path: 'products',
    loadChildren: () => import('./components/product/product-routing.module').then(m => m.ProductRoutingModule)
  },

  // Lazy loading para pedidos
  {
    path: 'orders',
    loadChildren: () => import('./components/order/order-routing.module').then(m => m.OrderRoutingModule)
  },

  // Ruta por defecto
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  // Ruta para páginas no encontradas (opcional)
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
