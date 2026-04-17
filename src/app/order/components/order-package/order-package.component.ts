import {Component, Input} from '@angular/core';
import {Package} from "../../model/order.model";

@Component({
  selector: 'app-order-package',
  templateUrl: './order-package.component.html',
  styleUrls: ['./order-package.component.scss']
})
export class OrderPackageComponent {
  @Input() package!: Package
  @Input() orderId!: string;
  @Input() saved = false;

}
