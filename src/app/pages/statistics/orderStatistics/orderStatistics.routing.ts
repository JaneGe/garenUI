import { Routes, RouterModule } from '@angular/router';
import {OrderStatisticsComponent} from "./orderStatistics.component";
import {OrderBackMoneyComponent} from "./order-back-money/order-back-money.component";
import {OrderCountryComponent} from "./order-country/order-country.component";
import {OrderMoneyComponent} from "./order-money/order-money.component";
import {OrderNumComponent} from "./order-num/order-num.component";
import {OrderBackNumComponent} from "./order-back-num/order-back-num.component";
import {OrderAccountComponent} from "./order-account/order-account.component";
import {OrderTracenumComponent} from "./order-tracenum/order-tracenum.component";
import {OrderTransportComponent} from "./order-transport/order-transport.component";
import {OrderFreightComponent} from "./order-freight/order-freight.component";
import {OrderCountryMoneyComponent} from "./order-country-money/order-country-money.component";
import {OrderAccountMoneyComponent} from "./order-account-money/order-account-money.component";
import {GroupSaleComponent} from "./group-sale/group-sale.component";
import {OrderLoseMoneyComponent} from "./order-lose-money/order-lose-money.component";

const routes: Routes = [
    {
        path: '',
        component: OrderStatisticsComponent,
        children: [
            { path: 'order-back-money', component: OrderBackMoneyComponent },
            { path: 'order-back-num', component: OrderBackNumComponent },
            { path: 'order-country', component: OrderCountryComponent },
            { path: 'order-country-money', component: OrderCountryMoneyComponent },
            { path: 'order-account', component: OrderAccountComponent },
            { path: 'order-account-money', component: OrderAccountMoneyComponent },
            { path: 'order-money', component: OrderMoneyComponent },
            { path: 'order-num', component: OrderNumComponent },
            { path: 'order-tracenum', component: OrderTracenumComponent },
            { path: 'order-transport', component: OrderTransportComponent },
            { path: 'order-freight', component: OrderFreightComponent },
            { path: 'groupsale', component: GroupSaleComponent },
            { path: 'order-lose-money', component: OrderLoseMoneyComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
