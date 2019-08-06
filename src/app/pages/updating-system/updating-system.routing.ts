import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {UpdatingSystemComponent} from "./updating-system.component";

export const routes: Routes = [
  {
    path: '',
    component: UpdatingSystemComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
