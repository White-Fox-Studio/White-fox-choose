import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';
import {Pose} from "../../../../model/order.model";
import {LanguageService} from "../../../../../language/language-service/language.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-order-item-pose',
  templateUrl: './order-item-pose.component.html',
  styleUrls: ['./order-item-pose.component.scss']
})
export class OrderItemPoseComponent {
  @Input() pose!: Pose;
  @Output() filled: EventEmitter<string> = new EventEmitter(); // ???? или сразу здесь класть в storage
  tooltipHidden = true;
  @HostListener('mouseenter')
  onMouseEnter() {
    this.tooltipShow();
  }
  @ViewChild('tooltipEL') tooltipElement?: ElementRef<HTMLDivElement>;

  constructor(
    private languageService: LanguageService,
    private el: ElementRef,
    private fb: FormBuilder,
  ) {
  }

  tooltipShow() {
    if (!this.tooltip || !this.tooltipElement) {
      return;
    }
    const element = this.tooltipElement.nativeElement;
    const width = element.getBoundingClientRect().width;
    const host = this.el.nativeElement;
    const available = document.documentElement.clientWidth - host.getBoundingClientRect().left - 24;

    if (width > available) {
      const diff = Math.ceil(width - available);
      element.style.left = `-${diff}px`;
    }

    this.tooltipHidden = false;
    setTimeout(() => this.tooltipHide(), 3000)
  }

  tooltipHide() {
    this.tooltipHidden = true;
  }

  get language() {
    return this.languageService.language.value;
  }

  get tooltip() {
    return this.language === 'en' ? this.pose.tooltipEN : this.pose.tooltipTH;
  }
}

