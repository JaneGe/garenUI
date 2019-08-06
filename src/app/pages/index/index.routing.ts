import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {IndexComponent} from "./index.component";
import {IndexbossComponent} from "./indexboss/indexboss.component";
import {IndexemployeeComponent} from "./indexemployee/indexemployee.component";
import {GroupLeaderComponent} from "./group-leader/group-leader.component";
import {StorageEmployeeComponent} from "./storage-employee/storage-employee.component";
import {StorageLeaderComponent} from "./storage-leader/storage-leader.component";
import {FinanceComponent} from "./finance/finance.component";

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: 'boss', component: IndexbossComponent},
      { path: 'employee', component: IndexemployeeComponent},
      { path: 'groupLeader', component: GroupLeaderComponent},
      { path: 'storage-employee', component: StorageEmployeeComponent},
      { path: 'storage-leader', component: StorageLeaderComponent},
      { path: 'finance', component: FinanceComponent},
    ]
  }
];
export const  routing:ModuleWithProviders=RouterModule.forChild(routes);
