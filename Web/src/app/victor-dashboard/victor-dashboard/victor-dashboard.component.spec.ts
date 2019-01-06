import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VictorDashboardComponent } from './victor-dashboard.component';

describe('VictorDashboardComponent', () => {
  let component: VictorDashboardComponent;
  let fixture: ComponentFixture<VictorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VictorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VictorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
