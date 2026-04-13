import { Pipe, PipeTransform } from '@angular/core';
import {LanguageService} from "../language-service/language.service";

@Pipe({
  name: 'language',
  standalone: true,
  pure: false
})
export class LanguagePipe implements PipeTransform {

  constructor(private languageService: LanguageService) {
  }

  transform(key: string): string {
    return this.languageService.translate(key);
  }

}
