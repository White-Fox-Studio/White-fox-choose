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
  fullscreen: Page | null = null;

  ngOnInit() {
    setTimeout(() => {
      this.swiperRef.nativeElement.initialize();
    }, 100)
  }

  setFullscreen(page: Page) {
    if (window.innerWidth <=900 ) {
      this.fullscreen = page;
    }
  }
}
