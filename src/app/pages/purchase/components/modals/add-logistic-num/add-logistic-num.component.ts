import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as Slide from '../../../../../shared/animations/modal-Slide';
import {PurchaseOrder1688Service} from "../../purchase-1688/purchase-1688.service";
@Component({
  selector: 'app-add-logistic-num',
  templateUrl: './add-logistic-num.component.html',
  styleUrls: ['../modal-public.scss','./add-logistic-num.component.scss'],
  providers: [PurchaseOrder1688Service]
})
export class AddLogisticNumComponent  implements OnInit {
  logistics:Array<any>=['顺丰','申通','圆通','中通','百世','韵达','天天','邮政','邮政特快','宅急送','德邦','全峰'];
  node:any;
  logistic:string='';
  isEdit:boolean=false;
  wayBillNumber:string=null;
  modalHeader:string='';
  constructor(private activeModal: NgbActiveModal,private purchaseOrderService: PurchaseOrder1688Service) { }
  ngOnInit() {
    this.node=$('#form2')[0].parentNode.parentNode.parentNode;
    // this.logistic=this.logistics[0];
    if(this.logistic==''){
      this.logistic=this.logistics[0];
    }
    Slide.slideIn(this.node);
  }
  closeModal() {
    Slide.slideLeft(this.node,this);
  }
  onChangeCountryChanged(data: { value: string }) {
    this.logistic = data.value;
  }
  Onsubmit(){
    let result={logistic:this.logistic,wayBillNumber:this.wayBillNumber};
    Slide.slideRight(this.node,this,result);
  }
}
