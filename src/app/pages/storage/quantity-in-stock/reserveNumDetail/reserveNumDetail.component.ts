import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StockService} from "../stock.service";
import {RootComponent} from "../../../../shared/component/root.component";
import * as publicFunction from '../../../../shared/publicFunction/publicFunction';

@Component({
  selector: 'app-reserveNumDetail',
  templateUrl: './reserveNumDetail.component.html',
  styleUrls: ['../../public.scss','./reserveNumDetail.component.scss'],
  providers:[StockService]
})
export class ReserveNumDetailComponent extends RootComponent implements OnInit {
  modalHeader:string='';
  searchType=[{id:1,text:'订单号'},{id:2,text:'包裹号'}];
  searchText='';
  selectedSearchType: string = '1';

  testData=[
    {orderNum:'adsgfdsgdfg1',packageNum:'sdfdsgdfg',num:1},
    {orderNum:'adsgfdsgdfg2',packageNum:'sdfdsgdfg',num:2},
    {orderNum:'adsgfdsgdf3g',packageNum:'sdfdsgdfg',num:3},
    {orderNum:'adsgfdsgdfg4',packageNum:'sdfdsgdfg',num:4},
    ]; 
  @Input()
  inventoryId: number;
  items: any[] = [];
  PageInfo:{pageIndex:number,pageSize:number,totalCount:number}={pageIndex:0,pageSize:20,totalCount:0};
  constructor(private ModalService:NgbModal,
              private stockService: StockService,
              private activaModal:NgbActiveModal) {super(); }

  ngOnInit() {
    this.loadData();
  }
  closeModal(){
    this.activaModal.close();
  }
  addClass1(target: any, type: string, item: any) {
    publicFunction.toggleSingleClass(target);
    this.selectedSearchType = item.id; 
  }
  loadData(pn:number=1){
    let pageIndex=pn-1;
    this.stockService.getReserInfo(this.inventoryId, this.selectedSearchType, this.searchText, pageIndex, this.PageInfo.pageSize).subscribe(d=>{
      this.items = d.content.items;
      this.PageInfo.pageIndex = d.content.pageInfo.pageIndex + 1;
      this.PageInfo.pageSize = d.content.pageInfo.pageSize;
      this.PageInfo.totalCount = d.content.pageInfo.totalCount;
    }, this.handleError);
    this.PageInfo.pageIndex=pn;
  }
  pageChanged(target:number){
    this.loadData(target);
  }
}
