import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { StorageComponent } from './storage.component';
import { SettingComponent } from './setting/setting.component';
import { ReceiveRecordComponent } from "./receive-record/receive-record.component";
import { UnpackingComponent } from "./unpacking/unpacking.component";
import { ShipmentsComponent } from './shipments/shipments.component';
import { PackageScanComponent } from './package-scan/package-scan.component';
import { PackingTaskComponent } from './packing-task/packing-task.component';

import { QuantityInStockComponent } from "./quantity-in-stock/quantity-in-stock.component";
import { StorageFlowComponent } from "./storage-flow/storage-flow.component";
import { SecondTimesComponent } from "./second-times/second-times.component";
import { ThirdTimesComponent } from "./third-times/third-times.component";
import { CheckPackageComponent } from "./check-package/check-package.component";
import { AbnormalPackageComponent } from './abnormal-package/abnormal-package.component';
import { ShelfManagementComponent } from './shelf-management/shelf-management.component';
import { AreaManagementComponent } from './area-management/area-management.component';
import { PackageReturnListComponent } from "./package-return-list/package-return-list.component";
import { GoodsPartsUnpackingComponent } from './goods-parts-unpacking/goods-parts-unpacking.component';
import { UndeliverPackageComponent } from "./undeliverPackage/UndeliverPackage.component";
import { ShipmentListComponent } from './shipment-list/shipment-list.component';

const routes: Routes = [
  {
    path: '',
    component: StorageComponent,
    children: [
      { path: 'setting', component: SettingComponent },
      { path: 'receiverecord', component: ReceiveRecordComponent },
      { path: 'unpacking', component: UnpackingComponent },
      { path: 'shipments', component: ShipmentsComponent },
      { path: 'quantity', component: QuantityInStockComponent },
      { path: 'storageFlow', component: StorageFlowComponent },
      { path: 'packageScan', component: PackageScanComponent },
      { path: 'packingTask', component: PackingTaskComponent },
      { path: 'SecondTimes', component: SecondTimesComponent },
      { path: 'ThirdTimes', component: ThirdTimesComponent },
      { path: 'checkPackage', component: CheckPackageComponent },
      { path: 'abnormal-package', component: AbnormalPackageComponent },
      { path: 'goods-parts-unpacking', component: GoodsPartsUnpackingComponent },
      { path: 'package-return-list', component: PackageReturnListComponent },
      { path: 'shelf-management/:id', component: ShelfManagementComponent },
      { path: 'area-management/:id', component: AreaManagementComponent },
      { path: 'undeliverPackage', component: UndeliverPackageComponent },
      { path: 'shipment-list', component: ShipmentListComponent },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
