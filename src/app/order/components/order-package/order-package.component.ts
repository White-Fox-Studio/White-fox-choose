import {Component, Input, OnInit} from '@angular/core';
import {IdKeys, Package, PackageInfo, PackageLayout} from "../../model/order.model";

@Component({
  selector: 'app-order-package',
  templateUrl: './order-package.component.html',
  styleUrls: ['./order-package.component.scss']
})
export class OrderPackageComponent implements OnInit {
  @Input() package!: Package
  @Input() orderId!: string;
  @Input() saved = false;
  layouts: PackageLayout[] = [];

  ngOnInit() {
    this.layouts = this.getLayouts();
  }

  get info(): PackageInfo {
    const {products,  ...info} = this.package;
    return info;
  }

  getLayouts(): PackageLayout[] {
    return this.package.products.reduce(
      (arr:PackageLayout[] , product): PackageLayout[]  => {
      arr.push(
        ...product.layouts.map((layout) => ({
          ...layout,
          orderItemId: product.orderItemId,
          itemIndex: product.itemIndex,
          underlineEN: product.nameEN + ' ' + product.sizeLabel,
          underlineTH: product.nameTH + ' ' + product.sizeLabel,
        }))
      )
        return arr
    }, [])
  }

}
