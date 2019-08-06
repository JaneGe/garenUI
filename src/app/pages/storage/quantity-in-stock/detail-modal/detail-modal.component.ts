import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RemarksComponent} from "../remarks/remarks.component";
import * as JQuery from "jquery";
import {StockService} from "../stock.service";
import {RootComponent} from "../../../../shared/component/root.component";

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent extends RootComponent implements OnInit {
  reportInfo:reportInfoModel=new reportInfoModel();
  modalHeader:string='';
  constructor(private ModalService:NgbModal,
              private activaModal:NgbActiveModal ,
              private StockService:StockService,) {super(); }

  ngOnInit() {
  }
  closeModal(){
    this.activaModal.close();
  }
  changeStatus(editOne:any){
    this.activaModal.close(editOne);
  }
  openRemarksModal(sku:any){
    const activeModal=this.ModalService.open(RemarksComponent,
      {size:'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '添加备注';
    activeModal.result.then(result=>{
      if(result!=undefined){
        var time=new Date().toLocaleString();
        JQuery('.info').prepend("<p>"+time+"xxx对SKU【"+sku+"】做了<span> 备注 </span>操作，备注是“"+result+ "”</p>")
        console.log(JQuery('.info p:first-child'));
        JQuery('.info p:first-child').css({fontSize:"13px",margin:"0"});
        JQuery('.info p:first-child span').css({"color":"red","font-weight":"500"});
        console.log(result);
      }
    })
  }
}
export class reportInfoModel{
  operateKind:any;
  status:any;
  SKU:any;
  time:any;
  num:any;
  reason:any;
  total:any;
  available:any;
}
