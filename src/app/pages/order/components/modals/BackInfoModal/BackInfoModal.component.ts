import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderInfoService} from "../../../../../shared/services/order.service";
import {OrderService} from "../../../../../shared/services/order-service";
import {RootComponent} from "../../../../../shared/component/root.component";


@Component({
  selector: 'app-BackInfoModal',
  templateUrl: './BackInfoModal.component.html',
  styleUrls: ['./BackInfoModal.component.scss'],
  providers: [OrderInfoService, OrderService]
})
export class BackInfoModalComponent extends RootComponent implements OnInit {
//  logisticeData = ['Basic 1','Basic 2','Basic 3','Basic 4'];
  columns;

  selectAll: boolean = false;

  orderId;
  selectedCompleteSalesStatus: string;

  carrierCode:string;
  carrireName:string;
  trackingNumber;string;
  logisticeData: any[] = [];
  item = [];


  constructor(private postBackModal: NgbActiveModal,
              private orderInfoService: OrderInfoService,
              private orderService: OrderService) {
    super();
  }

  ngOnInit() {
   this.loadData();
    //this.columns = this.orderInfoService.getColumns();
  }

  loadData(){
    this.orderService.GetOrderPostBackInfo(this.orderId)
      .subscribe(data => {
        this.item = data.content;
        for (let o of this.item) {
          this.trackingNumber=o.trackingNumber;
          for (let c of o.channelCarrierCodeModel) {
            const item = <any>{};
            item.id = c.code;
            item.text = `${c.channelType}(${c.code})`;
            this.logisticeData.push(item);
          }
        }

      }, this.handleError);
  }

  onChangeLogisticeDataChanged(data: { value: string }) {
    this.carrierCode = data.value;
  }

  submit() {
    this.orderService.OrderPostBack(this.orderId,this.trackingNumber,this.carrierCode,this.carrireName).subscribe(data => {
      this.closeModal();
      this.alertMessage("执行回传成功");
    }, this.handleError);


  }

  closeModal() {
    this.postBackModal.close();
  }

  allChecked(all: boolean) {
    for (let i of this.columns) {
      if (i.disabled) {
        i.checked = true;
      } else {
        i.checked = !all;
      }
    }
  };

}
