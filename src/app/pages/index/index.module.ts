import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { routing } from "./index.routing";
import { IndexbossComponent } from "./indexboss/indexboss.component";
import { IndexemployeeComponent } from "./indexemployee/indexemployee.component";
import { FormsModule } from "@angular/forms";
import { AppTranslationModule } from "../../app.translation.module";
import { NgaModule } from "../../theme/nga.module";
import { TrafficChart } from "./trafficChart/trafficChart.component";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { GroupLeaderComponent } from './group-leader/group-leader.component';
import { BossDataService } from "./indexboss/bossData.service";
import { EmployeeData } from "./indexemployee/employeeData";
import { NoticeService } from "../../shared/services/notice.service";
import { StorageEmployeeComponent } from './storage-employee/storage-employee.component';
import { StorageLeaderComponent } from './storage-leader/storage-leader.component';
import { FinanceComponent } from './finance/finance.component';
import { ModalModule } from './modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    NgbModalModule,
    ModalModule,
    routing,
  ],
  declarations: [
    IndexComponent,
    IndexbossComponent,
    IndexemployeeComponent,
    TrafficChart,
    GroupLeaderComponent,
    StorageEmployeeComponent,
    StorageLeaderComponent,
    FinanceComponent
  ],
  providers: [BossDataService, EmployeeData, NoticeService],
})
export class IndexModule { }
