import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../../shared/component/root.component";
import {PackageDefuseParam} from "../../../../../shared/models/Package/package-detail-model";
import {PackageService} from "../../../../../shared/services/package-search-service";

@Component({
  selector: 'app-split-package-modal',
  templateUrl: './split-package-modal.component.html',
  styleUrls: ['./split-package-modal.component.scss'],
  providers: [PackageService]
})
export class SplitPackageModalComponent extends RootComponent implements OnInit {
  orderDetailItem = [];
  totalOrderDetails = [];
  packageId:number;
  //packageNumber:string;
  SearchParam: PackageDefuseParam;
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  constructor(private modal: NgbActiveModal, private packageSearchService: PackageService) {
    super();
  }

  ngOnInit() {
    this.SearchParam =new PackageDefuseParam();
    this.onQuery();
  }

  onQuery(pageNumber: number = 1){
    this.SearchParam.packageId= this.packageId;
    this.SearchParam.pageIndex = pageNumber - 1;
    this.SearchParam.pageSize = this.PageInfo.pageSize;
    this.packageSearchService.packageDefuseQuery(this.SearchParam).subscribe(data => {
      this.orderDetailItem = data.content.items;
      for(let i=0;i<this.orderDetailItem.length;i++){
        let  currentOrderDetail= this.totalOrderDetails.find(f=>f.id === this.orderDetailItem[i].id);
        if(currentOrderDetail) {
          this.orderDetailItem[i].defuseCount = currentOrderDetail.defuseCount;
          this.orderDetailItem[i].statusInt=currentOrderDetail.statusInt;
        }
      }
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    }, this.handleError);
  }

  RefusedPackage(){
    if(this.totalOrderDetails.length < 1){
      this.error("没有可以拆分的商品");
      return;
    }
    this.packageSearchService.packageDefuse(this.totalOrderDetails,this.packageId).subscribe(data => {
      this.closeModal();
    },this.handleError);
  }

  addRefused(target:any,item:any){
    if(Number(target.value)> item.quantity){
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
  pageChanged(pN: number): void {
    this.onQuery(pN);
  }

  closeModal() {
    this.modal.close();
  }

}




