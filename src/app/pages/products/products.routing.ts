import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { SkusInfoComponent } from "./components/skus-info/skus-info.component";
import { BrandManagementComponent } from './components/brand-management/brand-management.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: 'skuinfos', component: SkusInfoComponent },
      { path: 'brand-management', component: BrandManagementComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
