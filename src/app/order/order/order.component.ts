import {Component, OnInit, TrackByFunction} from '@angular/core';
import {Order, Package, ProductItem} from "../model/order.model";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../service/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Order | null = null

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
  }

  ngOnInit() {
    this.route.data.subscribe(order => {
      console.log(order);
      this.order = order['order'] as Order;
    })
  }

  trackByFn(index: number, item: ProductItem | Package) {
    return item.sku; // Оптимизация рендеринга списка
  }

  isProduct(item: ProductItem | Package): item is Package{
    return item.hasOwnProperty('packageId')
  }
}
