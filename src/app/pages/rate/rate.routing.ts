import { Routes, RouterModule }  from '@angular/router';

import { RateComponent } from './rate.component';

const routes: Routes = [
  {
    path: '',
    component: RateComponent,
  }
];

export const routing = RouterModule.forChild(routes);
