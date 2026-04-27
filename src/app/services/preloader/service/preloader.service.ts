import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private on = new BehaviorSubject<boolean>(false);
  on$ = this.on.asObservable();

  constructor() { }

  turnOn() {
    this.on.next(true);
  }

  turnOff() {
    this.on.next(false);
  }
}
