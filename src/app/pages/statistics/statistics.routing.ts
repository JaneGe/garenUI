import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from "./statistics.component";
import { NoAuthGuard } from "../../shared/services/no-auth-guard.service";
const routes: Routes = [
    {
        path: '',
        canActivate: [NoAuthGuard],
        component: StatisticsComponent,
        children: [
            { path: 'orderstatistics', loadChildren: './orderStatistics/orderStatistics.module#OrderStatisticsModule' },
            { path: 'purchase-statistics', loadChildren: './purchaseStatistics/purchaseStatistics.module#PurchaseStatisticsModule' },
            { path: 'warehouse-statistics', loadChildren: './warehouse-statistics/warehouse-statistics.module#WarehouseStatisticsModule' },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
