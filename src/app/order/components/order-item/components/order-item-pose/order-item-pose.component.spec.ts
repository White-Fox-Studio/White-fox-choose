import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemPoseComponent } from './order-item-pose.component';

describe('OrderItemPoseComponent', () => {
  let component: OrderItemPoseComponent;
  let fixture: ComponentFixture<OrderItemPoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemPoseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemPoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
