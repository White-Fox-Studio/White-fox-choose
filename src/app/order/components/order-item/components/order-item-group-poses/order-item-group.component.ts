import {Component, Input, OnInit} from '@angular/core';
import {Layout, PackageLayout} from "../../../../model/order.model";
import {LanguageService} from "../../../../../language/language-service/language.service";

@Component({
  selector: 'app-order-item-group',
  templateUrl: './order-item-group.component.html',
  styleUrls: ['./order-item-group.component.scss']
})
export class OrderItemGroupComponent implements OnInit {
  @Input() layouts: (Layout | PackageLayout)[] = [];
  @Input() saved = false;

  constructor(private languageService: LanguageService) {
  }

  ngOnInit() {
    console.log('group ngOnInit', this.layouts);
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
