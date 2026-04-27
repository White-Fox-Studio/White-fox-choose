import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, fromEvent} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private isScrolled = new BehaviorSubject<boolean>(false)
  public isScrolled$ = this.isScrolled.asObservable();

  constructor(private ngZone: NgZone) {
    this.initScrollListener();
  }

  private initScrollListener() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll').subscribe(() => {
        const scrolled = window.scrollY > 62;
        if (scrolled !== this.isScrolled.value) {
          this.ngZone.run(() => {
            this.isScrolled.next(scrolled);
          })
        }
      })
    })
  }
}
