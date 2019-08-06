import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../../../shared/component/root.component";
import {PackageFeeService} from "../../../../../shared/services/package-fee-service";
import {SpPackageDetailModel} from "../../../../../shared/models/Package/sp-package-detail-model";

@Component({
  selector: 'app-in-freight',
  templateUrl: './in-freight.component.html',
  styleUrls: ['./in-freight.component.scss'],
  providers: [PackageFeeService]
})
export class InFreightComponent extends RootComponent implements OnInit {

  @Input()
  packageId: string;

  packageData: SpPackageDetailModel = null;

  spWeight: number;
  spFeeAmount: number;

  constructor(private activeModal: NgbActiveModal,
              private packageFeeService: PackageFeeService) {
    super();
    this.packageData = new SpPackageDetailModel();
  }

  ngOnInit() {
    if (this.packageId == null) {
      this.error("没有包裹");
      return;
    }

    this.packageFeeService.getPackageSpFeeDetail(this.packageId).subscribe(data => {
      this.packageData = data.content;

      this.spFeeAmount = this.packageData.spShippingFee;
      this.spWeight = this.packageData.spWeight;

    }, this.handleError);
  }

  saveSpData() {
    if(this.spWeight == null || !(this.spWeight > 1)){
      this.error("请填写重量");
      return;
    }
    if(this.spFeeAmount == null || !(this.spFeeAmount > 1)){
      this.error("请填写运费");
      return;
    }

    const postData = <any>{};
    postData.packageId = this.packageId;
    postData.weight = this.spWeight;
    postData.feeAmount = this.spFeeAmount;

    this.packageFeeService.saveSpFeeChecking(postData).subscribe(data => {
      this.alertMessage('保存成功');
      this.activeModal.close();
    }, this.handleError);
  }

  closeModal() {
    this.activeModal.dismiss();
  }

}
