import { NgModule } from "@angular/core";

/* modal-component */
import { PackageModalComponent } from './components/modals/packageModal/packageModal.component';
import { OutputModalComponent } from './components/modals/outputModal/outputModal.component';
import { BackInfoModalComponent } from './components/modals/BackInfoModal/BackInfoModal.component';
import { AddHandworkModalComponent } from './components/modals/add-handwork-modal/add-handwork-modal.component';
import { InHandworkModalComponent } from './components/modals/in-handwork-modal/in-handwork-modal.component';
import { ReissueModalComponent } from './components/modals/reissue-modal/reissue-modal.component';
import { OrderDetailModalComponent } from "./components/modals/order-detail-modal/order-detail-modal.component";
import { LoadingModule } from "ngx-loading";
import { NgaModule } from "../../theme/nga.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Select2Module } from "ng2-select2";
import { NgbDropdownModule, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { MomentModule } from "angular2-moment";
import { NgDatepickerModule } from 'ng2-datepicker';
import { SendMailModalComponent } from "./components/modals/send-mail-modal/send-mail-modal.component";
import { EditWeightModalComponent } from "./components/modals/edit-weight-modal/edit-weight-modal.component";
import { ProfitDetailModalComponent } from "./components/modals/order-detail-modal/profit-detail-modal/profit-detail-modal.component";

@NgModule({
    imports:[
        LoadingModule,
        NgaModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Select2Module,
        NgbDropdownModule,
        NgbModalModule,
        NgbModule,
        NgxPaginationModule,
        MomentModule,
        NgDatepickerModule,
    ],
    declarations: [
        /* modalComponents */
        PackageModalComponent,
        OutputModalComponent,
        BackInfoModalComponent,
        OrderDetailModalComponent,
        AddHandworkModalComponent,
        InHandworkModalComponent,
        ReissueModalComponent,
        SendMailModalComponent,
        EditWeightModalComponent,
        ProfitDetailModalComponent
    ],
    entryComponents: [
        PackageModalComponent,
        OutputModalComponent,
        BackInfoModalComponent,
        OrderDetailModalComponent,
        AddHandworkModalComponent,
        InHandworkModalComponent,
        ReissueModalComponent,
        SendMailModalComponent,
        EditWeightModalComponent,
        ProfitDetailModalComponent
    ],
    exports: [
        PackageModalComponent,
        OutputModalComponent,
        BackInfoModalComponent,
        OrderDetailModalComponent,
        AddHandworkModalComponent,
        InHandworkModalComponent,
        ReissueModalComponent,
        SendMailModalComponent,
        EditWeightModalComponent,
        ProfitDetailModalComponent
    ]
})
export class OrderModalModule { }
