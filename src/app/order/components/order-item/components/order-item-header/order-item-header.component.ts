import {Component, Input} from '@angular/core';
import {ProductItemInfo} from "../../../../model/order.model";

@Component({
  selector: 'app-order-item-header',
  templateUrl: './order-item-header.component.html',
  styleUrls: ['./order-item-header.component.scss']
})
export class OrderItemHeaderComponent {
  @Input() info!: ProductItemInfo;
  @Input() imgUrl: string | null = null;
  @Input() isComplex: boolean = false;
  @Input() underline: string | null = null;

  protected readonly window = window;
}
