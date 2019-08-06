import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';
import { AccountBindModule } from './components/accountBind/accountBind.module';
import { NgaModule } from "../../theme/nga.module";
import { NgxPaginationModule } from "ngx-pagination";
import { NgbDropdownModule, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MomentModule } from "angular2-moment";
import { routing } from './settings.routing';

import { DepartmentListComponent } from './components/department/department-list.component';
import { SettingsComponent } from 'app/pages/settings';
import { RoleListComponent } from './components/role/role-list.component';
import { MemberListComponent } from './components/member/member-list.component';
import { DepartmentModalComponent } from './components/department/department/department-modal.component';
import { RoleModalComponent } from "./components/role/role-modal.component";
import { MemberModalComponent } from "./components/member/member-modal.component";
import { MemberListPipe } from "./components/member/member-list.pipe";
import { NoticeComponent } from './components/notice/notice.component';
import { SettingKpiComponent } from './components/settingKpi/settingKpi.component';
import { UserInfoComponent } from './components/userInfo/userInfo.component';

import { AddKpiModalComponent } from "./components/modals/addKpiModal/addKpiModal.component";
import { InKpiModalComponent } from "./components/modals/inKpiModal/inKpiModal.component";
import { SettingPasswordComponent } from "./components/modals/settingPassword/settingPassword.component";
import { BlacklistComponent } from './components/blacklist/blacklist.component';
import { BlackListModalComponent } from './components/modals/blackListModal/blackListModal.component';
import { AddShuadanModalComponent } from './components/modals/addShuadanModal/addShuadanModal.component';
import { Select2Module } from 'ng2-select2';
import { TreeDiagramComponent } from './components/department/treeDiagram/treeDiagram.component';
import { SetLoginInfoComponent } from './components/modals/set-login-info/set-login-info.component';
import { RoleEditComponent } from 'app/pages/settings/components/modals/role-edit/role-edit.component';
import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgbModule,
    NgbModalModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgDatepickerModule,
    NgxPaginationModule,
    MomentModule,
    CKEditorModule,
    Select2Module,
    routing,
    AccountBindModule
  ],
  declarations: [
    SettingsComponent,
    DepartmentListComponent,
    RoleListComponent,
    MemberListComponent,
    DepartmentModalComponent,
    RoleModalComponent,
    MemberModalComponent,
    MemberListPipe,

    TreeDiagramComponent,

    AddKpiModalComponent,
    InKpiModalComponent,
    SettingPasswordComponent,
    NoticeComponent,
    SettingKpiComponent,
    UserInfoComponent,
    BlacklistComponent,
    BlackListModalComponent,
    AddShuadanModalComponent,
    SetLoginInfoComponent,
    RoleEditComponent
  ],
  entryComponents: [
    DepartmentModalComponent,
    RoleModalComponent,
    MemberModalComponent,
    AddKpiModalComponent,
    InKpiModalComponent,
    SettingPasswordComponent,
    BlackListModalComponent,
    AddShuadanModalComponent,
    SetLoginInfoComponent,
    RoleEditComponent
  ],
  providers: [
  ]
})
export class SettingsModule {
}
