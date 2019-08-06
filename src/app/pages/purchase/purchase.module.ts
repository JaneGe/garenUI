import { NgModule } from '@angular/core';
import { routing } from './purchase.routing';

import { PurchaseComponent } from './purchase.component';
import { PurchasePondComponent } from './components/purchase-pond/purchase-pond.component';
import { PurchasePondDetailComponent } from './components/purchase-pond-detail/purchase-pond-detail.component';
import { PurchaseSuggestComponent } from './components/purchase-suggest/purchase-suggest.component';
/* modal-component */
import { PurchaseOrderModalComponent } from './components/modals/purchase-order-modal/purchase-order-modal.component';
import { OrderIdDetailModalComponent } from './components/modals/orderId-detail-modal/orderId-detail-modal.component';
import { InventoryHistoryModalComponent } from './components/modals/Inventory-history-modal/Inventory-history-modal.component';
import { SkupurchaseHistoryComponent } from "./components/modals/skupurchase-history/skupurchase-history.component";
import { MoreSkuComponent } from "./components/modals/more-sku/more-sku.component";
import { SupplierGoodsListComponent } from "./components/modals/supplier-goods-list/supplier-goods-list.component";
import { AddSupplierComponent } from "./components/modals/add-supplier/add-supplier.component";
import { ImportSupplierComponent } from "./components/modals/import-supplier/import-supplier.component";
import { EditSupplierComponent } from "./components/modals/edit-supplier/edit-supplier.component";
import { BrowerSupplierComponent } from "./components/modals/brower-supplier/brower-supplier.component";
import { DetailsComponent } from "./components/modals/details/details.component";
import { AddRemarksComponent } from "./components/modals/add-remarks/add-remarks.component";
import { Purchase1688Component } from "./components/purchase-1688/purchase-1688.component";
import { SupplierListComponent } from "./components/supplier-list/supplier-list.component";
import { SkuSupplierInfoComponent } from "./components/supply-info/sku-supplier-info/sku-supplier-info.component";
import { SupplierGoodsInfoComponent } from "./components/supply-info/supplier-goods-info/supplier-goods-info.component";
import { SupplyInfoHeadComponent } from "./components/supply-info/supply-info-head/supply-info-head.component";
import { SupplyInfoComponent } from "./components/supply-info/supply-info.component";
import { PurchaseHistoryModalComponent } from './components/modals/purchase-history-modal/purchase-history-modal.component';
import { Set1688orderModalComponent } from './components/modals/set-1688order-modal/set-1688order-modal.component';
import { CompleteOrderModalComponent } from './components/modals/complete-order-modal/complete-order-modal.component';
import { MomentModule } from "angular2-moment";
import { FiveItemPipe } from "./components/purchase-1688/five-item.pipe";
import { NgDatepickerModule } from 'ng2-datepicker';
import { AddLogisticNumComponent } from './components/modals/add-logistic-num/add-logistic-num.component';
import { OrderDetailsComponent } from './components/modals/details-tabs/order-details/order-details.component';
import { LogisticsComponent } from './components/modals/details-tabs/logistics/logistics.component';
import { LogsComponent } from './components/modals/details-tabs/logs/logs.component';
import { MessageService } from 'app/message.service';
import { ProductsModule } from "../products/products.module";
import { PurchaseModalModule } from './purchase-modal.module';
import { NgbModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Select2Module } from 'ng2-select2';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PurchaseBackupComponent } from "./components/modals/purchaseBackup/purchaseBackup.component";
import { OrderModalModule } from '../order/order-modal.module';
import { PurchasePondDetailOtherComponent } from './components/purchase-pond-detail-other/purchase-pond-detail-other.component';
import { PurchasePondDetail1688Component } from './components/purchase-pond-detail-1688/purchase-pond-detail-1688.component';
import { EditOtherOrderInfoComponent } from './components/modals/edit-other-order-info/edit-other-order-info.component';
import { AliPurchaseComponent } from './components/purchase-1688/ali-purchase/ali-purchase.component';
import { OtherPurchaseComponent } from './components/purchase-1688/other-purchase/other-purchase.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountInfoEditComponent } from './components/modals/account-info-edit/account-info-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    NgxPaginationModule,
    NgDatepickerModule,
    NgbDropdownModule,
    NgbModalModule,
    MomentModule,
    NgbModule,
    PurchaseModalModule,
    routing,
    ProductsModule,
    OrderModalModule
  ],
  declarations: [
    PurchaseComponent,
    PurchasePondComponent,
    PurchaseSuggestComponent,
    PurchaseOrderModalComponent,
    OrderIdDetailModalComponent,
    InventoryHistoryModalComponent,
    PurchasePondDetail1688Component,
    PurchasePondDetailOtherComponent,
    PurchasePondDetailComponent,
    AliPurchaseComponent,
    OtherPurchaseComponent,
    AccountListComponent,

    Purchase1688Component,
    SupplyInfoComponent,
    SupplierListComponent,
    SkuSupplierInfoComponent,
    SupplierGoodsInfoComponent,
    SupplyInfoHeadComponent,
    AddRemarksComponent,
    BrowerSupplierComponent,
    EditSupplierComponent,
    ImportSupplierComponent,
    AddSupplierComponent,
    SupplierGoodsListComponent,
    MoreSkuComponent,
    SkupurchaseHistoryComponent,
    InventoryHistoryModalComponent,
    PurchaseHistoryModalComponent,
    Set1688orderModalComponent,
    CompleteOrderModalComponent,
    FiveItemPipe,
    AddLogisticNumComponent,
    PurchaseBackupComponent,
    EditOtherOrderInfoComponent,
    AccountInfoEditComponent
  ],
  entryComponents: [
    PurchaseOrderModalComponent,
    OrderIdDetailModalComponent,
    InventoryHistoryModalComponent,
    PurchaseHistoryModalComponent,
    Set1688orderModalComponent,
    CompleteOrderModalComponent,
    InventoryHistoryModalComponent,
    OrderDetailsComponent,
    LogisticsComponent,
    LogsComponent,
    AddRemarksComponent,
    BrowerSupplierComponent,
    EditSupplierComponent,
    AddLogisticNumComponent,
    ImportSupplierComponent,
    AddSupplierComponent,
    SupplierGoodsListComponent,
    MoreSkuComponent,
    SkupurchaseHistoryComponent,
    PurchaseBackupComponent,
    EditOtherOrderInfoComponent,
    AccountInfoEditComponent
  ]
})
export class PurchaseModule {
}
