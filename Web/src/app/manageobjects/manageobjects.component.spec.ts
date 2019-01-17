import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageobjectsComponent } from './manageobjects.component';

describe('ManageobjectsComponent', () => {
  let component: ManageobjectsComponent;
  let fixture: ComponentFixture<ManageobjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageobjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageobjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
