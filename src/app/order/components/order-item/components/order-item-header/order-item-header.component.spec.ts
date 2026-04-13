import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemHeaderComponent } from './order-item-header.component';

describe('OrderItemHeaderComponent', () => {
  let component: OrderItemHeaderComponent;
  let fixture: ComponentFixture<OrderItemHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
