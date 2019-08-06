import { Routes, RouterModule } from '@angular/router';

import { LogisticsComponent } from './logistics.component';
import { SpAuthListComponent } from './components/sp-auth-list/sp-auth-list.component';
import { MaxDeclarationValueListComponent } from './components/max-declaration-value-list/max-declaration-value-list.component';
import { ShippingServiceListComponent } from './components/shipping-service-list/shipping-service-list.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LogisticsComponent,
    children: [
      { path: 'sp-auth-list', component: SpAuthListComponent },
      { path: 'shipping-service-list', component: ShippingServiceListComponent },
      { path: 'max-declartion-list', component: MaxDeclarationValueListComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
