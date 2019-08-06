import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../../shared/component/root.component";
import {PickingFaileRecordService} from "../../../../shared/services/picking-faile-record.service";
import {PackagePickingFailLackInfoModel} from "../../../../shared/models/pickings/package-picking-fail-lack-info-model";

@Component({
  selector: 'app-enter-purchase',
  templateUrl: './enter-purchase.component.html',
  styleUrls: ['./enter-purchase.component.scss'],
  providers: [PickingFaileRecordService]
})
export class EnterPurchaseComponent extends RootComponent implements OnInit {

  @Input()
  packageId: number;

  detailModel: PackagePickingFailLackInfoModel;

  constructor(private printModal: NgbActiveModal,
              private pickingFaileRecordService: PickingFaileRecordService) {
    super();
  }

  ngOnInit() {
    if (!(this.packageId > 0)) {
      this.alertMessage("没有包裹Id");
      return;
    }
    this.pickingFaileRecordService.getFailPackagePurchaseInfo(this.packageId).subscribe(data => {
      this.detailModel = data.content;
    }, this.handleError);
  }

  closeModal() {
    this.printModal.dismiss();
  }

  doPurchase() {
    let postData = <any>{};
    postData.packageId = this.packageId;
    postData.Items = [];
    for (let item of this.detailModel.items) {
      let itemData = <any>{};
      itemData.skuId = item.skuId;
      if(item.purchaseQty >= 0){
        itemData.quantity = item.purchaseQty;
      }
      else{
        itemData.quantity = 0;
      }
      postData.Items.push(itemData);
    }
    let hasData = postData.Items.findIndex(m=>m.quantity > 0) >= 0;
    if(!hasData){
      this.error('请选择需要采购的Sku');
      return;
    }
    this.confirm("确定采购吗?", () => {
      this.pickingFaileRecordService.confirmPurchase(postData).subscribe(data => {
           this.printModal.close();
      }, this.handleError);
    });
  }
}
