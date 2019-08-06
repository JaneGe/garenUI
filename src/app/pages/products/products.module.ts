import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './products.routing';
import { NgxPaginationModule } from "ngx-pagination";

import { NgbDropdownModule, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductsComponent } from "./products.component";
import { SkuListComponent } from "./components/sku-list/sku-list.component";
import { SkusInfoComponent } from "./components/skus-info/skus-info.component";
import { VirtualSkuListComponent } from "./components/virtual-sku-list/virtual-sku-list.component";
import { MomentModule } from "angular2-moment";
import { SkuDetailModalComponent } from './components/sku-list/sku-detail-modal/sku-detail-modal.component';
import { VirtualSkuDetailComponent } from './components/virtual-sku-list/virtual-sku-detail/virtual-sku-detail.component';
import { ChooseSkuModalComponent } from './components/virtual-sku-list/choose-sku-modal/choose-sku-modal.component';
import { Select2Module } from 'ng2-select2';
import { ForbiddenReasonModalComponent } from './components/sku-list/forbidden-reason-modal/forbidden-reason-modal.component';
import { InSkuModalComponent } from './components/sku-list/in-sku-modal/in-sku-modal.component';
import { InVirtualSkuModalComponent } from "./components/virtual-sku-list/in-virtualsku-modal/in-virtualsku-modal.component";
import { NgaModule } from 'app/theme/nga.module';
import { LogisticsSkuComponent } from "./components/logistics-sku/logistics-sku.component";
import { PrintNumberModalComponent } from './components/sku-list/print-number-modal/print-number-modal.component';
import { BrandManagementComponent } from './components/brand-management/brand-management.component';
import { BrandEditComponent } from './components/brand-management/brand-edit/brand-edit.component';
import { ImgUploadModalComponent } from 'app/pages/products/components/sku-list/img-upload-modal/img-upload-modal.component';

@NgModule({
  imports: [
    NgaModule,
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MomentModule,
    Select2Module,
    routing,
  ],
  declarations: [
    BrandManagementComponent,
    ProductsComponent,
    SkuListComponent,
    SkusInfoComponent,
    VirtualSkuListComponent,
    SkuDetailModalComponent,
    VirtualSkuDetailComponent,
    ChooseSkuModalComponent,
    ForbiddenReasonModalComponent,
    InSkuModalComponent,
    InVirtualSkuModalComponent,
    LogisticsSkuComponent,
    PrintNumberModalComponent,
    BrandEditComponent,
    ImgUploadModalComponent
  ],
  entryComponents: [
    SkuDetailModalComponent,
    VirtualSkuDetailComponent,
    ChooseSkuModalComponent,
    ForbiddenReasonModalComponent,
    InSkuModalComponent,
    InVirtualSkuModalComponent,
    PrintNumberModalComponent,
    BrandEditComponent,
    ImgUploadModalComponent
  ],
  exports: [SkuDetailModalComponent]
})
export class ProductsModule {
}
