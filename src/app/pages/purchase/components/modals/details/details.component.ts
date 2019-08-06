import { Component, EventEmitter, NgModule, OnInit, Output, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as Slide from '../../../../../shared/animations/modal-Slide';
import { PurchaseOrder1688Service } from "../../purchase-1688/purchase-1688.service";
import { PlatformOrderDetailSearchModel } from "../../../../../shared/models/purchases/purchase-order1688-model";
import { AddLogisticNumComponent } from "../add-logistic-num/add-logistic-num.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorityComponent } from "../../../../../shared/component/authority.component";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['../modal-public.scss', './details.component.scss'],
  providers: [PurchaseOrder1688Service]
})

export class DetailsComponent extends AuthorityComponent implements OnInit {
  node: any;
  info: Info = <Info>{};
  platOrderId: any;
  modalHeader: string = '';

  searchParam: PlatformOrderDetailSearchModel;
  editBill: string = '';
  addWaybillNumbers: string = '';
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 2, pageSize: 20, totalCount: 0 };
  skuRemarks = [];
  logisticsNums = [];
  logisticsList: any;
  notes: any;
  isNotShowAnyc:boolean=false;

  orderDetails: { items: any[], pageInfo: any } = { items: [], pageInfo: {} };
  ifhasError: boolean;
  ifalldone: boolean;
  isorderOver: boolean = false;

  isOther: boolean = false;

  @Input()
  unPackSkuStatusShow

  constructor(private activeModal: NgbActiveModal,
    private modalservice: NgbModal,
    private purchaseOrderService: PurchaseOrder1688Service,
    public activerouter: ActivatedRoute,
    public router: Router) {
    super(activerouter, router);
  }

  ngOnInit() {
    this.OnQuery();
    if (this.unPackSkuStatusShow === ('手工完结' || '已销单'))
      this.isorderOver = true;
  }


  addlogisticsNum(logisticsCompanyName?: any, target?: any, wayBillNumber?: any, id?: any) {
    if (target) {
      const modal = this.modalservice.open(AddLogisticNumComponent, { size: 'lg', backdrop: 'static' });
      modal.componentInstance.modalHeader = '修改运单号';
      modal.componentInstance.wayBillNumber = wayBillNumber;
      modal.componentInstance.logistic = logisticsCompanyName;
      modal.result.then((result) => {
        if (result != undefined) {
          this.purchaseOrderService.UpdatePlatformLogistics(this.platOrderId, result.wayBillNumber, id, result.logistic)
            .subscribe(data => {
              this.OnQuery();
            }, this.handleError);
          this.OnQuery();
          console.log(result);
        }
      }, () => null);
    }
    else {
      const modal = this.modalservice.open(AddLogisticNumComponent, { size: 'lg', backdrop: 'static' });
      modal.componentInstance.modalHeader = '添加运单号';
      modal.componentInstance.isEdit = false;
      modal.componentInstance.platOrderId = this.platOrderId;
      modal.result.then((result) => {
        if (result != undefined) {
          this.purchaseOrderService.AddPlatformLogistics(this.platOrderId, result.wayBillNumber, result.logistic)
            .subscribe(data => {
              this.OnQuery();
            }, this.handleError);
          this.OnQuery();
          console.log(result);
        }
      }, () => null);
    }
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
      this.orderDetails = data.content.orderDetails;
      this.logisticsList = data.content.logisticsItems;
      this.notes = data.content.orderNotes;
      this.PageInfo = data.content.orderDetails.pageInfo;
      this.PageInfo.pageIndex++;
      // console.log(this.orderDetails);
      this.ifhasError = this.orderDetails.items.some(value => {
        return (value.badQuantity != 0 || value.sendWrongQuantity != 0 || value.lackQuantity != 0);
      });
      this.ifalldone = this.orderDetails.items.every(value => {
        return (value.hasException == false);
      });

    });
  }

  pageChanged(pn: number) {
    this.OnQuery(pn);
  }

  closeModal() {
    //Slide.slideLeft(this.node, this);
    this.activeModal.close(1);
  }
  orderOver() {
    this.isorderOver = true;
    this.confirm("确定完结订单?", () => {
      this.purchaseOrderService.manualFinishPurchaseOrder(this.platOrderId).subscribe(data => {
        this.alertMessage("处理成功");
        this.OnQuery();
      }, this.handleError)
    });
  }

  sync() {
    this.activeModal.close(1);
  }
}
export class Info {
  orderNumber: any;
  sellerName: any;
  payAmount: any;
  orderStatusText: any;
  orderTimeShow: any;
  purchaseNumber: any;
  payTimeShow: any;
  buyerName: any;
  buyerAddress: any;
  orderStatus: any;
  skuStatus: any;
  logisticsNumber: any;
  logisticsName: any;
  deliverTime: any;
  buyerremarks: any;
  waybillNumbers: { id: any, logisticsCompanyName: any, wayBillNumber: any, createdByUserId: any, };
}
