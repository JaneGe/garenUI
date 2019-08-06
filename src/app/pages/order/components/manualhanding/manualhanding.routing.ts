import { Routes, RouterModule } from '@angular/router';
import { ManualhandingComponent } from './manualhanding.component';
import { AlreadyPayComponent } from './already-pay/already-pay.component';
import { NeedManualComponent } from './need-manual/need-manual.component';
import { NoSkuComponent } from './no-sku/no-sku.component';
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
import { MergeOrderComponent } from './merge-order/merge-order.component';
import {CancelDeliverComponent} from "./cancel-deliver/cancel-deliver.component";
import {ManualFeedBackComponent} from "./manualFeedBack/manualFeedBack.component";

const routes: Routes = [
    {
        path: '',
        component: ManualhandingComponent,
        children: [
            { path: 'alreadyPay', component: AlreadyPayComponent },
            { path: 'needmanual', component: NeedManualComponent },
            { path: 'nosku', component: NoSkuComponent },
            { path: 'lossedcustoms', component: LossedCustomsComponent },
            { path: 'alreadyaudit', component: AlreadyAuditComponent },
            { path: 'failedallocate', component: FailedAllocateComponent },
            { path: 'failedfreight', component: FailedFreightComponent },
            { path: 'lowprofit', component: LowProfitComponent },
            { path: 'nostorage', component: NoStorageComponent },
            { path: 'alreadyallocate', component: AlreadyAllocateComponent },
            { path: 'alreadygoods', component: AlreadyGoodsComponent },
            { path: 'errorlogistics', component: ErrorLogisticsComponent },
            { path: 'alreadyprint', component: AlreadyPrintComponent },
            { path: 'alreadydeliver', component: AlreadyDeliverComponent },
            { path: 'failedback', component: FailedBackComponent },
            { path: 'alreadycancel', component: AlreadyCancelComponent },
            { path: 'outtimerisk', component: OuttimeRiskComponent },
            { path: 'lossinfo', component: LossedInfoComponent },
            { path: 'needtracenum', component: NeedtraceNumComponent },
            { path: 'mergeorder', component: MergeOrderComponent },
            { path: 'canceldeliver', component: CancelDeliverComponent },
            { path: 'manualFeedBack', component: ManualFeedBackComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
