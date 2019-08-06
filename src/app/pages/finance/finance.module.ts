import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './finance.routing';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FinanceComponent } from './finance.component';
import { ReconciliationComponent } from './components/reconciliation/reconciliation.component';
import { OrderModalModule } from '../order/order-modal.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NgaModule } from '../../theme/nga.module';
import { MomentModule } from 'angular2-moment';
import { InFreightComponent } from './components/modals/in-freight/in-freight.component';
import { InFreightsComponent } from './components/modals/in-freights/in-freights.component';
import { FreightChargeComponent } from './components/freight-charge/freight-charge.component';
import { Select2Module } from 'ng2-select2';
import { DepreciateListComponent } from './components/depreciate-list/depreciate-list.component';
import { PurchaseModalModule } from '../purchase/purchase-modal.module';

@NgModule({
    imports: [
        CommonModule,
        NgbModalModule,
        OrderModalModule,
        NgxPaginationModule,
        NgDatepickerModule,
        NgbModule,
        NgaModule,
        MomentModule,
        Select2Module,
        PurchaseModalModule,
        routing
    ],
    declarations: [
        FinanceComponent,
        ReconciliationComponent,
        FreightChargeComponent,
        DepreciateListComponent,
        /* modal components */
        InFreightComponent,
        InFreightsComponent
    ],
    entryComponents: [
        InFreightComponent,
        InFreightsComponent,
        DepreciateListComponent,
    ]
})

export class FinanceModule { }
