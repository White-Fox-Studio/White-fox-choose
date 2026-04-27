import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface IModalData {
  opened: boolean;
  title: string;
  message: string;
}

const MODAL_INITIAL: IModalData = {
  opened: false,
  title: '',
  message: ''
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private state = new BehaviorSubject<IModalData>(MODAL_INITIAL);

  modalState$ = this.state.asObservable();

  constructor() { }

  open(title: string, message: string) {
    this.state.next({
      opened: true,
      title,
      message
    })
  }

  close() {
    this.state.next(MODAL_INITIAL)
  }
}
