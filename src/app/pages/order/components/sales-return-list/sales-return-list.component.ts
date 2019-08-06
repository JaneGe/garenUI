import { Component, OnInit } from '@angular/core';
import {OrderInfoService} from "../../../../shared/services/order.service";
import * as publicFunction from '../../../../shared/publicFunction/publicFunction';
import {salesBack} from "./table.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddBackOrderComponent} from "./add-back-order/add-back-order.component";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-sales-return-list',
  templateUrl: './sales-return-list.component.html',
  styleUrls: ['../../style.scss','./sales-return-list.component.scss'],
  providers:[OrderInfoService,salesBack],
})
export class SalesReturnListComponent extends AuthorityComponent implements OnInit {

  status:string[]=['全部','邮局退包','买家退包'];
  hangdleStatus:string[]=['全部','待处理','已退款','已重发','已完成'];
  screen = [];//假数据数组
  tagselected;//销售渠道详细展示
  searchMore:boolean = false;//高级筛选按钮状态
  modalstate = 0;
  detail = DETAIL[0];
  Sback:Array<any>;
  pageSize:number=5;
  pageNumber:number=1;
  total:number=0;
  constructor(private orderInfoService: OrderInfoService,
              private salesBack: salesBack,
              private ModalService:NgbModal,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.screen.push(this.orderInfoService.getScreen());
  }
  ngOnInit() {
    this.loadData();
  }
  addClass1(target:any){
    publicFunction.toggleSingleClass(target);
    console.log(target.innerText);
  }
  loadData(){
    this.Sback=this.salesBack.salesBack;
    this.total=this.Sback.length;
  }
  reLoad(PN:number=1){
    this.pageNumber=PN;
    this.loadData();
  }
  pageChanged(N:any){
    $('html, body').animate({ scrollTop: 0 }, 0);
    this.reLoad(N);
  }
  openModal(){
    console.log('modal');
  }
  openAddBackOrderModal(){
    const activeModal=this.ModalService.open(AddBackOrderComponent,{size:'lg'});
    activeModal.componentInstance.modalHeader='新增退货单';
    activeModal.result.then((result)=>{
      if(result!=undefined){
        console.log('父组件');
        var item={SalesBack:result};
        this.salesBack.salesBack.push(item);
        console.log(this.salesBack.salesBack);
        this.reLoad();
      }
    })
  }
  seekmode = 0;
  seekMode(i) {
    this.seekmode = i;
    console.log(this.seekmode);
  }
  SearchMore() {
    this.searchMore = !this.searchMore;
  }
  onSelect($event,i) {
    console.log($event.innerText);
    if(i != undefined){
      this.tagselected = i;
    }
  }
  ModalState() {
    
    if(this.modalstate) {
      this.modalstate = 0;
      $('body').removeClass('modal-open');
    } else {
      this.modalstate = 1;
      $('body').addClass('modal-open');
    }
  }
}
const DETAIL = [
  {
    ebay:[
      {name:'所有',selected:1},
      {name:'WW',selected:0},
    ],
    amazon:{
      account:[
        {name:'所有',selected:1},
        {name:'df',selected:0},
        {name:'XDT',selected:0},
        {name:'xdztest',selected:0},
      ],
      distribution:[
        {name:'所有',selected:1},
        {name:'[FBA亚马逊配送]',selected:0},
        {name:'卖家自行配送',selected:0},
      ]
    },
    aliexpress:[
      {name:'所有',selected:1},
      {name:'WW',selected:0},
    ],
    wish:{
      account:[
        {name:'所有',selected:1},
        {name:'df',selected:0},
        {name:'XDT',selected:0},
        {name:'xdztest',selected:0},
      ],
      distribution:[
        {name:'所有',selected:1},
        {name:'WishExpress',selected:0},
        {name:'卖家自行配送',selected:0},
      ]
    },
    cd:{
      account:[
        {name:'所有',selected:1},
        {name:'df',selected:0},
        {name:'XDT',selected:0},
        {name:'xdztest',selected:0},
      ],
      distribution:[
        {name:'所有',selected:1},
        {name:'Cdiscount配送',selected:0},
        {name:'卖家自行配送',selected:0},
      ]
    }
  }
]
