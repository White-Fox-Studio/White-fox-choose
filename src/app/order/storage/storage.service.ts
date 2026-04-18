import {Injectable} from '@angular/core';
import {getSlotKeyBySelection, OrderRequest, SelectionItem} from "./storage.model";
import {BehaviorSubject, map, Observable} from "rxjs";
import {getSlotKey, Order, ProductItem} from "../model/order.model"

export type SelectionDictionary = Record<string, SelectionItem>;
export type PosesFilledAll = [number, number];

export interface IFirstEmpty {
  orderItemId: string;
  slotId: string;
  index: number;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private currentOrderID: string = ''
  private savedOrderMap: string[] = []

  private selections = new BehaviorSubject<SelectionDictionary>(this.loadFromStorage(this.currentOrderID));
  public selections$ = this.selections.asObservable();

  // Инициализировать данные заказа
  setOrder(order: Order) {
    const {orderId} = order;
    const keysMap: string[] = [];

    function getItems(item: ProductItem): SelectionDictionary {
      const dict: SelectionDictionary = {};
      const {orderItemId, itemIndex} = item

      item.layouts.forEach((layout) => {
        layout.slots.forEach((slot) => {
          const {slotId, savedPhoto, disabled, index: slotIndex} = slot;
          const key = getSlotKey(slot);
          const value: SelectionItem = {
            slotId,
            slotIndex,
            orderItemId,
            itemIndex,
            disabled
          }
          if (!!savedPhoto && !isNaN(Number(savedPhoto))) {
            value.photoNumber = Number(savedPhoto);
          }
          dict[key] = value;
          if (!disabled) {keysMap.push(key);}
        })
      })
      return dict;
    }
    // смаппить данные в SelectionDictionary
    const selections: SelectionDictionary = order.items.reduce(
      ( result: SelectionDictionary, item): SelectionDictionary => {

        if ('packageId' in item) {
          const items = item.products.reduce((res: SelectionDictionary, product): SelectionDictionary => {
            const itemsMap = getItems(product)
            return {
              ...res,
              ...itemsMap
            }
          }, {})

          result = {
            ...result,
            ...items
          }
        } else {
          const items = getItems(item);
          result = {
            ...result,
            ...items
          }
        }
        return result;
      },
      {})

    this.savedOrderMap = keysMap;

    // проверить есть ли заказ
    const orderSaved = localStorage.getItem(orderId);
    if (orderSaved) {
      // если есть - проверить и слить данные
      const oldSelections: SelectionDictionary = JSON.parse(orderSaved)
      for (let key of Object.keys(oldSelections)) {
        if (
          selections.hasOwnProperty(key) &&
          !selections[key].disabled
        ) {
          selections[key].photoNumber = oldSelections[key].photoNumber;
        }
      }
    }

    // Положить данные в сторадж и установить orderId
    localStorage.setItem(orderId, JSON.stringify(selections));
    this.setOrderId(orderId);
  }

  // Получить данные из хранилища по номеру заказа
  private loadFromStorage(orderId: string): SelectionDictionary {
    if (orderId.length < 1) {
      return {};
    }

    const order = localStorage.getItem(orderId);
    return order ? JSON.parse(order) : {};
  }

  // Определить текущий заказ
  setOrderId(orderId: string) {
    this.currentOrderID = orderId;
    this.selections.next(this.loadFromStorage(orderId))
  }

  // Положить данные по конкретному элементу текущего заказа в хранилище
  updateSelection(selection: SelectionItem) {
    const key = getSlotKeyBySelection(selection)

    const newSelections = {
      ...this.selections.value,
      [key]: selection
    }

    this.selections.next(newSelections);
    localStorage.setItem(this.currentOrderID, JSON.stringify(newSelections));

  }

  // Получить значение конкретного элемента по текущему заказу
  getPhotoNumber(selection: SelectionItem): number | null {
    const key = getSlotKeyBySelection(selection)
    const value = this.selections.value[key]
    if (!value) {
      return null
    }

    return value.photoNumber ? value.photoNumber : null
  }

  // Получить соотношение заполнено/пусто по текущему заказу
  get filledAll$(): Observable<PosesFilledAll | null> {
    return this.selections.pipe(
      map((selections) => {

        const items = Object.values(selections).filter(
          (item) => {
            return !item.disabled
          });
        if (items.length === 0) {
          return null;
        }

        const filled = items.filter((item) => {
          return !!item.photoNumber
        })
        return [filled.length,items.length];
      })
    )
  }

  // Получить первый незаполненный
  getFirstEmpty(): IFirstEmpty | null {
    const selections = this.selections.value

    // нужно обойти по порядку карту и
    // вернуть orderItemId + slotId
    for (const key of this.savedOrderMap) {
      const photo = selections[key].photoNumber;
      if (!photo) {
        const values = key.split("_");
        const orderItemId = values[0];
        const slotId = values[1];
        const index = Number(values[2])
        return {orderItemId, slotId, index}
      }

    }

    return null;

  }

  // Получить данные для отправки текущего заказа
  getOrderRequest(): OrderRequest {
    return {
      orderId: this.currentOrderID,
      selections: Object.values(this.selections.value).filter((value) => !value.disabled)
    }
  }

  // Убрать заказ из сервиса
  removeOrder() {
    this.currentOrderID = '';
    this.savedOrderMap = [];
    this.selections.next({})
  }

}
