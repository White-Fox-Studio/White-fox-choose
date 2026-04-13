import {Component, Input} from '@angular/core';
import {Layout, Pose} from "../../../../model/order.model";

@Component({
  selector: 'app-order-item-poses',
  templateUrl: './order-item-poses.component.html',
  styleUrls: ['./order-item-poses.component.scss']
})
export class OrderItemPosesComponent {
  @Input() layout!: Layout;

  trackFn(index: number, pose: Pose) {
    return pose.slotId;
  }
}
