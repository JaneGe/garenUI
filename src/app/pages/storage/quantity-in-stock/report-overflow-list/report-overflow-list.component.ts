import { Component, OnInit } from '@angular/core';
import {StockService} from "../stock.service";
import {RootComponent} from "../../../../shared/component/root.component";
import {DetailModalComponent} from "../detail-modal/detail-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-report-overflow-list',
  templateUrl: './report-overflow-list.component.html',
  styleUrls: ['./report-overflow-list.component.scss']
})
export class ReportOverflowListComponent extends RootComponent implements OnInit {
  reportOverFlow:Array<any>=[];
  pageSize: number = 10;
  pageNumber: number = 1;
  dataNumber: number = 0;
  hasData:boolean=false;
  constructor(private ModalService:NgbModal,private StockService:StockService) {super(); }

  ngOnInit() {
    this.loadData();
  }
  pageChanged(target:number){
    this.loadData(target);
  }
  loadData(pageNumber: number = 1) {
    this.reportOverFlow=this.StockService.reportOverflow;
    this.dataNumber=this.reportOverFlow.length;
    // console.log(this.dataNumber);
    if(this.dataNumber>0){this.hasData=true;}
    this.pageNumber=pageNumber;
  }
  openDetailModal(reportOverFlow:any){
    const activeModal=this.ModalService.open(DetailModalComponent,
      {size:'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '报溢详细信息';
    activeModal.componentInstance.reportInfo=reportOverFlow;
    activeModal.result.then(result=>{
      if(result!=undefined){
        console.log(result);
        this.changeStatus(result);
      }
    })
  }
  changeStatus(editOne:any){
    this.confirm('确定执行此操作？',()=>{
      this.StockService.reportOverflow.forEach((item)=>{if(item.SKU==editOne){item.status='已确认'}});
    })
  }
}
