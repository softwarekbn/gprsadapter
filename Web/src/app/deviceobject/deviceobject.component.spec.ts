import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceobjectComponent } from './deviceobject.component';

describe('DeviceobjectComponent', () => {
  let component: DeviceobjectComponent;
  let fixture: ComponentFixture<DeviceobjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceobjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
