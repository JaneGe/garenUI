import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHeadComponent } from "./order-head/order-head.component";
import { OrderCountryComponent } from "./order-country/order-country.component";
import { OrderNumComponent } from "./order-num/order-num.component";
import { OrderBackMoneyComponent } from "./order-back-money/order-back-money.component";
import { OrderMoneyComponent } from "./order-money/order-money.component";
import { routing } from "./orderStatistics.routing";
import { OrderStatisticsComponent } from "./orderStatistics.component";
import { OrderBackNumComponent } from './order-back-num/order-back-num.component';
import { NgxPaginationModule } from "ngx-pagination";
import { TabelChartService } from "./tabelChart.service";
import { NgDatepickerModule } from "ng2-datepicker";
import { TrafficChart } from "./trafficChart/trafficChart.component";
import { NgaModule } from "../../../theme/nga.module";
import { ChannelDataService } from "./ChannelData.service";
import { OrderAccountComponent } from './order-account/order-account.component';
import { SortPipe } from "./sort.pipe";
import { OrderTracenumComponent } from './order-tracenum/order-tracenum.component';
import { TablePieChartComponent } from './table-pie-chart/table-pie-chart.component';
import { TablePieChartService } from "./table-pie-chart/tablePieChart.service";
import { OrderTransportComponent } from './order-transport/order-transport.component';
import { OrderFreightComponent } from './order-freight/order-freight.component';
import { OrderCountryMoneyComponent } from './order-country-money/order-country-money.component';
import { OrderAccountMoneyComponent } from './order-account-money/order-account-money.component';
import { GroupSaleComponent } from './group-sale/group-sale.component';
import { Select2Module } from "ng2-select2";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { OrderLoseMoneyComponent } from './order-lose-money/order-lose-money.component';
import { DetailMoneyStatisticsComponent } from "./modals/detail-money-statistics/detailMoneyStatistics.component";
import { OrderModalModule } from 'app/pages/order/order-modal.module';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    NgDatepickerModule,
    NgaModule,
    NgbModule,
    Select2Module,
    OrderModalModule,
    routing
  ],
  declarations: [
    TrafficChart,
    OrderStatisticsComponent,
    OrderMoneyComponent,
    OrderBackMoneyComponent,
    OrderNumComponent,
    OrderCountryComponent,
    OrderHeadComponent,
    OrderBackNumComponent,
    OrderAccountComponent,
    SortPipe,
    OrderTracenumComponent,
    TablePieChartComponent,
    OrderTransportComponent,
    OrderFreightComponent,
    OrderCountryMoneyComponent,
    OrderAccountMoneyComponent,
    GroupSaleComponent,
    OrderLoseMoneyComponent,
    DetailMoneyStatisticsComponent
  ],
  providers: [
    TabelChartService,
    ChannelDataService,
    TablePieChartService
  ],
  exports: [
    SortPipe,
    TrafficChart
  ],
  entryComponents: [
    DetailMoneyStatisticsComponent
  ]
})
export class OrderStatisticsModule { }
