import {RouterModule, Routes} from "@angular/router";
import {SystemSettingComponent} from "./system-setting.component";
import {ModuleWithProviders} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: SystemSettingComponent,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
