import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicedataComponent } from './devicedata.component';

describe('DevicedataComponent', () => {
  let component: DevicedataComponent;
  let fixture: ComponentFixture<DevicedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
