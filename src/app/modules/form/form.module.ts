import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form/form.component';
import {FormRoutingModule} from "./form-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputRestrictDirective} from "../../dirrectives/input-restrict.directive";
import {LanguagePipe} from "../../services/language/language-pipe/language.pipe";

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    InputRestrictDirective,
    LanguagePipe
  ]
})
export class FormModule { }
