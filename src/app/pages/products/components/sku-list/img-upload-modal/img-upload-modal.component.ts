import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgUploaderOptions } from 'ngx-uploader';
import {CommonService} from "../../../../../shared/services/common-service";
import {RootComponent} from "../../../../../shared/component/root.component";

@Component({
  selector: 'app-img-upload-modal',
  templateUrl: './img-upload-modal.component.html',
  styleUrls: ['./img-upload-modal.component.scss'],
  providers:[CommonService]
})
export class ImgUploadModalComponent extends RootComponent implements OnInit {
  public defaultPicture = 'assets/img/theme/default_logo.png';

  public profile: any = {
    picture: 'assets/img/theme/default_logo.png'
  };

  public uploaderOptions: NgUploaderOptions = { url: '' };
  brandId: number;

  recordUrl: string = null;

  constructor(private activeModal: NgbActiveModal,
              private  commonService: CommonService) {
    super();
     this.uploaderOptions.url = this.commonService.getSkuImageUploadUrl();
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.dismiss();
  }
  picUpload(r) {

  }
  picUploadCompleted(r){
    if (JSON.parse(r.response).IsSuccess == true) {
      this.alertMessage("上传成功");
      const url = JSON.parse(r.response).Result;
      this.activeModal.close(url);
    }
    else {
      this.error("上传图片失败！");
    }
  }
}

