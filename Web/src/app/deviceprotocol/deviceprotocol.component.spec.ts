import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceprotocolComponent } from './deviceprotocol.component';

describe('DeviceprotocolComponent', () => {
  let component: DeviceprotocolComponent;
  let fixture: ComponentFixture<DeviceprotocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceprotocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceprotocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
