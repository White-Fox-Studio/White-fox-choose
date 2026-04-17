import { Component, Input } from '@angular/core';
import {IdKeys, ProductItem, ProductItemInfo} from "../../model/order.model";
import {LanguageService} from "../../../language/language-service/language.service";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {
  @Input() item!: ProductItem
  @Input() orderId!: string;
  @Input() saved = false;

  constructor(private languageService: LanguageService) {
  }

  get isSimple() {
    return this.item.layouts.length === 1;
  }

  get isShort() {
    return this.isSimple && this.firstLayout.slots.length < 3
  }

  get firstLayout() {
    return this.item.layouts[0];
  }

  get info(): ProductItemInfo {
    const {layouts,  ...info} = this.item;
    return info;
  }

  get simpleImgUrl() {
    return this.isSimple ? this.firstLayout.groupImageUrl : null
  }

  get language() {
    return this.languageService.language.value;
  }

  get underline() {
    if (!this.isSimple) {return null}

    const comment = this.language === 'en' ? this.firstLayout.underlineEN : this.firstLayout.underlineTH;
    return comment ?? null;
  }

  get keys():IdKeys {
    return {
      orderId: this.orderId,
      orderItemId: this.item.orderItemId,
      itemIndex: this.item.itemIndex,
    }
  }


}
