import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../../shared/component/root.component";
@Component({
  selector: 'app-transfer-shelf',
  templateUrl: './transfer-shelf.component.html',
  styleUrls: ['./transfer-shelf.component.scss']
})
export class TransferShelfComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader:string;
  shelf:string='';
  transfer:Array<Transfer>=[new Transfer()];
  shelList:any;
  transferinfo:{fromshelf:string,toshelf:string,num:number}={fromshelf:'',toshelf:'',num:0};
  constructor(private activaModal:NgbActiveModal) {super(); }

  ngOnInit() {
  }
  isUnsignedInteger(a)
  {
    var   reg = /^\+?[1-9][0-9]*$/
    if(!reg.test(a)&&a!=0){
      this.error("数量是正整数!");
      return false;
    }
  }
  OnSubmit(num:any,shelf:any){
    if(this.isUnsignedInteger(num)!=false){
    this.transferinfo.fromshelf=shelf;
    this.transferinfo.toshelf=this.shelf;
    this.transferinfo.num=num;
    this.activaModal.close(this.transferinfo);
    }
  }
  closeModal(){
    this.activaModal.close();
  }
}
export class Transfer{
  Shelf:string;
  SKU:string;
  available:any
}
