import { Routes, RouterModule } from '@angular/router';
import {WarehouseStatisticsComponent} from "./warehouse-statistics.component";
import {LogisticsDistributionComponent} from "./logistics-distribution/logistics-distribution.component";
import {PackageDeliverComponent} from "./package-deliver/package-deliver.component";
import {PackageStatisticsComponent} from "./man-performance/package-statistics/package-statistics.component";
import {PickupStatisticsComponent} from "./man-performance/pickup-statistics/pickup-statistics.component";
import {UnpackageStatisticsComponent} from "./man-performance/unpackage-statistics/unpackage-statistics.component";
import {WeightStatisticsComponent} from "./man-performance/weight-statistics/weight-statistics.component";
const routes: Routes = [
    {
        path: '',
        component: WarehouseStatisticsComponent,
        children: [
            { path: 'logisticsDistribution', component: LogisticsDistributionComponent },
            { path: 'packageDeliver', component: PackageDeliverComponent },

            { path: 'packagestatistics', component: PackageStatisticsComponent },
            { path: 'pickupstatistics', component: PickupStatisticsComponent },
            { path: 'unpackagestatistics', component: UnpackageStatisticsComponent },
            { path: 'weightstatistics', component: WeightStatisticsComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
