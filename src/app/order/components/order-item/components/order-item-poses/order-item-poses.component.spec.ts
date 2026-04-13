import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemPosesComponent } from './order-item-poses.component';

describe('OrderItemShortPosesComponent', () => {
  let component: OrderItemPosesComponent;
  let fixture: ComponentFixture<OrderItemPosesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemPosesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemPosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
