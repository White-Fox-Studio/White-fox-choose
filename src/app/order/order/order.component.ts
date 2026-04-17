import {Component, OnDestroy, OnInit, TrackByFunction} from '@angular/core';
import {Order, Package, ProductItem} from "../model/order.model";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../service/order.service";
import {PosesFilledAll, StorageService} from "../storage/storage.service";
import {filter, map, Observable, take} from "rxjs";
import {FocusService} from "../service/focus/focus.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  order: Order | null = null

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private focusService: FocusService,
    private orderService: OrderService,) {
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

  isPackage(item: ProductItem | Package): item is Package{
    return item.hasOwnProperty('packageId')
  }

  get sendDisabled(){
    return this.storageService.filledAll$.pipe(
      filter((data): data is PosesFilledAll => data !== null),
      map(([filled, all]) => filled !== all)
    )
  }

  sendOrder() {
    this.sendDisabled.pipe(
      take(1),
    ).subscribe((disabled) => {
      if (disabled) {
        const firstEmpty = this.storageService.getFirstEmpty();
        if (!firstEmpty) { return }
        this.focusService.highlight(firstEmpty);
      } else {
        const order = this.storageService.getOrderRequest();
        this.orderService.sendCustomerSelection(order).subscribe(
          (data) => {
            console.log(data)
          }
        )
        console.log(order);
      }
    })
  }

  ngOnDestroy() {
    this.storageService.removeOrder();
  }
}
