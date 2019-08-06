import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FinanceComponent } from './finance.component';
import { ReconciliationComponent } from './components/reconciliation/reconciliation.component';
import { FreightChargeComponent } from './components/freight-charge/freight-charge.component';
import { DepreciateListComponent } from './components/depreciate-list/depreciate-list.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: FinanceComponent,
        children: [
            { path: 'reconciliation', component: ReconciliationComponent },
            { path: 'freight-charge', component: FreightChargeComponent },
            { path: 'depreciate-list', component: DepreciateListComponent },
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
