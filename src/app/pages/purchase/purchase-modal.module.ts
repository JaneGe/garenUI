import { DetailsComponent } from "./components/modals/details/details.component";
import { LogsComponent } from "./components/modals/details-tabs/logs/logs.component";
import { LogisticsComponent } from "./components/modals/details-tabs/logistics/logistics.component";
import { OrderDetailsComponent } from "./components/modals/details-tabs/order-details/order-details.component";
import { AddLogisticNumComponent } from "./components/modals/add-logistic-num/add-logistic-num.component";
import { NgbModule, NgbModalModule, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { MomentModule } from "angular2-moment";
import { NgDatepickerModule } from "ng2-datepicker";
import { NgxPaginationModule } from "ngx-pagination";
import { Select2Module } from "ng2-select2";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Select2Module,
        NgxPaginationModule,
        NgDatepickerModule,
        NgbDropdownModule,
        NgbModalModule,
        MomentModule,
        NgbModule,
    ],
    declarations: [
        DetailsComponent,
        OrderDetailsComponent,
        LogisticsComponent,
        LogsComponent,
    ],
    exports: [
        OrderDetailsComponent,
        LogisticsComponent,
        LogsComponent,
    ],
    entryComponents: [
        DetailsComponent,
    ]
})
export class PurchaseModalModule {
}
