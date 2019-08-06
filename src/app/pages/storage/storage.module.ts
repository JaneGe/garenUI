import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgaModule } from "../../theme/nga.module";
import { NgxPaginationModule } from "ngx-pagination";
import { MomentModule } from "angular2-moment";
import { Select2Module } from 'ng2-select2';

import { StorageComponent } from './storage.component';
import { routing } from './storage.routing';
import { SettingComponent } from './setting/setting.component';
import { ShelfManageModalComponent } from './setting/shelf-manage-modal/shelf-manage-modal.component';
import { BatchManageModalComponent } from './setting/batch-manage-modal/batch-manage-modal.component';
import { EditModalComponent } from './setting/edit-modal/edit-modal.component';
import { CreateModalComponent } from './setting/create-modal/create-modal.component';
import { PrintLabelComponent } from './modals/printLabel/printLabel.component';


import { SettingsService } from './setting/setting.service';
import { AddshelfComponent } from './setting/shelf-manage-modal/addshelf/addshelf.component';
import { WarehouseDetailComponent } from './setting/warehouse-detail/warehouse-detail.component';
import { ReceiveRecordComponent } from './receive-record/receive-record.component';
import { UnpackingComponent } from './unpacking/unpacking.component';
import { ReceiveRecordPipe } from "./receive-record/receive-record.pipe";
import { QuantityInStockComponent } from './quantity-in-stock/quantity-in-stock.component';

import { ReportModalComponent } from './quantity-in-stock/report-modal/report-modal.component';
import { TransferShelfComponent } from './quantity-in-stock/transfer-shelf/transfer-shelf.component';
import { StockListComponent } from './quantity-in-stock/stock-list/stock-list.component';
import { ReportLostListComponent } from './quantity-in-stock/report-lost-list/report-lost-list.component';
import { ReportOverflowListComponent } from './quantity-in-stock/report-overflow-list/report-overflow-list.component';
import { Ng2CompleterModule } from "ng2-completer";
import { DetailModalComponent } from './quantity-in-stock/detail-modal/detail-modal.component';
import { RemarksComponent } from './quantity-in-stock/remarks/remarks.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { StockService } from "./quantity-in-stock/stock.service";
import { StorageFlowComponent } from './storage-flow/storage-flow.component';
import { NgDatepickerModule } from "ng2-datepicker";
import { PackageScanComponent } from './package-scan/package-scan.component';

import { PrintBillsComponent } from './modals/printBills/printBills.component';
import { PrintTaskComponent } from './modals/printTask/printTask.component';
import { TaskEditComponent } from './modals/taskEdit/taskEdit.component';
import { PopUpComponent } from './setting/pop-up/pop-up.component'


import { PackingTaskComponent } from './packing-task/packing-task.component';
import { SecondTimesComponent } from './second-times/second-times.component';
import { ThirdTimesComponent } from './third-times/third-times.component';
import { CheckPackageComponent } from './check-package/check-package.component';
import { AbnormalPackageComponent } from './abnormal-package/abnormal-package.component';
import { AbnormalDetailComponent } from './modals/abnormalDetail/abnormalDetail.component';
import { TaskDetailComponent } from './modals/task-detail/task-detail.component';
import { IsTroubleComponent } from './modals/isTrouble/isTrouble.component';
import { PackageSkuDetailComponent } from './modals/package-sku-detail/package-sku-detail.component';
import { AllSkuDetailComponent } from './modals/all-sku-detail/all-sku-detail.component';
import { DetailsComponent } from 'app/pages/storage/modals/details/details.component';
import { PrintGoodsBillsComponent } from 'app/pages/storage/modals/print-goods-bills/print-goods-bills.component';
import { ReallocateLogisticsComponent } from 'app/pages/storage/modals/reallocate-logistics/reallocate-logistics.component';
import { SettingReturnReasonComponent } from 'app/pages/storage/modals/setting-return-reason/setting-return-reason.component';
import { ShelfManagementComponent } from './shelf-management/shelf-management.component';
import { AreaManagementComponent } from './area-management/area-management.component';
import { PackageReturnListComponent } from './package-return-list/package-return-list.component';
import { PackageDetailComponent } from 'app/pages/storage/modals/package-detail/package-detail.component';
import { CheckedBillComponent } from 'app/pages/storage/modals/checked-bill/checked-bill.component';
import { TaskListComponent } from 'app/pages/storage/modals/task-list/task-list.component';
import { PackingInventoryComponent } from 'app/pages/storage/modals/packing-inventory/packing-inventory.component';
import { PrintCheckingInventoryTaskModalComponent } from './modals/print-checking-inventory-task-modal/print-checking-inventory-task-modal.component';
import { EnterPurchaseComponent } from 'app/pages/storage/modals/enter-purchase/enter-purchase.component';
import { OrderModalModule } from '../order/order-modal.module';
import { GoodsPartsUnpackingComponent } from './goods-parts-unpacking/goods-parts-unpacking.component';
import { UndeliverPackageComponent } from "./undeliverPackage/UndeliverPackage.component";
import { PurchaseModalModule } from '../purchase/purchase-modal.module';
import { GroupSkuBillModalComponent } from './modals/group-sku-bill-modal/group-sku-bill-modal.component';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';
import {ReserveNumDetailComponent} from "./quantity-in-stock/reserveNumDetail/reserveNumDetail.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgbModalModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MomentModule,
    NgbModule,
    Ng2CompleterModule,
    Select2Module,
    NgDatepickerModule,
    OrderModalModule,
    PurchaseModalModule,
    routing
  ],
  entryComponents: [
    ShelfManageModalComponent,
    BatchManageModalComponent,
    CreateModalComponent,
    EditModalComponent,
    AddshelfComponent,
    WarehouseDetailComponent,
    PrintLabelComponent,
    ReportModalComponent,
    TransferShelfComponent,
    DetailModalComponent,
    RemarksComponent,
    PrintBillsComponent,
    PrintTaskComponent,
    TaskEditComponent,
    AbnormalDetailComponent,
    TaskDetailComponent,
    IsTroubleComponent,
    PackageSkuDetailComponent,
    AllSkuDetailComponent,
    DetailsComponent,
    PrintGoodsBillsComponent,
    ReallocateLogisticsComponent,
    SettingReturnReasonComponent,
    PackageDetailComponent,
    CheckedBillComponent,
    TaskListComponent,
    PackingInventoryComponent,
    PrintCheckingInventoryTaskModalComponent,
    GroupSkuBillModalComponent,
    EnterPurchaseComponent,
    PopUpComponent,
    ReserveNumDetailComponent
  ],
  declarations: [
    SettingComponent,
    StorageComponent,
    ShelfManageModalComponent,
    BatchManageModalComponent,
    EditModalComponent,
    CreateModalComponent,
    AddshelfComponent,
    WarehouseDetailComponent,
    ReceiveRecordComponent,
    UnpackingComponent,
    PrintLabelComponent,
    ReceiveRecordPipe,
    QuantityInStockComponent,
    ReportModalComponent,
    TransferShelfComponent,
    StockListComponent,
    ReportLostListComponent,
    ReportOverflowListComponent,
    DetailModalComponent,
    RemarksComponent,
    ShipmentsComponent,
    StorageFlowComponent,
    PackageScanComponent,
    PrintBillsComponent,
    PackingTaskComponent,
    PrintTaskComponent,
    SecondTimesComponent,
    TaskEditComponent,
    ThirdTimesComponent,
    CheckPackageComponent,
    AbnormalPackageComponent,
    AbnormalDetailComponent,
    TaskDetailComponent,
    IsTroubleComponent,
    PackageSkuDetailComponent,
    AllSkuDetailComponent,
    DetailsComponent,
    PrintGoodsBillsComponent,
    ReallocateLogisticsComponent,
    SettingReturnReasonComponent,
    ShelfManagementComponent,
    AreaManagementComponent,
    PackageReturnListComponent,
    PackageDetailComponent,
    CheckedBillComponent,
    TaskListComponent,
    PackingInventoryComponent,
    PrintCheckingInventoryTaskModalComponent,
    EnterPurchaseComponent,
    GoodsPartsUnpackingComponent,
    GroupSkuBillModalComponent,
    UndeliverPackageComponent,
    ShipmentListComponent,
    PopUpComponent,
    ReserveNumDetailComponent
  ],
  providers: [SettingsService, StockService]
})
export class StorageModule {
}
