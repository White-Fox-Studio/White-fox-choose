import {Pipe, PipeTransform} from '@angular/core';
import {LanguageService} from "../language-service/language.service";

@Pipe({
  name: 'servTranslate',
  standalone: true,
  pure: false
})
export class ServTranslatePipe implements PipeTransform {

  constructor(private languageService: LanguageService) {
  }

  transform(value: any, baseField: string): unknown {
    value = value as {[key: string]: unknown};
    const currentLang = this.languageService.language.value.toUpperCase();
    const key = baseField + currentLang;
    return value[key] || value[baseField] || '';
  }

}
