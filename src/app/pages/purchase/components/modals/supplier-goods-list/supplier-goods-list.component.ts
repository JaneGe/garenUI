import { Component, OnInit } from '@angular/core';
import * as Slide from '../../../../../shared/animations/modal-Slide';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-supplier-goods-list',
  templateUrl: './supplier-goods-list.component.html',
  styleUrls: ['../../public.scss','../modal-public.scss','./supplier-goods-list.component.scss']
})
export class SupplierGoodsListComponent implements OnInit {
  node:any;
  supplierGoodsInfo:Array<any>=[
    {id:null,sku:'',skuName:'',price:null,minPurchase:null,handInDate:null,updateTime:''},];
  pageSize:number=1;
  totalCount:number=1;
  pageIndex:number=1;
  modalHeader:string='';

  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit() {
    this.node=document.getElementById("form").parentNode.parentNode.parentNode;
    Slide.slideIn(this.node);
  }
  loadData(pageIndex:number=1){
    this.pageIndex=pageIndex;
    this.totalCount=this.supplierGoodsInfo.length;
  }
  pageChanged(pn:any){
    this.loadData(pn)
  }
  closeModal(){
    Slide.slideLeft(this.node,this);
  }
  del(skuId:any){
    this.supplierGoodsInfo.splice(this.supplierGoodsInfo.findIndex(value => skuId==value.id),1);
  }
}
