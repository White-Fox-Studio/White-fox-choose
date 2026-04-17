import {Component, Input} from '@angular/core';
import {IdKeys, Layout} from "../../../../model/order.model";
import {LanguageService} from "../../../../../language/language-service/language.service";

@Component({
  selector: 'app-order-item-group',
  templateUrl: './order-item-group.component.html',
  styleUrls: ['./order-item-group.component.scss']
})
export class OrderItemGroupComponent {
  @Input() layouts: Layout[] = [];
  @Input() keys!: IdKeys;
  @Input() saved = false;

  constructor(private languageService: LanguageService) {
  }

  get language() {
    return this.languageService.language.value;
  }

  getUnderline(layout: Layout) {
    const comment = this.language === 'en' ? layout.underlineEN : layout.underlineTH;
    return comment ?? null;
  }

  protected readonly window = window;
}
