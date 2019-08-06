import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../../shared/component/root.component";
import {environment} from "../../../../../../environments/environment";
import {NgUploaderOptions} from "ngx-uploader/src/classes/ng-uploader-options.class";
import {JwtService} from "../../../../../shared/services/jwt.service";

@Component({
  selector: 'app-in-freights',
  templateUrl: './in-freights.component.html',
  styleUrls: ['./in-freights.component.scss']
})
export class InFreightsComponent extends RootComponent implements OnInit {
  @Input()
  warehouseId: number;

  constructor(private activeModal: NgbActiveModal, private jwtService: JwtService) {
    super();
    this.fileUploaderOptions.authToken = this.jwtService.getToken().toString();
    this.fileUploaderOptions.cors = true;
    this.fileUploaderOptions.url = `${environment.api_url}/api/v1/feerulefinance/ImportSpShippingAmountChecking`;
  }

  public fileUploaderOptions: NgUploaderOptions = {
    url: '',
  };

  ngOnInit() {
    if(this.warehouseId == null){
      this.error("请选择仓库");
      return;
    }
    this.fileUploaderOptions.url =
      `${environment.api_url}/api/v1/feerulefinance/ImportSpShippingAmountChecking?warehouseId=${this.warehouseId}`;
  }

  closeModal() {
    this.activeModal.close();
  }


  uploadCompleted(res: any) {
    let response = JSON.parse(res.response);

    if(response.content == null && !response.success){
      this.error(response.error.message);
      return;
    }
    let data  = response.content;
    let message = "";
    if(data.totalCount > 0 && data.errorMessages.length > 0){
      message += `总数:${data.totalCount},成功:${data.succeedCount},失败:${data.failedCount}.`;
    }
    if(data.failedCount > 0 || data.errorMessages.length>0){
      message += `错误信息如下:\r\n ${data.errorMessages.join(";\r\n")}`;
      this.error(message);
    }
    else{
      this.alertMessage(message);
      this.activeModal.close();
    }
  }

}
