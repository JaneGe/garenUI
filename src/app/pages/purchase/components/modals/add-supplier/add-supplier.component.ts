import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as Slide from '../../../../../shared/animations/modal-Slide'
@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['../../public.scss','../modal-public.scss','./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {
  searchKind:Array<any>=['供应商名称','联系人',];
  selectedsearchKind='供应商名称';
  supplierInfo=[
    {supplierName:'test1',id:1,contacter:'张三',address:'xx街',price:100,minPurchase:10,getday:7,upDateTime:'2017-10-30 12:25:10',},
    {supplierName:'test2',contacter:'李四',address:'yy街',id:2,price:50,minPurchase:30,getday:7,upDateTime:'2017-10-30 12:25:10',},
    {supplierName:'test3',contacter:'王五',address:'jj街',id:3,price:50,minPurchase:10,getday:10,upDateTime:'2017-10-30 12:25:10',}
    ];
  selectedSupplierID:number=null;
  pageSize:number=1;
  totalCount:number=1;
  pageIndex:number=1;
  node:any;
  modalHeader:string='';

  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit() {
    this.node=document.getElementById('form').parentNode.parentNode.parentNode;
    Slide.slideIn(this.node);
    this.loadData();
  }
  loadData(pageIndex:number=1){
    this.totalCount=this.supplierInfo.length;
  }
  pageChanged(pn:number){
    this.loadData(pn);
  }
  closeModal(){
    Slide.slideLeft(this.node,this);
  }
  submit(){
    var supplier=this.supplierInfo.find(value =>value.id==this.selectedSupplierID);
    Slide.slideRight(this.node,this,supplier);
  }
  selectSiglefirstID(id:any){
    this.selectedSupplierID=id;
  }
  selectsearchKind(val:any){
    this.selectedsearchKind=val;
  }
}
