import { Routes, RouterModule } from '@angular/router';

import { PurchaseComponent } from './purchase.component';
import { PurchasePondComponent } from './components/purchase-pond/purchase-pond.component';
import { PurchasePondDetailComponent } from './components/purchase-pond-detail/purchase-pond-detail.component';
import { PurchaseSuggestComponent } from 'app/pages/purchase/components/purchase-suggest/purchase-suggest.component';
import {NoAuthGuard} from "../../shared/services/no-auth-guard.service";
import {Purchase1688Component} from "./components/purchase-1688/purchase-1688.component";
import {SupplierListComponent} from "./components/supplier-list/supplier-list.component";
import {SupplyInfoComponent} from "./components/supply-info/supply-info.component";
import { AccountListComponent } from './components/account-list/account-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [NoAuthGuard],
        component: PurchaseComponent,
        children: [
            { path: 'purchasePond', component: PurchasePondComponent },
            { path: 'purchasePondDetail', component: PurchasePondDetailComponent },
            { path: 'purchaseSuggest/:id/:state', component: PurchaseSuggestComponent },
            { path: '1688purchaseOrder', component: Purchase1688Component },
            { path: 'supplierlist', component: SupplierListComponent },
            { path: 'supplyInfo', component: SupplyInfoComponent },
            { path: 'account-list', component: AccountListComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
