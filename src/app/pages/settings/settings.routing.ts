import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { DepartmentListComponent } from './components/department/department-list.component';
import { RoleListComponent } from "./components/role/role-list.component";
import { MemberListComponent } from "./components/member/member-list.component";
import { AccountBindComponent } from './components/accountBind/accountBind.component';
import { NoticeComponent } from './components/notice/notice.component';
import { SettingKpiComponent } from './components/settingKpi/settingKpi.component';
import { UserInfoComponent } from './components/userInfo/userInfo.component';
import { BlacklistComponent } from './components/blacklist/blacklist.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'departments', component: DepartmentListComponent },
      { path: 'roles', component: RoleListComponent },
      { path: 'members', component: MemberListComponent },
      { path: 'account-bind', component: AccountBindComponent },
      { path: 'notice', component: NoticeComponent },
      { path: 'settingKpi', component: SettingKpiComponent },
      { path: 'userInfo', component: UserInfoComponent },
      { path: 'blacklist', component: BlacklistComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
