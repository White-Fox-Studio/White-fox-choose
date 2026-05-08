import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CopyrightComponent} from "./components/copyright/copyright.component";

const routes: Routes = [{
  path: '', redirectTo: 'main', pathMatch: 'full',
},{
  path: 'main',
  loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule),
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
