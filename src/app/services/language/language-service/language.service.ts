import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Language} from "../models/language.model";
import {IDictionary} from "../language-pipe/dictionary.model";
import * as enJson from "../../../../assets/i18n/en.json"
import * as thJson from "../../../../assets/i18n/th.json"

export const EN_DICTIONARY: IDictionary = enJson as unknown as IDictionary;
export const TH_DICTIONARY: IDictionary = thJson as unknown as IDictionary;

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: BehaviorSubject<Language> = new BehaviorSubject<Language>('th');

  private dictionary: {[key: string]: IDictionary} = {
    en: EN_DICTIONARY,
    th: TH_DICTIONARY
  }

  translate(key: string): string {
    const lang = this.language.getValue();
    if (key in this.dictionary[lang]) {
      return (this.dictionary[lang] as unknown as {[key: string]: string})[key];
    }
    return key; // Если перевода нет, вернем сам ключ
  }

  toggleLanguage() {
    const newLanguage = this.language.getValue() === 'th' ? 'en' : 'th';
    this.language.next(newLanguage);
    document.title = 'White Fox Studio — ' +
      (newLanguage === 'th' ? 'เลือกรูปภาพ' : 'Choose Photo');
  }
}
