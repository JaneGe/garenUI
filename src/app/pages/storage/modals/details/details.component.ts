import { Component, EventEmitter, NgModule, OnInit, Output, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PlatformOrderDetailSearchModel } from "../../../../shared/models/purchases/purchase-order1688-model";
import { RootComponent } from "../../../../shared/component/root.component";
import { PurchaseOrder1688Service } from 'app/pages/purchase/components/purchase-1688/purchase-1688.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [PurchaseOrder1688Service]
})

export class DetailsComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;
  node: any;
  info = new InfoModel;
  platOrderId: any;
  searchParam: PlatformOrderDetailSearchModel;
  editBill: string = '';
  addWaybillNumbers: string = '';
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 2, pageSize: 20, totalCount: 0 };
  skuRemarks = [];
  logisticsNums = [];
  logisticsList: any;
  notes: any;

  orderDetails: { items: any[], pageInfo: any } = { items: [], pageInfo: {} };
  ifhasError: boolean;
  ifalldone: boolean;
  constructor(private activeModal: NgbActiveModal,
    private modalservice: NgbModal,
    private purchaseOrderService: PurchaseOrder1688Service) {
    super();
  }

  ngOnInit() {
    this.OnQuery();
  }

  tab: number = 0;

  toggelTab(tab: any) {
    this.tab = tab;
    if (tab == 0) {
      $('ul li.line').css('left', '0');
    }
    else if (tab == 1) {
      $('ul li.line').css('left', '100px');
    }
    else {
      $('ul li.line').css('left', '200px');
    }
  }

  deleteTrackingNumber(id: string) {
    this.confirm('确定删除跟踪号?', () => {
      this.purchaseOrderService.DeleteTrackingNumber(id).subscribe(data => {
        this.OnQuery();
        this.alertMessage("删除跟踪号成功!");
      }, this.handleError);
    }, () => {
      return;
    });
  }

  OnQuery(pageNumber: number = 1) {
    this.searchParam = new PlatformOrderDetailSearchModel();
    this.searchParam.PlatformOrderId = this.platOrderId;
    this.searchParam.PageIndex = pageNumber - 1;
    this.searchParam.PageSize = this.PageInfo.pageSize;
    this.purchaseOrderService.GetPlatformOrderSearchQuery(this.searchParam).subscribe(data => {
      this.info = data.content;
      console.log(this.info);

      this.orderDetails = data.content.orderDetails;
      this.logisticsList = data.content.logisticsItems;
      this.notes = data.content.orderNotes;
      this.PageInfo = data.content.orderDetails.pageInfo;
      this.PageInfo.pageIndex++;
      // console.log(this.info);
      console.log(this.orderDetails);
      this.ifhasError = this.orderDetails.items.some(value => {
        return (value.badQuantity != 0 || value.sendWrongQuantity != 0 || value.lackQuantity != 0);
      });
      this.ifalldone = this.orderDetails.items.every(value => {
        return (value.hasException == false);
      });
      // console.log(this.ifalldone);
    });
  }

  pageChanged(pn: number) {
    this.OnQuery(pn);
  }

  closeModal() {
    this.activeModal.close();
  }

}
export  class  InfoModel{
  orderNumber:any;
  sellerName:any;
  payAmount:any;
  orderStatusText:any;
  orderTimeShow:any;
  purchaseNumber:any;
  payTimeShow:any;
  buyerName:any;
  buyerAddress:any;
  logisticsName:any;
  logisticsNumber:any;
  deliverTime:any;
  buyerremarks:any;
  waybillNumbers:{logisticsCompanyName:any,createdByUserId:any,wayBillNumber:any};
}
