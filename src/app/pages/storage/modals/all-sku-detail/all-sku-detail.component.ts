import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as Slide from '../../../../shared/animations/modal-Slide';
import swal from 'sweetalert2'
import {RootComponent} from "../../../../shared/component/root.component";
import {PickingService} from "../../../../shared/services/picking.service";
import {PackagePickUpFailModel} from "../../../../shared/models/pickings/picking-task-model";
import {StockService} from "../../quantity-in-stock/stock.service";
@Component({
  selector: 'app-all-sku-detail',
  templateUrl: './all-sku-detail.component.html',
  styleUrls: ['../../public.scss','./all-sku-detail.component.scss'],
  providers:[PickingService]
})
export class AllSkuDetailComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;
  node:any;
  pickId:number=-1;
  picknumber:string='';
  empName:string='';
  skus:Array<any>=[];
  packType:string='';
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = {pageIndex: 0, pageSize: 5, totalCount: 0};

  searchText: string;
  constructor(private activeModal:NgbActiveModal,
              private pickingService: PickingService,
              private stockService:StockService) {
    super();
  }

  ngOnInit() {
    this.node=$('#form3')[0].parentNode.parentNode.parentNode;
    Slide.slideIn(this.node);
    this.OnQuery();
  }
  closeModal(){
    Slide.slideLeft(this.node,this);
  }
  pageChanged(pn){
    this.OnQuery(pn);
  }


  doSearch() {
    this.OnQuery();
  }

  OnQuery(pageNumber: number = 1){

    if (this.searchText != null) {
      this.searchText=this.searchText.trim();
      if(this.searchText.length==0)
      {
        this.searchText=null;
      }
    }

    this.pickingService.PickTaskForSkuById(this.pickId,pageNumber - 1,this.PageInfo.pageSize,this.searchText).subscribe(data => {
      this.skus = data.content.items;
      console.log(this.skus);
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    });
  }
  confirmNum(quantity:number,skuId:number,packageId:number){
    swal({
      title:'应当拣货数量：'+ quantity.toString(),
      text:'实际拣货数量：',
      type:'question',
      input:'number',
      confirmButtonText:'确定',
      showCancelButton:true,
      cancelButtonText:'取消'
    }).then((result)=>{
      let param=new PackagePickUpFailModel();
      param.SkuId=skuId;
      param.ActualNumber=result;
      param.PlanNumber=quantity;
      param.PickingId=this.pickId;
      param.PackageId=packageId;
      param.FailedType=2;
      this.pickingService.PickUpPackageFailed(param).subscribe(data => {
        this.OnQuery();
        this.stockService.sendMarkPackageFailEvent('marked');
        $('#swal2-title').css({'font-size':'18px','font-weight':'normal'});
      }, e => {
        this.handleError(e);
      });
      console.log(result);
      console.log(param);
    },()=>{});
  }
}
