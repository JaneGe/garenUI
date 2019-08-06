import { Component, OnInit } from '@angular/core';
import {StockService} from "../stock.service";
import {RootComponent} from "../../../../shared/component/root.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DetailModalComponent} from "../detail-modal/detail-modal.component";

@Component({
  selector: 'app-report-lost-list',
  templateUrl: './report-lost-list.component.html',
  styleUrls: ['./report-lost-list.component.scss']
})
export class ReportLostListComponent extends RootComponent implements OnInit {
  reportLoss:Array<any>=[];
  pageSize: number = 10;
  pageNumber: number = 1;
  dataNumber: number = 0;
  hasData:boolean=false;
  constructor(private ModalService:NgbModal,private StockService:StockService,) {super(); }

  ngOnInit() {
    this.loadData();
  }
  pageChanged(target:number){
    this.loadData(target);
  }
  loadData(pageNumber: number = 1) {
    this.reportLoss=this.StockService.reportLoss;
    this.dataNumber=this.reportLoss.length;
    if(this.dataNumber>0){this.hasData=true;}
    this.pageNumber=pageNumber;
  }
  openDetailModal(reportLoss:any){
    const activeModal=this.ModalService.open(DetailModalComponent,
      {size:'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '报损详细信息';
    activeModal.componentInstance.reportInfo=reportLoss;
    activeModal.result.then(result=>{
      if(result!=undefined){
        console.log(result);
        this.changeStatus(result);
      }
    })
  }
  changeStatus(editOne:any){
   this.confirm('确定执行此操作？',()=>{
     this.StockService.reportLoss.forEach((item)=>{if(item.SKU==editOne){item.status='已确认'}})
   })
  }
}
