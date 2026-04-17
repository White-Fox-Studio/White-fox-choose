import {Injectable} from '@angular/core';
import {Order, OrderResponse, Student} from "../model/order.model";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../storage/storage.service";
import {OrderRequest} from "../storage/storage.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private student = new BehaviorSubject<Student | null>(null)
  public student$ = this.student.asObservable()

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  getOrder(orderNumber: string, studentLastName: string): Observable<Order> {
    return this.http.get<OrderResponse>(`/api/order`, {
      headers: { 'Content-Type': 'application/json' },
      params: {
        orderNumber: orderNumber,
        studentLastName: studentLastName,
      }
    }).pipe(
      tap((response: OrderResponse) => {
        this.student.next(response.student);
        this.storageService.setOrder(response);
      })
    );
  }

  sendCustomerSelection(data: OrderRequest) {
    return this.http.post(`/api/submit-order`, data)
  }
}
