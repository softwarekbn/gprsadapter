import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprotocolComponent } from './createprotocol.component';

describe('CreateprotocolComponent', () => {
  let component: CreateprotocolComponent;
  let fixture: ComponentFixture<CreateprotocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateprotocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateprotocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
