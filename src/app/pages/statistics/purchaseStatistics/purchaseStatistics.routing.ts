import { Routes, RouterModule } from '@angular/router';
import { PurchaseStatisticsComponent } from './purchaseStatistics.component';
import { PurchaseMoneyComponent } from './purchase-money/purchase-money.component';
import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
const routes: Routes = [
    {
        path: '',
        component: PurchaseStatisticsComponent,
        children: [
            { path: 'purchase-money', component: PurchaseMoneyComponent },
            { path: 'purchase-detail', component: PurchaseDetailComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
