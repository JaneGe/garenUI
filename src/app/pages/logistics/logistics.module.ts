import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './logistics.routing';
import { MaxDeclarationValueListComponent } from './components/max-declaration-value-list/max-declaration-value-list.component';
import { LogisticStyleModalComponent } from './components/modals/logisticStyleModal/logisticStyleModal.component';
import { ShippingServiceListComponent } from './components/shipping-service-list/shipping-service-list.component';
import { ChooseApiTemplateComponent } from './components/modals/chooseApiTemplate/chooseApiTemplate.component';
import { AddLogisticRuleComponent } from './components/modals/addLogisticRule/addLogisticRule.component';
import { SpAuthListComponent } from './components/sp-auth-list/sp-auth-list.component';
import { SpAuthComponent } from './components/sp-auth-list/sp-auth/sp-auth.component';
import { MaxPriceComponent } from './components/modals/maxPrice/maxPrice.component';
import { MomentModule } from "angular2-moment";


import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogisticsComponent } from './logistics.component';
import { NgxPaginationModule } from "ngx-pagination";
import { Select2Module } from 'ng2-select2';
import { ShippingServiceSettingComponent }
  from './components/modals/shipping-service-setting/shipping-service-setting.component';
import { ImportTraceNumComponent } from './components/shipping-service-list/import-trace-num/import-trace-num.component';
import { NgaModule } from "../../theme/nga.module";
import { RulesInCountryComponent } from './components/modals/rules-in-country/rules-in-country.component';
import { InShamTracknumberComponent } from 'app/pages/logistics/components/modals/in-sham-tracknumber/in-sham-tracknumber.component';
import { VirtualTracknumberSettingComponent } from 'app/pages/logistics/components/modals/virtual-tracknumber-setting/virtual-tracknumber-setting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgaModule,
    NgbModalModule,
    NgxPaginationModule,
    Select2Module,
    MomentModule,
    routing
  ],
  declarations: [
    LogisticsComponent,
    SpAuthListComponent,
    SpAuthComponent,
    MaxDeclarationValueListComponent,

    AddLogisticRuleComponent,
    LogisticStyleModalComponent,
    MaxPriceComponent,
    ShippingServiceListComponent,
    ChooseApiTemplateComponent,
    ShippingServiceSettingComponent,
    ImportTraceNumComponent,
    RulesInCountryComponent,
    InShamTracknumberComponent,
    VirtualTracknumberSettingComponent
  ],
  entryComponents: [
    SpAuthComponent,
    AddLogisticRuleComponent,
    LogisticStyleModalComponent,
    MaxPriceComponent,
    ChooseApiTemplateComponent,
    ShippingServiceSettingComponent,
    ImportTraceNumComponent,
    RulesInCountryComponent,
    InShamTracknumberComponent,
    VirtualTracknumberSettingComponent
  ]
})
export class LogisticsModule { }
