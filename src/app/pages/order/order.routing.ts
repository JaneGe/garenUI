import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';
import { OrderSearchComponent } from './components/orderSearch/orderSearch.component';
import { PackageSearchComponent } from './components/packageSearch/packageSearch.component';
import { ShippingTrackComponent } from './components/shippingTrack/shippingTrack.component';
import { PostbackingComponent } from './components/postbacking/postbacking.component';
import { PendingAllocationComponent } from './components/pending-allocation/pending-allocation.component';
import { SalesReturnListComponent } from './components/sales-return-list/sales-return-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      { path: 'orderSearch', component: OrderSearchComponent },
      { path: 'packageSearch', component: PackageSearchComponent },
      { path: 'shippingTrack', component: ShippingTrackComponent },
      { path: 'postbacking', component: PostbackingComponent },
      { path: 'pending-allocation', component: PendingAllocationComponent },
      { path: 'salesReturn', component: SalesReturnListComponent },
      { path: 'manualhanding', loadChildren: './components/manualhanding/manualhanding.module#ManualhandingModule' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
