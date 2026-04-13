import {Component} from '@angular/core';
import {take} from "rxjs";
import {Language} from "../../models/language.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OrderService} from "../../order/service/order.service";
import {RestrictDirectiveErrors} from "../../dirrectives/input-restrict.directive";
import {PreloaderService} from "../../preloader/service/preloader.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  englishLettersPattern = /^[a-zA-Z]*$/;
  language: Language = 'th'
  get TL() {
    return this.language === 'th';
  }

  form : FormGroup = this.fb.group({
    orderNumber: ['', Validators.required],
    studentLastName: ['', Validators.required],
  });
  get orderNumber() {
    return this.form.controls['orderNumber'];
  }
  get studentLastName() {
    return this.form.controls['studentLastName'];
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private preloaderService: PreloaderService,
  ) {}

  onStudentLastNameError(error: RestrictDirectiveErrors) {
    const code = error === RestrictDirectiveErrors.symbol ? 'symbol' : 'paste';
    if (this.studentLastName.hasError(code)) return;

    const errors = this.studentLastName.errors || {};
    errors[code] = true;

    this.studentLastName.setErrors(errors);
    this.studentLastName.markAsTouched();

    this.studentLastName.valueChanges
      .pipe(
        take(1)
      ).subscribe(() => {
      if (this.studentLastName.errors) {
        // 1. Delete the specific error key
        delete this.studentLastName.errors[code];

        // 2. If no errors remain, set to null so the control becomes 'valid'
        if (Object.keys(this.studentLastName.errors).length === 0) {
          this.studentLastName.setErrors(null);
        } else {
          // Otherwise, update the control with the remaining errors
          this.studentLastName.setErrors(this.studentLastName.errors);
        }
      }
    })
  }

  get studentLastNameErrors(): string[] {
    if (!this.studentLastName || !this.studentLastName.errors || !this.studentLastName.touched) { return [] }
    const codes = Object.keys(this.studentLastName.errors);
    let errors: string[] = codes.map((code) => {
      switch (code) {
        case 'required': return 'formStudentLastNameRequiredError'
        case 'symbol': return 'formStudentLastNameSymbolError'
        case 'paste': return 'formStudentLastNamePasteError'
        default: return ''
      }
    });
    errors = errors.filter((error) => error !== '');
    return errors;
  }

  submit() {
    if (this.form.valid) {
      this.preloaderService.turnOn();
      this.router.navigate([
        '/order',
        this.orderNumber.value,
        this.studentLastName.value
      ]).then(() => {});
    } else {
      this.form.markAllAsTouched();
    }
  }
}
