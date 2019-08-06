import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseStatisticsComponent } from './warehouse-statistics.component';
import {NgxPaginationModule} from "ngx-pagination";
import {routing} from "./warehouseStatistics.routing";
import { PackageDeliverComponent } from './package-deliver/package-deliver.component';
import { LogisticsDistributionComponent } from './logistics-distribution/logistics-distribution.component';
import {FormsModule} from "@angular/forms";
import {OrderStatisticsModule} from "../orderStatistics/orderStatistics.module";
import {NgDatepickerModule} from "ng2-datepicker";
import {NgaModule} from "../../../theme/nga.module";
import { UnpackageStatisticsComponent } from './man-performance/unpackage-statistics/unpackage-statistics.component';
import { PickupStatisticsComponent } from './man-performance/pickup-statistics/pickup-statistics.component';
import { PackageStatisticsComponent } from './man-performance/package-statistics/package-statistics.component';
import { WeightStatisticsComponent } from './man-performance/weight-statistics/weight-statistics.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    OrderStatisticsModule,
    NgDatepickerModule,
    NgaModule,
    routing
  ],
  declarations: [
    WarehouseStatisticsComponent,
    PackageDeliverComponent,
    LogisticsDistributionComponent,
    UnpackageStatisticsComponent,
    PickupStatisticsComponent,
    PackageStatisticsComponent,
    WeightStatisticsComponent]
})
export class WarehouseStatisticsModule { }
