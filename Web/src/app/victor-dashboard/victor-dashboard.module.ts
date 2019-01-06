import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VictorDashboardComponent } from './victor-dashboard/victor-dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VictorDashboardComponent],
  exports: [ VictorDashboardComponent]
})
export class VictorDashboardModule { }
