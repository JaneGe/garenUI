import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../../../shared/component/root.component";
import {JwtService} from "../../../../../shared/services/jwt.service";
import { NgUploaderOptions } from 'ngx-uploader';
import {environment} from "../../../../../../environments/environment";
@Component({
  selector: 'app-inKpiModal',
  templateUrl: './inKpiModal.component.html',
  styleUrls: ['./inKpiModal.component.scss']
})
export class InKpiModalComponent extends RootComponent implements OnInit {

  public fileUploaderOptions: NgUploaderOptions = {
     url: `${environment.api_url}/api/v1/employeeKPI/employeeKPIImports`,
  };

  constructor(private activeModal: NgbActiveModal,
              private jwtService: JwtService) {
    super();
  }

  ngOnInit() {
    this.fileUploaderOptions.authToken = this.jwtService.getToken().toString();
    this.fileUploaderOptions.cors = true;
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  uploadCompleted(res: any) {
    let response = JSON.parse(res.response);

    if(response.content == null && !response.success){
      this.error(response.error.message);
      return;
    }
    let data  = response.content;
    let message = "";
    if(data.totalCount > 0 && data.errorMessages.length<0){
      message += `总数:${data.totalCount},成功:${data.succeedCount},失败:${data.failedCount}.`;
    }
    if(data.failedCount > 0 || data.errorMessages.length>0){
      message += `错误信息如下:\r\n ${data.errorMessages.join(";\r\n")}`;
      this.error(message);
      this.activeModal.close();
    }
    else{
      this.alertMessage(message);
      this.activeModal.close();
    }
  }

}
