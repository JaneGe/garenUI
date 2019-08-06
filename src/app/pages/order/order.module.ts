import { NgModule } from '@angular/core';
import { routing } from './order.routing';
import { Select2Module } from 'ng2-select2';
import { MomentModule } from "angular2-moment";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";

/* pages-component */
import { OrderComponent } from './order.component';
import { OrderSearchComponent } from './components/orderSearch/orderSearch.component';
import { PackageSearchComponent } from './components/packageSearch/packageSearch.component';
import { ShippingTrackComponent } from './components/shippingTrack/shippingTrack.component';
import { PostbackingComponent } from './components/postbacking/postbacking.component';

/* manual-work-component */
import { CompletionDeclarationModalComponent } from "./components/modals/CompletionDeclarationModal/CompletionDeclarationModal.component";
import { ChooseSkuModalComponent } from './components/modals/choose-sku-modal/choose-sku-modal.component';
import { AddOrderNoteModalComponent } from './components/modals/add-order-note-modal/add-order-note-modal.component';
import { PendingAllocationComponent } from "./components/pending-allocation/pending-allocation.component";
import { SalesReturnListComponent } from "./components/sales-return-list/sales-return-list.component";
import { AddBackOrderComponent } from "./components/sales-return-list/add-back-order/add-back-order.component";
import { NgDatepickerModule } from 'ng2-datepicker';
import { SplitOrderModalComponent } from './components/modals/split-order-modal/split-order-modal.component';
import { MergeOrderModalComponent } from './components/modals/merge-order-modal/merge-order-modal.component';
import { ChooseWarehouseLogisticsModalComponent } from './components/modals/choose-warehouse-logistics-modal/choose-warehouse-logistics-modal.component';
import { PackageReallocateLogisticsComponent } from "./components/modals/reallocate-logistics/reallocate-logistics.component";
import { NgaModule } from 'app/theme/nga.module';
import { SplitPackageModalComponent } from './components/modals/split-package-modal/split-package-modal.component';
import { ShippingDetailsComponent } from './components/shippingTrack/shipping-details/shipping-details.component';
import { OrderModalModule } from './order-modal.module';
import { LoadingModule } from 'ngx-loading';
import { PurchaseModalModule } from '../purchase/purchase-modal.module';
import { PackageListComponent } from './components/packageSearch/package-list/package-list.component';
import { AbnormalWeightListComponent } from './components/packageSearch/abnormal-weight-list/abnormal-weight-list.component';

@NgModule({
  imports: [
    NgaModule,
    LoadingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    NgbDropdownModule,
    NgbModalModule,
    NgbModule,
    NgxPaginationModule,
    MomentModule,
    NgDatepickerModule,
    routing,
    OrderModalModule,
    PurchaseModalModule
  ],
  declarations: [
    OrderComponent,
    OrderSearchComponent,
    PackageSearchComponent,
    ShippingTrackComponent,
    PostbackingComponent,
    /* modalComponents */
    CompletionDeclarationModalComponent,
    ChooseSkuModalComponent,
    AddOrderNoteModalComponent,
    PendingAllocationComponent,
    SalesReturnListComponent,
    AddBackOrderComponent,
    SplitOrderModalComponent,
    MergeOrderModalComponent,
    ChooseWarehouseLogisticsModalComponent,
    PackageReallocateLogisticsComponent,
    SplitPackageModalComponent,
    ShippingDetailsComponent,
    PackageListComponent,
    AbnormalWeightListComponent
  ],
  entryComponents: [
    CompletionDeclarationModalComponent,
    ChooseSkuModalComponent,
    AddOrderNoteModalComponent,
    AddBackOrderComponent,
    ShippingDetailsComponent,
    SplitOrderModalComponent,
    MergeOrderModalComponent,
    ChooseWarehouseLogisticsModalComponent,
    PackageReallocateLogisticsComponent,
    SplitPackageModalComponent
  ],
})
export class OrderModule { }
