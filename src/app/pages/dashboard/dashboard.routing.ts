import { Routes, RouterModule }  from '@angular/router';

import { Dashboard } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
