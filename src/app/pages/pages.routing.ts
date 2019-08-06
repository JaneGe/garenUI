import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { NoAuthGuard } from "../shared/services/no-auth-guard.service";
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'updatingSystem',
    loadChildren: 'app/pages/updating-system/updating-system.module#UpdatingSystemModule'
  },

  {
    path: 'error-page/:errorCode',
    loadChildren: 'app/pages/error-page/error-page.module#ErrorPageModule'
  },

  {
    path: 'pages',
    component: Pages,
    canActivate: [NoAuthGuard],
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'index', loadChildren: './index/index.module#IndexModule' },
      { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },//设置
      { path: 'storage', loadChildren: './storage/storage.module#StorageModule' },
      { path: 'logistics', loadChildren: './logistics/logistics.module#LogisticsModule' },//物流
      { path: 'order', loadChildren: './order/order.module#OrderModule' },//订单
      { path: 'skuinfos', loadChildren: './products/products.module#ProductsModule' },//商品
      { path: 'rules', loadChildren: './rules/rules.module#RulesModule' },
      { path: 'purchase', loadChildren: './purchase/purchase.module#PurchaseModule' },
      { path: 'rate', loadChildren: './rate/rate.module#RateModule' },
      { path: 'systemsetting', loadChildren: './system-setting/systemSetting.module#SystemSettingModule' },
      { path: 'statistics', loadChildren: './statistics/statistics.module#StatisticsModule' },
      { path: 'customer-services', loadChildren: './customer-services/customer-services.module#CustomerServicesModule' },
      { path: 'selectProducts', loadChildren: './selectProducts/selectProducts.module#SelectProductsModule'},
      { path: 'finance', loadChildren: './finance/finance.module#FinanceModule' },

      // { path: 'supplierManage', loadChildren: './supplier-manage/supplier.module#SupplierManageModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
