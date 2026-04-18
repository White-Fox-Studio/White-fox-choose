import {Directive, EventEmitter, HostListener, Input, Optional, Output} from '@angular/core';
import {NgControl} from "@angular/forms";

export enum RestrictDirectiveErrors {
  'symbol',
  'paste'
}

@Directive({
  selector: '[appInputRestrict]',
  standalone: true,
})
export class InputRestrictDirective {
  @Input('appInputRestrict') pattern!: RegExp;

  @Output() inputRejected = new EventEmitter<RestrictDirectiveErrors>();

  constructor(@Optional() private ngControl: NgControl) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (
      event.ctrlKey || // Разрешаем все комбинации с Ctrl или Cmd (Mac)
      event.metaKey || // - копирование, вставка, выделение
      event.key.length > 1 || // У служебных клавиш длина всегда больше 1 ('Backspace', 'ArrowLeft', 'Delete', 'Enter').
      event.key === 'Unidentified' // И ОБЯЗАТЕЛЬНО пропускаем мобильные подсказки 'Unidentified'
    ) {
      return;
    }

    if (!this.pattern.test(event.key)) {
      event.preventDefault();
      this.inputRejected.emit(RestrictDirectiveErrors.symbol);
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;

    const pastedText = clipboardData.getData('text').trim();
    if (!this.pattern.test(pastedText)) {
      event.preventDefault();
      this.inputRejected.emit(RestrictDirectiveErrors.paste);
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    const resetValue = (value: string)=> {
      input.value = value;
      if (this.ngControl && this.ngControl.control) {
        this.ngControl.control.setValue(clean, { emitEvent: false });
      }
    }

    let clean = ""
    let rejected = ""

    for (const char of value) {
      if (this.pattern.test(char)) {
        clean += char;
      } else {
        rejected += char;
      }
    }

    if (rejected !== "") {
      resetValue(clean)

      this.inputRejected.emit(
        rejected.length > 1? RestrictDirectiveErrors.paste : RestrictDirectiveErrors.symbol
      );
    } else if (value !== input.value) {
      resetValue(value)
    }
  }
}
