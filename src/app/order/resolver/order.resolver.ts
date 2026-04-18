import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {catchError, EMPTY, finalize, Observable} from 'rxjs';
import {OrderService} from "../service/order.service";
import {Order} from "../model/order.model";
import {ModalService} from "../../modal/service/modal.service";
import {PreloaderService} from "../../preloader/service/preloader.service";
import {StorageService} from "../storage/storage.service";
import {LanguageService} from "../../language/language-service/language.service";

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<Order | null> {

  constructor(
    private orderService: OrderService,
    private modalService: ModalService,
    private preloaderService: PreloaderService,
    private languageService: LanguageService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order | never> {
    const orderId = route.paramMap.get('orderId');
    const studentLastName = route.paramMap.get('studentLastName');
    this.preloaderService.turnOn();

    if (orderId && studentLastName) {
      return this.orderService.getOrder(orderId, studentLastName)
        .pipe(
          catchError((error) => {
            console.log(error);
            console.log(error.status);
            if (error.status === 400) {
              this.modalService.open(
                this.languageService.translate('notFoundErrorTitle'),
                this.languageService.translate('notFoundErrorMessage')
              )
            } else {
              this.modalService.open(
                this.languageService.translate('internalServerErrorTitle'),
                this.languageService.translate('internalServerErrorMessage')
              )
            }

            return EMPTY;
          }),
          finalize(() => {
            this.preloaderService.turnOff();
          }),
        )
    }
    this.modalService.open('Ошибка','Ошибка ввода данных')
    return EMPTY;
  }
}
