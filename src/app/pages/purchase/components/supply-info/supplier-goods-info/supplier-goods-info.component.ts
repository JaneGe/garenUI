import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SupplierGoodsListComponent} from "../../modals/supplier-goods-list/supplier-goods-list.component";
import {ImportSupplierComponent} from "../../modals/import-supplier/import-supplier.component";

@Component({
  selector: 'supplier-goods-info',
  templateUrl: './supplier-goods-info.component.html',
  styleUrls: ['../../public.scss','./supplier-goods-info.component.scss']
})
export class SupplierGoodsInfoComponent implements OnInit {
  pageSize:number=1;
  totalCount:number=1;
  pageIndex:number=1;
  status:Array<any>=['全部','可用','停用'];
  selectedstatu='全部';
  searchKind:Array<any>=['供应商名称'];
  selectedsearchKind='SKU';
  supplierInfo=[
    {supplierName:'test1',id:1,supplyNum:10,historyPurchase:0,recentDealTime:'2017-10-30 12:25:10',status:'可用',
     supplierGoodsInfo:[
        {id:1,sku:'gfhdfh435',skuName:'呵呵',price:10,minPurchase:1,handInDate:7,updateTime:'2017/10/30 17:45'},
        {id:2,sku:'yuytsdf345',skuName:'嘿嘿',price:10,minPurchase:1,handInDate:7,updateTime:'2017/10/30 17:45'},
        {id:3,sku:'AScxz46',skuName:'哈哈',price:10,minPurchase:1,handInDate:7,updateTime:'2017/10/30 17:45'},
      ]
    },
    {supplierName:'test2',id:2,supplyNum:10,historyPurchase:0,recentDealTime:'2017-10-30 12:25:10',status:'可用',
      supplierGoodsInfo:[{id:3,sku:'AScxz46',skuName:'哈哈',price:10,minPurchase:1,handInDate:7,updateTime:'2017/10/30 17:45'},
      ]
    },
    {supplierName:'test3',id:3,supplyNum:10,historyPurchase:0,recentDealTime:'2017-10-30 12:25:10',status:'可用',
      supplierGoodsInfo:[]
    },
    ];
  constructor(private ModalService:NgbModal) { }

  ngOnInit() {
    this.loadData();
  }
  selectStatu(val:any){
    this.selectedstatu=val;
  }
  selectsearchKind(val:any){
    this.selectedsearchKind=val;
  }
  pageChanged(pn:any){
    this.loadData(pn)
  }
  topage(page:any){
    this.loadData(page);
  }
  loadData(pageIndex:number=1){
    this.pageIndex=pageIndex;
    this.totalCount=this.supplierInfo.length;
  }
  tolast(){
    var lastPage;
    if(this.totalCount%this.pageSize==0){lastPage=this.totalCount/this.pageSize}
    else {lastPage=this.totalCount/this.pageSize+1}
    this.loadData(lastPage);
  }
  openSupplierGoodsList(supplierName:any,supplierId:any){
    const activeModal = this.ModalService.open(SupplierGoodsListComponent, {size: 'lg'});
    activeModal.componentInstance.modalHeader = `${supplierName} 的供货信息`;
    activeModal.componentInstance.supplierGoodsInfo = this.supplierInfo.find(value=>value.id==supplierId).supplierGoodsInfo;
    activeModal.result.then(result => {
    })
  }
  improtSupplierGoodsList(){
    const activeModal = this.ModalService.open(ImportSupplierComponent, {size: 'sm'});
    activeModal.componentInstance.modalHeader = `导入供货信息`;
    activeModal.componentInstance.text = '供应商供货信息';
    activeModal.result.then(result => {
    })
  }
}
