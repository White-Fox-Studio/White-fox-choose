import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Pose} from "../../../../model/order.model";
import {LanguageService} from "../../../../../../services/language/language-service/language.service";
import {FormControl, Validators} from "@angular/forms";
import {StorageService} from "../../../../storage/storage.service";
import {SelectionItem} from "../../../../storage/storage.model";
import {debounceTime, distinctUntilChanged, filter, Subject, takeUntil} from "rxjs";
import {FocusService} from "../../../../service/focus/focus.service";

@Component({
  selector: 'app-order-item-pose',
  templateUrl: './order-item-pose.component.html',
  styleUrls: ['./order-item-pose.component.scss']
})
export class OrderItemPoseComponent implements OnInit, OnDestroy {
  @Input() pose!: Pose;
  @Input() saved = false;
  @Output() filled: EventEmitter<string> = new EventEmitter(); // ???? или сразу здесь класть в storage
  tooltipHidden = true;
  @HostListener('mouseenter')
  onMouseEnter() {
    this.tooltipShow();
  }
  @ViewChild('tooltipEL') tooltipElement?: ElementRef<HTMLDivElement>;
  private untilDestroy$: Subject<void> = new Subject();
  poseControl!: FormControl;
  previousValue?: number;
  highlight = false;

  constructor(
    private languageService: LanguageService,
    private storageService: StorageService,
    private focusService: FocusService,
    private el: ElementRef
  ) {
  }

  ngOnInit() {
    const initial = this.storageService.getPhotoNumber(this.mapSelectionItem());

    this.poseControl = new FormControl(
      initial, [
      Validators.min(this.pose.min),
      Validators.max(this.pose.max)
    ])
    if (!!initial) {
      this.previousValue = initial
    }

    if (this.pose.disabled) {
      this.poseControl.disable();
    } else {
      this.poseControl.valueChanges
        .pipe(
          takeUntil(this.untilDestroy$),
          distinctUntilChanged(),
          debounceTime(200),
        ).subscribe((value) => {
          this.highlight = false;
          if (this.poseControl.valid) {
            this.previousValue = value;
            this.storageService.updateSelection(
              this.mapSelectionItem(value)
            )
          } else if (this.invalid) {
            this.showError()
            this.storageService.updateSelection(
              this.mapSelectionItem()
            )
          }
        })
    }
    this.focusService.target.pipe(
        takeUntil(this.untilDestroy$),
      filter((target) => {
        const {orderItemId } = this.pose.key
        return target.orderItemId === orderItemId &&
          target.slotId === this.pose.slotId &&
          target.index === this.pose.index
      })
      ).subscribe(() => {
        const anchor = (this.el.nativeElement as HTMLElement).closest('.scroll-anchor');
        if (anchor) {
          anchor.scrollIntoView({behavior: 'smooth', block: 'start'});
        } else {
          (this.el.nativeElement as HTMLElement).scrollIntoView({behavior: 'smooth', block: 'start'});
        }

        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            this.highlight = true;
            setTimeout(() => {
              this.highlight = false;
              setTimeout(() => {
                this.highlight = true;
                setTimeout(() => {
                  this.highlight = false;
                  setTimeout(() => {
                    this.highlight = true;
                  }, 300);
                }, 1000);
              }, 300);
            }, 600);
            observer.disconnect();
          }
        }, {threshold: 0.5});

        observer.observe(this.el.nativeElement)
      })
  }

  tooltipShow(message = this.tooltip, time = 3000) {
    if (!this.tooltipElement || !message || message === '') {
      return;
    }
    const element = this.tooltipElement.nativeElement;
    element.innerText = message;
    const width = element.getBoundingClientRect().width;
    const host = this.el.nativeElement;
    const available = document.documentElement.clientWidth - host.getBoundingClientRect().left - 24;

    if (width > available) {
      const diff = Math.ceil(width - available);
      element.style.left = `-${diff}px`;
    }

    this.tooltipHidden = false;
    setTimeout(() => this.tooltipHide(), time)
  }

  tooltipHide() {
    this.tooltipHidden = true;
  }

  get language() {
    return this.languageService.language.value;
  }

  get tooltip() {
    const tooltip =  this.language === 'en' ? this.pose.tooltipEN : this.pose.tooltipTH;
    return tooltip && tooltip.length > 0 ? tooltip : "";
  }

  showError() {
    const body = this.languageService.translate('poseErrorMessageBody')
    const min = this.pose.min
    const to = this.languageService.translate('poseErrorMessageTo')
    const max = this.pose.max
    const message = `${body} ${min} ${to} ${max}`
    this.tooltipShow(message, 3000)
    return true;
  }

  get invalid() {
    return this.poseControl.invalid && !!this.previousValue;
  }

  mapSelectionItem(value?: number) {
    const item: SelectionItem = {
      slotId: this.pose.slotId,
      slotIndex: this.pose.index,
      orderItemId: this.pose.key.orderItemId,
      itemIndex: this.pose.key.itemIndex,
      disabled: this.pose.disabled,
    }
    if (!!value) {
      item.photoNumber = value;
    }

    return item;
  }

  ngOnDestroy() {
    this.untilDestroy$.next();
    this.untilDestroy$.complete();
  }
}

