import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './rules.component';
import { OrderRulesComponent } from './order-rules/order-rules.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {NgbDropdownModule, NgbModalModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import {MomentModule} from "angular2-moment";
import {routing} from "./rules.routting";
import { AddrulesModalComponent } from './order-rules/addrules-modal/addrules-modal.component';
import { AppointmoneyComponent } from './detailsModal/appointmoney/appointmoney.component';
import { AppoincommodityComponent } from './detailsModal/appoincommodity/appoincommodity.component';
import { OutrangecountryComponent } from './detailsModal/outrangecountry/outrangecountry.component';
import { LimitingaccountComponent } from './detailsModal/limitingaccount/limitingaccount.component';
import { LimitingcountryComponent } from './detailsModal/limitingcountry/limitingcountry.component';
import { LimitinglabelComponent } from './detailsModal/limitinglabel/limitinglabel.component';
import { StatuspipePipe } from './statuspipe.pipe';
import { StorageRulesComponent } from './storage-rules/storage-rules.component';
import { LogisticsRulesComponent } from './logistics-rules/logistics-rules.component';
import { AddstorageComponent } from './storage-rules/addstorage/addstorage.component';
import { AddlogisticsComponent } from './logistics-rules/addlogistics/addlogistics.component';
import {OrderModule} from "ngx-order-pipe";
import {StorageRulesService} from "./storage-rules/StorageRules.service";
import {OptionsService} from "./options.Service";
import { LimitinglogisticsComponent } from './detailsModal/limitinglogistics/limitinglogistics.component';
import { WeightrangeComponent } from './detailsModal/weightrange/weightrange.component';
import { StoragepipePipe } from './storagepipe.pipe';
import {Ng2CompleterModule} from "ng2-completer";
import { Select2Module } from 'ng2-select2';
import {DeliverRulesListComponent} from "./deliver-rules-list/deliver-rules-list.component";
import { CompleteSaleRuleModalComponent } from './deliver-rules-list/complete-sale-rule-edit-modal/complete-sale-rule-modal.component';
import { SelectPlateformComponent } from './deliver-rules-list/select-plateform/select-plateform.component';
import {limitingattrComponent} from "./detailsModal/limitingAttr/limitingattr.component";
import {LimitingPlatformComponent} from "./detailsModal/limitingPlatform/limitingPlatform.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Select2Module,
    NgbModalModule,
    NgbDropdownModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MomentModule,
    OrderModule,
    Ng2CompleterModule,
    routing
  ],
  declarations: [RulesComponent, OrderRulesComponent, AddrulesModalComponent,
    AppointmoneyComponent, AppoincommodityComponent, OutrangecountryComponent,
    LimitingaccountComponent, LimitingcountryComponent, LimitinglabelComponent,
    StatuspipePipe, StorageRulesComponent, LogisticsRulesComponent, AddstorageComponent,
    AddlogisticsComponent,
    LimitinglogisticsComponent,
    WeightrangeComponent,
    StoragepipePipe,DeliverRulesListComponent,
    CompleteSaleRuleModalComponent, SelectPlateformComponent,limitingattrComponent,
    LimitingPlatformComponent
  ],
  entryComponents:[AddrulesModalComponent,AppointmoneyComponent,AppoincommodityComponent,
    OutrangecountryComponent,LimitingaccountComponent,LimitingcountryComponent,WeightrangeComponent,
    LimitinglabelComponent,AddstorageComponent,AddlogisticsComponent,LimitinglogisticsComponent,
    CompleteSaleRuleModalComponent,limitingattrComponent,LimitingPlatformComponent],
  providers:[StorageRulesService,OptionsService]
})
export class RulesModule { }
