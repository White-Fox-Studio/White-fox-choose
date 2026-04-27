import {Component, Input} from '@angular/core';
import {PackageInfo} from "../../../../model/order.model";

@Component({
  selector: 'app-package-header',
  templateUrl: './package-header.component.html',
  styleUrls: ['./package-header.component.scss']
})
export class PackageHeaderComponent {
  @Input() info!: PackageInfo;
}
