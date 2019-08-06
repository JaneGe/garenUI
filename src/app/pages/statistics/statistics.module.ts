import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from "./statistics.routing";
import { StatisticsComponent } from "./statistics.component";

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    StatisticsComponent
  ]
})
export class StatisticsModule { }
