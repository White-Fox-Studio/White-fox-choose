import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [{
  path: '', redirectTo: 'form', pathMatch: 'full',
},{
  path: 'form',
  loadChildren: () => import('./form/form.module').then(m => m.FormModule),
},{
  path: 'order/:orderId/:studentLastName',
  loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
},{
  path: '**', redirectTo: 'form', pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
