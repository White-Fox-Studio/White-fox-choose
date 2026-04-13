import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { LanguagePipe } from './language/language-pipe/language.pipe';
import { ModalComponent } from './modal/modal.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import { ServTranslatePipe } from './language/serv-translate/serv-translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    PreloaderComponent,
    StudentInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    LanguagePipe,
    ServTranslatePipe
  ],
  providers: [],
  exports: [
    ServTranslatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
