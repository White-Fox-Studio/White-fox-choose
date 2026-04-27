import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderItemGroupComponent} from './order-item-group.component';

describe('OpderItemGroupPosesComponent', () => {
  let component: OrderItemGroupComponent;
  let fixture: ComponentFixture<OrderItemGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
