import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../../shared/component/root.component";
import {OrderService} from "../../../../../shared/services/order-service";
import {OrderDefuseParam} from "../../../../../shared/models/orders/order-detail-model";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-split-order-modal',
  templateUrl: './split-order-modal.component.html',
  styleUrls: ['./split-order-modal.component.scss'],
  providers:[OrderService]
})
export class SplitOrderModalComponent extends RootComponent implements OnInit {
  OrderId:number;
  externalOrderId:string;
  orderNumber:string;
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  SearchParam: OrderDefuseParam;
  totalOrderDetails:any[]=[];
  orderDetailItem = [];
  constructor(private activeModal: NgbActiveModal,
    private modalService: NgbModal,private orderService: OrderService) {
    super();
    this.SearchParam=new OrderDefuseParam();
  }

  ngOnInit() {
    this.onQuery();
  }

  pageChanged(pN: number): void {
    this.onQuery(pN);
  }

  onQuery(pageNumber: number = 1){
  this.SearchParam.orderId= this.OrderId;
    this.SearchParam.pageIndex = pageNumber - 1;
    this.SearchParam.pageSize = this.PageInfo.pageSize;
    this.orderService.orderDefuseQuery(this.SearchParam).subscribe(data => {
      this.orderDetailItem = data.content.items;
      console.log(this.orderDetailItem);
      for(let i=0;i<this.orderDetailItem.length;i++){
        let  currentOrderDetail= this.totalOrderDetails.find(f=>f.id === this.orderDetailItem[i].id);
        if(currentOrderDetail) {
          this.orderDetailItem[i].defuseCount = currentOrderDetail.defuseCount;
          this.orderDetailItem[i].statusInt=currentOrderDetail.statusInt;
        }
      }
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    },this.handleError);
  }
  closeModal() {
    this.activeModal.close();
  }
  RefusedOrder(){
    this.orderService.OrderDefuse(this.totalOrderDetails,this.OrderId).subscribe(data => {
      this.activeModal.close(true);
    },this.handleError);
  }
  addRefused(target:any,item:any){
    if(Number(target.value)> item.count){
      //target.value= '';
      item.defuseCount=0;
      return;
    }
    let  currentOrderDetail= this.totalOrderDetails.find(f=>f.id === item.id);
    if (currentOrderDetail) {
      currentOrderDetail.defuseCount=target.value;
    }else {
      var existOrderDetail=this.orderDetailItem.find(f=>f.id===item.id);
      existOrderDetail.defuseCount = target.value;
      this.totalOrderDetails.push(existOrderDetail);
    }
  }

  changStatus(target:any,item:any){
    let  currentOrderDetail= this.totalOrderDetails.find(f=>f.id === item.id);
    if (currentOrderDetail) {
      currentOrderDetail.statusInt=target.value;
    }else {
      var existOrderDetail=this.orderDetailItem.find(f=>f.id===item.id);
      existOrderDetail.statusInt = target.value;
      this.totalOrderDetails.push(existOrderDetail);
    }
  }
  loadData()
  {

  }
}
