import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, EMPTY, finalize, Observable} from 'rxjs';
import {OrderService} from "../service/order.service";
import {Order} from "../model/order.model";
import {ModalService} from "../../modal/service/modal.service";
import {PreloaderService} from "../../preloader/service/preloader.service";

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<Order | null> {

  constructor(
    private orderService: OrderService,
    private modalService: ModalService,
    private preloaderService: PreloaderService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order | never> {
    const orderId = route.paramMap.get('orderId');
    const studentLastName = route.paramMap.get('studentLastName');
    this.preloaderService.turnOn();

    if (orderId && studentLastName) {
      return this.orderService.getOrder(orderId, studentLastName)
        .pipe(
          catchError((error) => {
            if (error.status === 400) {
              this.modalService.open(
                'Заказ не найден',
                'Заказ не найден или фамилия не совпадает'
              )
            } else {
              this.modalService.open(
                'Ошибка',
                'Что-то пошло не так, повторите попытку позже')
            }

            return EMPTY;
          }),
          finalize(() => {
            this.preloaderService.turnOff();
          })
        )
    }
    this.modalService.open('','')
    return EMPTY;
  }
}
