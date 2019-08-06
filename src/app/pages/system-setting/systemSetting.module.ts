import {NgModule} from "@angular/core";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {NgaModule} from "../../theme/nga.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {routing} from "./systemSetting.routing";
import {SystemSettingComponent} from "./system-setting.component";
import { EditBrokerageComponent } from './modal/edit-brokerage/edit-brokerage.component';
import {Select2Module} from "ng2-select2";

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    NgaModule,
    NgbModalModule,
    Select2Module,
    routing
  ],
  declarations:[SystemSettingComponent, EditBrokerageComponent],
  entryComponents:[EditBrokerageComponent],
  providers:[],
})
export class SystemSettingModule{}
