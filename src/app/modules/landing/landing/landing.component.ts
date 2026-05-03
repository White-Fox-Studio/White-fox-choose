import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Page, PAGES} from "../constants/pages";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('mySwiper') swiperRef!: ElementRef;
  pages: Page[] = PAGES;
  showSwiper: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.swiperRef.nativeElement.initialize();
    }, 100)
  }
}
