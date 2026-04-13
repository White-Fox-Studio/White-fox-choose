import { Component, Input } from '@angular/core';
import {Student} from "../../model/order.model";

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.scss']
})
export class OrderHeaderComponent {
  @Input() student!: Student;
}
