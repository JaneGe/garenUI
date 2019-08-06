import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { AccountBindComponent } from './accountBind.component';
import { EbayComponent } from './components/ebay/ebay.component';
import { AmazonComponent } from './components/amazon/amazon.component';
import { AliexpressComponent } from './components/aliexpress/aliexpress.component';
import { WishComponent } from './components/wish/wish.component';
import { CdComponent } from './components/cd/cd.component';
import { AlibabaComponent } from './components/alibaba/alibaba.component';
import { AddressModalComponent } from './components/modals/1688-address/1688-address.component';
import { AmazonModalComponent } from './components/modals/amazon-modal/amazon-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Add1688AccountComponent } from './components/modals/add1688-account/add1688-account.component';
import { MomentModule } from "angular2-moment";
import { SettingServicesComponent } from './components/modals/setting-services/setting-services.component';
import { AliexpressModalComponent } from './components/modals/aliexpress-modal/aliexpress-modal.component';
import { SettingUserComponent } from './components/modals/setting-user/setting-user.component';
import { Select2Module } from 'ng2-select2';
import { WishAuthModalComponent } from './components/modals/wish-auth-modal/wish-auth-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    MomentModule
  ],
  declarations: [
    AccountBindComponent,
    EbayComponent,
    AmazonComponent,
    AliexpressComponent,
    WishComponent,
    CdComponent,
    AlibabaComponent,
    /* modal */
    AmazonModalComponent,
    AddressModalComponent,
    Add1688AccountComponent,
    SettingServicesComponent,
    AliexpressModalComponent,
    SettingUserComponent,
    WishAuthModalComponent
  ],
  entryComponents: [
    AmazonModalComponent,
    AddressModalComponent,
    Add1688AccountComponent,
    SettingServicesComponent,
    AliexpressModalComponent,
    SettingUserComponent,
    WishAuthModalComponent
  ]
})
export class AccountBindModule { }
