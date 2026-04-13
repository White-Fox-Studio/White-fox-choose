import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import {OrderRoutingModule} from "./order-routing.module";
import { OrderHeaderComponent } from './components/order-header/order-header.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderItemHeaderComponent } from './components/order-item/components/order-item-header/order-item-header.component';
import { OrderItemGroupComponent } from './components/order-item/components/order-item-group-poses/order-item-group.component';
import { OrderItemPoseComponent } from './components/order-item/components/order-item-pose/order-item-pose.component';
import {ServTranslatePipe} from "../language/serv-translate/serv-translate.pipe";
import { OrderItemPosesComponent } from './components/order-item/components/order-item-poses/order-item-poses.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderHeaderComponent,
    OrderItemComponent,
    OrderItemHeaderComponent,
    OrderItemGroupComponent,
    OrderItemPoseComponent,
    OrderItemPosesComponent
  ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        ServTranslatePipe,
    ]
})
export class OrderModule { }
