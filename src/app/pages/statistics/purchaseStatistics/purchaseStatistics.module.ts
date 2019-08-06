import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableChartComponent } from './table-chart/table-chart.component';
import { NgxPaginationModule } from "ngx-pagination";
import { TabelChartService } from "./table-chart/tabelChart.service";
import { NgDatepickerModule } from "ng2-datepicker";
import { NgaModule } from "../../../theme/nga.module";
import { ChannelDataService } from "./ChannelData.service";
import { PurchaseHeadComponent } from './purchase-head/purchase-head.component';
import { routing } from './purchaseStatistics.routing';
import { PurchaseStatisticsComponent } from './purchaseStatistics.component';
import { PurchaseMoneyComponent } from './purchase-money/purchase-money.component';
import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
import { AllSkuComponent } from './modals/all-sku/all-sku.component';
import { NgbDropdownModule, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgDatepickerModule,
    NgaModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbModule,
    routing
  ],
  declarations: [
    PurchaseStatisticsComponent,
    TableChartComponent,
    PurchaseHeadComponent,
    PurchaseMoneyComponent,
    PurchaseDetailComponent,
    /* modal */
    AllSkuComponent
  ],
  entryComponents: [
    AllSkuComponent
  ],
  providers: [
    TabelChartService,
    ChannelDataService
  ]
})
export class PurchaseStatisticsModule { }
