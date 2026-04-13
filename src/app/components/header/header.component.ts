import {Component} from '@angular/core';
import {LanguageService} from "../../language/language-service/language.service";
import {OrderService} from "../../order/service/order.service";
import {ScrollService} from "../../scroll/scroll.service";
import {combineLatest, filter, map, startWith} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private languageService: LanguageService,
    private orderService: OrderService,
    private scrollService: ScrollService,
    private router: Router,
    ) {}

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  get studentShow$() {
    const isScrolled$ = this.scrollService.isScrolled$;
    const hasOrder$ = this.orderService.student$.pipe(
      map(student => !!student),
    );
    const isOrderPage$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url.includes('/order')),
      startWith(this.router.url.includes('/order')),
    )

    return combineLatest([
      isScrolled$,
      hasOrder$,
      isOrderPage$
    ]).pipe(
      map(([IS, HO, OP]) => IS && HO && OP)
    )
  }

}
