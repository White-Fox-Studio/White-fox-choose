import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {LanguagePipe} from './services/language/language-pipe/language.pipe';
import {ModalComponent} from './services/modal/modal.component';
import {PreloaderComponent} from './services/preloader/preloader.component';
import {StudentInfoComponent} from './components/student-info/student-info.component';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ServTranslatePipe} from './services/language/serv-translate/serv-translate.pipe';
import {CopyrightComponent} from './components/copyright/copyright.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    PreloaderComponent,
    StudentInfoComponent,
    CopyrightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    LanguagePipe,
    ServTranslatePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    ServTranslatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
