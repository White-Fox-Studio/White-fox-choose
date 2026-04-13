import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import {OrderComponent} from "./order/order.component";
import {OrderResolver} from "./resolver/order.resolver";

const routes: Routes = [{
  path: '', component: OrderComponent, resolve: {order: OrderResolver}
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
