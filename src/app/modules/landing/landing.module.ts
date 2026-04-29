import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import {LandingRoutingModule} from "./landing-routing.module";
import {LanguagePipe} from "../../services/language/language-pipe/language.pipe";

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    LanguagePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingModule { }
