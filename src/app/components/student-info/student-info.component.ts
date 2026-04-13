import { Component } from '@angular/core';
import {OrderService} from "../../order/service/order.service";

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent {

  constructor(public orderService: OrderService) {
  }

}
