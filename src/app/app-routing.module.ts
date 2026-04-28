import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CopyrightComponent} from "./components/copyright/copyright.component";

const routes: Routes = [{
  path: '', redirectTo: 'form', pathMatch: 'full',
},{
  path: 'catalog',
  loadChildren: () => import('./modules/catalog/catalog.module').then(m => m.CatalogModule),
},{
  path: 'form',
  loadChildren: () => import('./modules/form/form.module').then(m => m.FormModule),
},{
  path: 'order/:orderId/:studentLastName',
  loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule),
},{
  path: 'copyright', component: CopyrightComponent
},{
  path: '**', redirectTo: 'form', pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
