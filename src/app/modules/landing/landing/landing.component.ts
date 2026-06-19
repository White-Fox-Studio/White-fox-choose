import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Page, PAGES} from "../constants/pages";
import Swiper from 'swiper';

interface SwiperContainerElement extends HTMLElement {
  swiper: Swiper;
  initialize: () => void;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('mySwiper') swiperRef!: ElementRef<SwiperContainerElement>;
  @ViewChild('fullscreenSwiper') fullscreenSwiperRef?: ElementRef<SwiperContainerElement>;
  pages: Page[] = PAGES;
  fullscreen: number = -1;
  @HostListener('window:orientationchange', ['$event'])
  @HostListener('window:resize', ['$event'])
  onOrientationChange() {
    if (this.checkMobile && window.innerWidth > window.innerHeight) {
      this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  setFullscreen(index: number) {
    if (this.checkMobile) {
      this.fullscreen = index;

      setTimeout(() => {
        const swiperEl = this.fullscreenSwiperRef?.nativeElement;

        if (swiperEl && swiperEl.swiper) {
          swiperEl.swiper.slideTo(index, 0);
        }
      }, 50);

    }
  }

  get checkMobile() {
    return window.matchMedia('(pointer: coarse)').matches
  }
}
