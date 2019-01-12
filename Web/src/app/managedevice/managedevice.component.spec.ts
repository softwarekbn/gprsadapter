import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedeviceComponent } from './managedevice.component';

describe('ManagedeviceComponent', () => {
  let component: ManagedeviceComponent;
  let fixture: ComponentFixture<ManagedeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
