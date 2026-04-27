import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {IFirstEmpty} from "../../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class FocusService {
  private highlightTarget = new Subject<IFirstEmpty>();
  public target = this.highlightTarget.asObservable();

  constructor() { }

  highlight(target: IFirstEmpty) {
    this.highlightTarget.next(target);
  }

}
