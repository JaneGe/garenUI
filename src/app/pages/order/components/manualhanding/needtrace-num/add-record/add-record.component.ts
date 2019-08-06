import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as ModalAnimate from '../../../../../../shared/animations/modal-Slide';
import {OrderExceptionService} from "../../../../../../shared/services/orderException-service";
import {RootComponent} from "../../../../../../shared/component/root.component";
@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss'],
  providers:[OrderExceptionService]
})
export class AddRecordComponent extends RootComponent implements OnInit {
  node:any;

  itemsLength:number;
  selectedWarehouseId: number;

  constructor(private activeModal:NgbActiveModal,
              private  orderExceptionService: OrderExceptionService) {
    super();
  }

  ngOnInit() {

    this.node=document.getElementById('form').parentNode.parentNode.parentNode;
    ModalAnimate.slideIn(this.node);
  }

  closeModal(){
    ModalAnimate.slideLeft(this.node,this);
  }
  // OnSubmit(bg:any,gz:any){
  //   var result={PackageNum:bg,TraceNum:gz};
  //   ModalAnimate.slideRight(this.node,this,result);
  // }

  OnSubmit(bg:any,gz:any) {

    this.orderExceptionService.manualEntryTrackingNumber(this.selectedWarehouseId,bg,gz).subscribe(data => {
      this.alertMessage("跟踪号录入成功！");
     this.closeModal();
    }, this.handleError);
  }

}
