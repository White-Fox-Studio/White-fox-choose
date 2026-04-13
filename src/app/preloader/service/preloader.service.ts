import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private on = new BehaviorSubject<boolean>(false);
  on$ = this.on.asObservable();

  constructor() { }

  turnOn() {
    console.log('show preloader')
    this.on.next(true);
  }

  turnOff() {
    console.log('hide preloader')
    this.on.next(false);
  }
}
