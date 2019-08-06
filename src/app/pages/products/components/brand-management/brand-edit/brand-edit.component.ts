import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../../../shared/component/root.component";
import {environment} from "../../../../../../environments/environment";
import {NgUploaderOptions} from 'ngx-uploader';
import {CommonService} from "../../../../../shared/services/common-service";
import {BrandService} from "../../../../../shared/services/brand-service";

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss'],
  providers: [CommonService,BrandService]
})
export class BrandEditComponent extends RootComponent implements OnInit {
  public defaultPicture = 'assets/img/theme/default_logo.png';
  /* 用户图片 */
  public profile: any = {
    picture: 'assets/img/theme/default_logo.png'
  };
  public uploaderOptions: NgUploaderOptions = {url: ''};

  brandId: number;

  brandName: string = null;
  recordUrl: string = null;
  brandNote: string = null;

  imgUrl: string = null;

  constructor(private activeModal: NgbActiveModal,
              private  commonService: CommonService,
              private brandService: BrandService) {
    super();
    this.uploaderOptions.url = this.commonService.getBrandImageUploadUrl();
  }

  ngOnInit() {
    if (this.brandId > 0) {

      this.brandService.getBrandDetail(this.brandId).subscribe(data => {
        this.profile.picture = data.content.imageUrl;
        this.imgUrl = data.content.imageUrl;
        this.brandName = data.content.name;
        this.recordUrl = data.content.recordUrl;
        this.brandNote = data.content.note;
      }, this.handleError);

    }
    this.uploaderOptions.url = this.commonService.getBrandImageUploadUrl();
  }

  closeModal() {
    this.activeModal.close();
  }


  picUpload(r) {
  }

  picUploadCompleted(r) {
    if (JSON.parse(r.response).IsSuccess == true) {
      this.imgUrl = null;
      const url = JSON.parse(r.response).Result;
      this.imgUrl = url;
    }
    else {
      this.error("修改品牌图片失败！");
    }
  }

  onSaveBrand() {
    if (this.brandId > 0) {
      if (this.imgUrl == null) {
        this.error("服务器出现错误！");
        return;
      }

    }
    else
    {
      if (this.imgUrl == null) {
        this.error("必须选择图片！");
        return;
      }
    }

    if (this.brandName == null|| this.brandName.trim()=='') {
      this.error("品牌名称为必填项！");
      return;
    }
    if (this.recordUrl == null|| this.recordUrl.trim()=='' ) {
      this.error("品牌备案地址为必填项！");
      return;
    }


    let date = {
      id: this.brandId,
      name: this.brandName,
      imageUrl: this.imgUrl,
      recordUrl: this.recordUrl,
      note: this.brandNote
    }
    console.log(date);
    this.brandService.saveBrandInfo(date).subscribe(data => {
      this.alertMessage("保存品牌信息成功");
      this.activeModal.close(true);
    }, this.handleError);
  }
}

