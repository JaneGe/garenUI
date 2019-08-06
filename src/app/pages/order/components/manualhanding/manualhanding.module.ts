import { NgModule } from '@angular/core';
import { Select2Module } from 'ng2-select2';
import { MomentModule } from "angular2-moment";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";

/* manual-work-component */
import { ManualhandingComponent } from './manualhanding.component';
import { NoSkuComponent } from "./no-sku/no-sku.component";
import { SearchHeadComponent } from "./search-head/search-head.component";
import { TableComponent } from './table/table.component';
import { AlreadyPayComponent } from './already-pay/already-pay.component';
import { NeedManualComponent } from './need-manual/need-manual.component';
import { LossedCustomsComponent } from './lossed-customs/lossed-customs.component';
import { AlreadyAuditComponent } from './already-audit/already-audit.component';
import { FailedAllocateComponent } from './failed-allocate/failed-allocate.component';
import { FailedFreightComponent } from './failed-freight/failed-freight.component';
import { LowProfitComponent } from './low-profit/low-profit.component';
import { NoStorageComponent } from './no-storage/no-storage.component';
import { AlreadyAllocateComponent } from './already-allocate/already-allocate.component';
import { AlreadyGoodsComponent } from './already-goods/already-goods.component';
import { ErrorLogisticsComponent } from './error-logistics/error-logistics.component';
import { AlreadyPrintComponent } from './already-print/already-print.component';
import { AlreadyDeliverComponent } from './already-deliver/already-deliver.component';
import { FailedBackComponent } from './failed-back/failed-back.component';
import { AlreadyCancelComponent } from './already-cancel/already-cancel.component';
import { OuttimeRiskComponent } from './outtime-risk/outtime-risk.component';
import { LossedInfoComponent } from './lossed-info/lossed-info.component';
import { NeedtraceNumComponent } from './needtrace-num/needtrace-num.component';
import { AutoAllocateComponent } from './modals/auto-allocate/auto-allocate.component';
import { AddRecordComponent } from './needtrace-num/add-record/add-record.component';
import { routing } from './manualhanding.routing';
import { MergeOrderComponent } from './merge-order/merge-order.component';
import { NgDatepickerModule } from 'ng2-datepicker';
import { CancelDeliverComponent } from './cancel-deliver/cancel-deliver.component';
import { ManualFeedBackComponent } from "./manualFeedBack/manualFeedBack.component";
import { EditeBackInfo } from "./modals/edite-back-info/edite-back-info.component.ts.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Select2Module,
        NgbDropdownModule,
        NgbModalModule,
        NgbModule,
        NgxPaginationModule,
        NgDatepickerModule,
        MomentModule,
        routing,
    ],
    declarations: [
        ManualhandingComponent,
        NoSkuComponent,
        SearchHeadComponent,
        TableComponent,
        AlreadyPayComponent,
        NeedManualComponent,
        LossedCustomsComponent,
        AlreadyAuditComponent,
        FailedAllocateComponent,
        FailedFreightComponent,
        LowProfitComponent,
        NoStorageComponent,
        AlreadyAllocateComponent,
        AlreadyGoodsComponent,
        ErrorLogisticsComponent,
        AlreadyPrintComponent,
        AlreadyDeliverComponent,
        FailedBackComponent,
        AlreadyCancelComponent,
        OuttimeRiskComponent,
        LossedInfoComponent,
        NeedtraceNumComponent,
        AutoAllocateComponent,
        AddRecordComponent,
        MergeOrderComponent,
        CancelDeliverComponent,
        ManualFeedBackComponent,
        EditeBackInfo,
    ],
    entryComponents: [
        AutoAllocateComponent,
        AddRecordComponent,
        EditeBackInfo
    ]
})
export class ManualhandingModule { }
