import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {PurchaseService} from "../../purchase-pond/purchase-data.service";
import {OrderPurchaseParam} from "../../../../../shared/models/purchases/purchase-pond-model";
import {RootComponent} from "../../../../../shared/component/root.component";

@Component({
  selector: 'app-purchase-order-modal',
  templateUrl: './purchase-order-modal.component.html',
  styleUrls: ['./purchase-order-modal.component.scss'],
  providers: [PurchaseService]
})
export class PurchaseOrderModalComponent extends RootComponent implements OnInit {
  isWhole = [{ Id: null, Name: '全部' }, { Id: 1, Name: '是' }, { Id: 0, Name: '否' }];

  chooseCondition = [{ Id: 0, Name: '全部' }, { Id: 1, Name: '订单号' }, { Id: 2, Name: 'SKU' }];


  Data = [];
  storeSearchKey:string='';
  condition:number;
  orderId:number;
  searchParam: OrderPurchaseParam;
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  constructor(private purchaseOrdeModal: NgbActiveModal,private purchaseService: PurchaseService) {
    super();
  }

  onSelect($event, type, value) {
    this.searchParam.IsAllInstock = value;
  }

  onSelectConditionChoose($event, type, value) {
    this.condition = value;
    this.OnQuery();
  }

  ngOnInit() {
    this.searchParam=new OrderPurchaseParam();
    this.OnQuery();
  }

  closeModal() {
    this.purchaseOrdeModal.close();
  }

  OnQuery(pageNumber: number = 1){
    this.searchParam.PurchasePlanId=this.orderId;
    this.searchParam.PageIndex = pageNumber - 1;
    this.searchParam.PageSize = this.PageInfo.pageSize;
    this.searchParam.ConditionEnum = this.condition;
    this.searchParam.SearchText = this.storeSearchKey;

    this.purchaseService.OrderPurchasePlanQuery(this.searchParam).subscribe(data => {
      this.Data = data.content.items;
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    }, this.handleError);
  }

  pageChanged(pN: number): void {
    this.OnQuery(pN);
  }
}
