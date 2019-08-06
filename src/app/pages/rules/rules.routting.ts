import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {OrderRulesComponent} from "./order-rules/order-rules.component";
import {RulesComponent} from "./rules.component";
import {StorageRulesComponent} from "./storage-rules/storage-rules.component";
import {LogisticsRulesComponent} from "./logistics-rules/logistics-rules.component";
import {DeliverRulesListComponent} from "./deliver-rules-list/deliver-rules-list.component";
import {SelectPlateformComponent} from "./deliver-rules-list/select-plateform/select-plateform.component";

const routes: Routes = [
  {
    path: '',
    component: RulesComponent,
    children: [
      { path: 'orderRules', component:OrderRulesComponent },
      { path: 'storageRules', component:StorageRulesComponent},
      { path: 'logisticsRules', component:LogisticsRulesComponent},
      { path: 'selectPlateform', component:SelectPlateformComponent},
      { path: 'deliverRulesList', component:DeliverRulesListComponent},
    ]
  }
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
