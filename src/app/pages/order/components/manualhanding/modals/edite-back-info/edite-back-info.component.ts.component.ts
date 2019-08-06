import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderExceptionService} from "../../../../../../shared/services/orderException-service";
import {RootComponent} from "../../../../../../shared/component/root.component";
import {EditCompleteSaleOrderInfoModel} from "../../../../../../shared/models/orders/edit-complete-sale-order-info-model";
import {ShopAccountService} from "../../../../../../shared/services/shop.account.service";
import {ChannelCarrierCodeModel} from "../../../../../../shared/models/channels/channel-carrier-code-model";

@Component({
  selector: 'app-edite-back-info.component.ts',
  templateUrl: './edite-back-info.component.ts.component.html',
  styleUrls: ['./edite-back-info.component.ts.component.scss'],
  providers:[ShopAccountService,OrderExceptionService]
})
export class EditeBackInfo extends RootComponent implements OnInit {
  public options: Select2Options;
  public value: string = null;
  public current: string;
  @Input()
  orderId: number;


  allLogistics = null;
  carrierCodes: ChannelCarrierCodeModel[] = [];
  constructor(private activeModal: NgbActiveModal,
              private shopAccountService: ShopAccountService,
              private orderExceptionService: OrderExceptionService) {
    super();
  }

  orderInfo: EditCompleteSaleOrderInfoModel = null;

  ngOnInit() {
    if (this.orderId > 0) {
      this.orderExceptionService.getCompleteSaleInfo(this.orderId).subscribe(data => {
        this.orderInfo = data.content;
        this.value = this.orderInfo.carrierCode;
        this.shopAccountService.getAllCarrierCodes(this.orderInfo.channelType).subscribe(d => {
          this.carrierCodes = d.content;
          let cData = [];
          for(const item of this.carrierCodes){
            const itemCode = <any>{};
            itemCode.id = item.code;
            itemCode.text = item.name;
            cData.push(itemCode);
          }
          this.allLogistics = cData;
        }, this.handleError);
      }, this.handleError);
    }
  }
  closeModal() {
    this.activeModal.dismiss();
  }
  onChanged(data: { value: string }) {
    console.info(data);
    this.orderInfo.carrierCode = data.value;
  }
  doCompleteSaleInfo(){
    const data = <any>{};
    data.orderId = this.orderInfo.orderId;
    data.trackingNumber = this.orderInfo.completeSaleNumber;
    data.carrierCode = this.orderInfo.carrierCode;
    data.carrireName = this.orderInfo.carrierName;

    this.orderExceptionService.doEditCompleteSaleInfo(data).subscribe(re=>{
      this.alertMessage("提交成功");
      this.activeModal.close();
    }, this.handleError);
  }
}
