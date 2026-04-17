import { Component } from '@angular/core';
import {OrderService} from "../../order/service/order.service";
import {StorageService} from "../../order/storage/storage.service";

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent {

  constructor(public orderService: OrderService, private storageService: StorageService) {
  }

  get filledAll$() {
    return this.storageService.filledAll$
  }

}
