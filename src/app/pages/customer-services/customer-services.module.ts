import { NgModule } from '@angular/core';
import { routing } from './customer-services.routing';
import { Select2Module } from 'ng2-select2';
import { MomentModule } from "angular2-moment";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";

/* pages-component */
import { CustomerServicesComponent } from './customer-services.component';
import { AmazonServicesComponent } from './components/amazon-services/amazon-services.component';
import { NgDatepickerModule } from 'ng2-datepicker';

/* modal-component */
import { TemplateManagementComponent } from './components/modals/template-management/template-management.component';
import { TemplateEditComponent } from './components/modals/template-edit/template-edit.component';
import { MailDetailModalComponent } from 'app/pages/customer-services/components/modals/mail-detail-modal/mail-detail-modal.component';
import { ReasonModalComponent } from 'app/pages/customer-services/components/modals/reason-modal/reason-modal.component';
import { TemplateListComponent } from 'app/pages/customer-services/components/template-list/template-list.component';
import { PackageModalComponent } from '../order/components/modals/packageModal/packageModal.component';
import { OrderModalModule } from '../order/order-modal.module';
import { WishTicketComponent } from './components/wish-ticket/wish-ticket.component';
import { WishDetailsComponent } from './components/modals/wish-details/wish-details.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Select2Module,
        NgbDropdownModule,
        NgbModalModule,
        NgbModule,
        NgxPaginationModule,
        NgDatepickerModule,
        MomentModule,
        routing,
        OrderModalModule,    
    ],
    entryComponents: [
        TemplateManagementComponent,
        TemplateEditComponent,
        MailDetailModalComponent,
        ReasonModalComponent,
        WishDetailsComponent,
    ],
    declarations: [
        CustomerServicesComponent,
        AmazonServicesComponent,
        /* modalComponents */
        TemplateManagementComponent,
        TemplateEditComponent,
        MailDetailModalComponent,
        ReasonModalComponent,
        TemplateListComponent,
        WishTicketComponent,
        WishDetailsComponent
    ]
})
export class CustomerServicesModule { }
