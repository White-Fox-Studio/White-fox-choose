import {Component, Input} from '@angular/core';
import {Student} from "../../model/order.model";
import {StorageService} from "../../storage/storage.service";

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.scss']
})
export class OrderHeaderComponent {
  @Input() student!: Student;

  constructor(private storageService: StorageService) {
  }

  get filledAll$() {
    return this.storageService.filledAll$
  }
}
