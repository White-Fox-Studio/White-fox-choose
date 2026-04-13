import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Language} from "../../models/language.model";
import {EN_DICTIONARY} from "../dictionaries/dictionary.en";
import {ThDictionary} from "../dictionaries/dictionary.th";
import {IDictionary} from "../dictionaries/dictionary.model";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: BehaviorSubject<Language> = new BehaviorSubject<Language>('th');

  private dictionary: {[key: string]: IDictionary} = {
    en: EN_DICTIONARY,
    th: ThDictionary
  }

  translate(key: string): string {
    const lang = this.language.getValue();
    if (this.dictionary[lang].hasOwnProperty(key)) {
      const value = (this.dictionary[lang] as unknown as {[key: string]: string})[key]
      return value;
    }
    return key; // Если перевода нет, вернем сам ключ
  }

  toggleLanguage() {
    const newLanguage = this.language.getValue() === 'th' ? 'en' : 'th';
    this.language.next(newLanguage);
  }
}
