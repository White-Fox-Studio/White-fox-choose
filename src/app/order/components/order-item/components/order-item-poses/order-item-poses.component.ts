import {Component, Input} from '@angular/core';
import {IdKeys, Layout, Pose} from "../../../../model/order.model";

@Component({
  selector: 'app-order-item-poses',
  templateUrl: './order-item-poses.component.html',
  styleUrls: ['./order-item-poses.component.scss']
})
export class OrderItemPosesComponent {
  @Input() layout!: Layout;
  @Input() keys!: IdKeys;
  @Input() saved = false;

  trackFn(index: number, pose: Pose) {
    return pose.slotId;
  }
}
