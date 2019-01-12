import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageprotocolComponent } from './manageprotocol.component';

describe('ManageprotocolComponent', () => {
  let component: ManageprotocolComponent;
  let fixture: ComponentFixture<ManageprotocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageprotocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageprotocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
