import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
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
  @HostListener('window:orientationchange', ['$event'])
  @HostListener('window:resize', ['$event'])
  onOrientationChange() {
    if (window.innerWidth <= 900 && window.innerWidth > window.innerHeight) {
      this.el.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.swiperRef.nativeElement.initialize();
      setTimeout(() => this.onOrientationChange(), 100)
    }, 100)
  }

  setFullscreen(page: Page) {
    if (window.innerWidth <=900 ) {
      this.fullscreen = page;
    }
  }
}
