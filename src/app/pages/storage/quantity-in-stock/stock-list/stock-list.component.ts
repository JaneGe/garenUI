import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ReportModalComponent} from "../report-modal/report-modal.component";
import {TransferShelfComponent} from "../transfer-shelf/transfer-shelf.component";
import {StockService} from "../stock.service";
import {WarehouseSearchModel} from "../../../../shared/models/warehouses/warehouse-storeage-model";
import {RootComponent} from "../../../../shared/component/root.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ReserveNumDetailComponent} from "../reserveNumDetail/reserveNumDetail.component";

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent extends AuthorityComponent implements OnInit {
  @Input()
  StockList:Array<any>=[];
  @Input()
  PageInfo:{pageIndex:number,pageSize:number,totalCount:number,sortType:number,sortOrder:boolean}={pageIndex:0,pageSize:10,totalCount:0,sortType:1,sortOrder:true};
// ={pageIndex:0,pageSize:10,totalCount:0,sortType:1,sortOrder:true}
  @Output() childEvent = new EventEmitter<any>();
  report:{SKU:string,total:number,available:number,prepare:number}={SKU:'',total:1,available:1,prepare:1};
  reportLoss:{shelf:string,SKU:string,total:number,available:number,status:string,reason:string,operateKind:string,num:string,time:string}=
  {shelf:'',SKU:'',total:1,available:1,status:'',reason:'',operateKind:'',num:'',time:''};
  reportOverflow:{shelf:string,SKU:string,total:number,available:number,status:string,reason:string,operateKind:string,num:string,time:string}=
    {shelf:'',SKU:'',total:1,available:1,status:'',reason:'',operateKind:'',num:'',time:''};
  transfer:{Shelf:string,SKU:string,available:number}={Shelf:'',SKU:'',available:1};
  shelList:Array<any>=[];
  searchParam: WarehouseSearchModel;
  constructor(private ModalService:NgbModal,
              private StockService:StockService,public activerouter: ActivatedRoute,public  router:Router
              ) {
    super(activerouter,router);
  }
  ngOnInit() {
    this.searchParam=new WarehouseSearchModel();
    this.loadData();
  }


  pageChanged(target:number){
    this.loadData(target);
    //console.log(target);
    //console.log(this.StockList);
  }
  loadData(pageNumber: number = 1) {
    this.PageInfo.pageIndex=pageNumber-1;
    // for(let key in this.PageInfo){
    //   console.log(key+'：'+this.PageInfo[key]);
    // }
    this.childEvent.emit(this.PageInfo);
  }

  updateSortData(target:any,sortType:number){
    let arrow=$(target).attr('class');
    if(arrow=="ion-arrow-down-b"){
      $(target).removeClass('ion-arrow-down-b').addClass('ion-arrow-up-b');
      this.PageInfo.sortOrder=true;
    }else{
      $(target).removeClass('ion-arrow-up-b').addClass('ion-arrow-down-b');
      this.PageInfo.sortOrder=false;
    }
    this.PageInfo.sortType = sortType;
    this.loadData(this.PageInfo.pageIndex);
  }
  openReportModal(target:any){
    let parent:any=target.parentNode.parentNode;
    this.report.SKU=parent.children[2].innerHTML;
    this.report.total=parent.children[4].innerHTML;
    this.report.available=parent.children[5].innerHTML;
    this.report.prepare=parent.children[6].innerHTML;
    let Report:Array<any>=[];
    Report.push(this.report);
    const activeModal=this.ModalService.open(ReportModalComponent,
      {size:'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '报损报溢';
    activeModal.componentInstance.report=Report;
    activeModal.result.then((result)=>{
      if(result!=undefined){
      console.log(result.operateKind);        //报损操作是'0',报溢是'1'
      if(result.operateKind=='0'){
        this.reportLoss.shelf=parent.children[0].innerHTML;
        this.reportLoss.SKU=parent.children[2].innerHTML;
        this.reportLoss.total=parent.children[4].innerHTML;
        this.reportLoss.available=parseInt(parent.children[4].innerHTML)-parseInt(result.num);  //实际存量=系统库存-报损数量
        this.reportLoss.status='待确认';
        this.reportLoss.reason=result.reason;
        this.reportLoss.time=new Date().toLocaleString();
        this.reportLoss.operateKind=result.operateKind;
        this.reportLoss.num=result.num;

        this.StockService.reportLoss.push(this.reportLoss);
      }
      if(result.operateKind=='1'){
        this.reportOverflow.shelf=parent.children[0].innerHTML;
        this.reportOverflow.SKU=parent.children[2].innerHTML;
        this.reportOverflow.total=parent.children[4].innerHTML;
        this.reportOverflow.available=parseInt(parent.children[4].innerHTML)+parseInt(result.num);  //实际存量=系统库存+报损数量
        this.reportOverflow.status='待确认';
        this.reportOverflow.reason=result.reason;
        this.reportOverflow.time=new Date().toLocaleString();
        this.reportOverflow.operateKind=result.operateKind;
        this.reportOverflow.num=result.num;
        this.StockService.reportOverflow.push(this.reportOverflow);
      }
      }
    },()=>{})
  }
  openTransferModal(target:any){
    let parent:any=target.parentNode.parentNode;
    this.transfer.Shelf=parent.children[0].innerHTML;
    this.transfer.SKU=parent.children[2].innerHTML;
    this.transfer.available=parent.children[5].innerHTML;
    let Transfer:Array<any>=[];
    Transfer.push(this.transfer);
    this.StockList.forEach(value => {
      if(value.shelf!=this.transfer.Shelf)
      {this.shelList.push(value.shelf)}
    });//获取所有货架位
    const activeModal=this.ModalService.open(TransferShelfComponent,
      {size:'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '货架转移';
    activeModal.componentInstance.transfer=Transfer;
    activeModal.componentInstance.shelList=this.shelList;
    activeModal.result.then((result)=>{
      if(result!=undefined){
        console.log(result);
        this.StockList.forEach(value => {
          if(value.shelf==result.fromshelf){value.total-=result.num;}
          if(value.shelf==result.toshelf){
            value.total=Number(value.total+0)+Number(result.num);console.log(typeof value.total)}
        })
      }},()=>{})
  }

  lockInventory(id:number){
    this.confirm("确定锁定库存?", () => {
      this.StockService.lockInventory(id).subscribe(data => {
        this.alertMessage("锁定成功");
        this.loadData(this.PageInfo.pageIndex);
      }, e => {
        this.handleError(e);
      });
    });
  }

  unLockInventory(id:number){
    this.confirm("确定解锁库存?", () => {
      this.StockService.unLockInventory(id).subscribe(data => {
        this.alertMessage("解锁成功");
        this.loadData(this.PageInfo.pageIndex);
      }, e => {
        this.handleError(e);
      });
    });
  }
  openReserveNumDetailModal(id){
    let modal=this.ModalService.open(ReserveNumDetailComponent,{backdrop:'static',size:'lg'});
    modal.componentInstance.inventoryId=id;
  }
}
