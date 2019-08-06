import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../../shared/component/root.component";
import { ChooseWarehouseLogisticsModalComponent } from '../choose-warehouse-logistics-modal/choose-warehouse-logistics-modal.component';
import { OrderService } from "../../../../../shared/services/order-service";

@Component({
  selector: 'app-merge-order-modal',
  templateUrl: './merge-order-modal.component.html',
  styleUrls: ['./merge-order-modal.component.scss'],
  providers: [OrderService]
})
export class MergeOrderModalComponent extends RootComponent implements OnInit {
  OrderId: string;
  chooseOrdersId: any[] = [];
  orderDetailItem: any[] = [];
  allChecked: boolean;
  constructor(private activeModal: NgbActiveModal,
    private modalService: NgbModal, private orderService: OrderService) {
    super();
  }

  ngOnInit() {
    this.onQuery();
  }

  onQuery() {
    this.orderService.orderCombineQuery(this.OrderId).subscribe(data => {
      this.orderDetailItem = data.content;
      console.log(this.orderDetailItem);

    }, this.handleError);
  }

  closeModal() {
    this.activeModal.close();
  }

  CheckAllOrder($event) {
    this.allChecked = $event.checked;
    console.log(this.allChecked);

    for (let i of this.orderDetailItem) {
      i.isChoose = this.allChecked;
    }
  };

  Checked($event, index) {
    this.orderDetailItem[index].isChoose = $event.checked;
    if ($event.checked) {
      for (let i in this.orderDetailItem) {
        if (!this.orderDetailItem[i].isChoose) {
          this.allChecked = false;
          break;
        } else {
          this.allChecked = true;
        }
      }
    } else {
      this.allChecked = false;
    }
  }

  chooseWarehouseLogisticsModal() {
    this.chooseOrdersId = [];
    for (let i = 0; i < this.orderDetailItem.length; i++) {
      if (this.orderDetailItem[i].isChoose) {
        this.chooseOrdersId.push(this.orderDetailItem[i].orderId);
      }

    }
    // for(let detail in this.orderDetailItem){
    //    if(detail.isChoose){
    //      this.chooseOrdersId.push(detail.id);
    //    }
    // }

    const modal = this.modalService.open(ChooseWarehouseLogisticsModalComponent, { size: 'sm', backdrop: 'static' });
    modal.componentInstance.chooseOrdersId = this.chooseOrdersId;
    modal.componentInstance.orderId = this.OrderId;
    modal.result.then(result => {
      //this.loadOrderData();
      if (result === 1) {
        this.closeModal();
      }
    }, reason => {
    })
  }
}
