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
    // 1. Разрешаем все комбинации с Ctrl или Cmd (Mac) - копирование, вставка, выделение
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    // У служебных клавиш длина всегда больше 1 ('Backspace', 'ArrowLeft', 'Delete', 'Enter').
    if (event.key.length > 1) {
      return;
    }


    if (!this.pattern.test(event.key)) {
      event.preventDefault(); // Запрещаем ввод
      this.inputRejected.emit(RestrictDirectiveErrors.symbol);
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;

    const pastedText = clipboardData.getData('text');
    if (!this.pattern.test(pastedText)) {
      event.preventDefault();
      this.inputRejected.emit(RestrictDirectiveErrors.paste);
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    let clean = ""
    let rejected = ""

    for (const char of input.value) {
      if (this.pattern.test(char)) {
        clean += char;
      } else {
        rejected += char;
      }
    }

    if (rejected !== "") {
      input.value = clean;

      if (this.ngControl && this.ngControl.control) {
        this.ngControl.control.setValue(clean, { emitEvent: false });
      }

      this.inputRejected.emit(
        rejected.length > 1? RestrictDirectiveErrors.paste : RestrictDirectiveErrors.symbol
      );

    }

  }

}
