import {AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { OrderExceptionService } from "../shared/services/orderException-service";
import { RootComponent } from "../shared/component/root.component";
import { OrderManualService } from "./orderManual.service";
import { TableComponent } from "./order/components/manualhanding/table/table.component";
import { CommonData } from "../shared/common-data";
import { AuthorityComponent } from "../shared/component/authority.component";
import {MenuCollapseService} from "../theme/menu-collapse.service";
import {reject} from "q";
import {promise} from "selenium-webdriver";
import rejected = promise.rejected;
import {BaSidebar} from "../theme/components/baSidebar/baSidebar.component";
import {GlobalState} from "../global.state";
@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="loading-wrapper">
        <div class="loading">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
          <span>正在加载，请稍后 · · · </span>
        </div>
      </div>
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://akveo.com">德玛特Demarkt</a> 2017</div>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
  `,
  providers: [OrderExceptionService]
})

export class Pages extends RootComponent implements OnDestroy,OnInit{
  //返回统计中没有ConsolidateOrders
  orderExceptionName = ['NeedManualAudit', 'OrderExpired', 'AddressInvalid', 'NeedTrcukNumber', 'ItemNoMapSku',
    'DeclarationMissed', 'WarehouseAllocateFailed', 'CalcShippingFeeFaile', 'LowProfitAudit', 'OutOfStock',
    'TrackingNumberFectchFailed', 'Failed', 'ConsolidateOrders','NeedMerge', 'ShipmentsFailed','ManualFeedBack'];
  times: number = 0;
  timesOutId:number;
  PAGES_MENU:any;
  errorListCode:Array<any>=[];
  endPointData:any;
  constructor(private _menuService: BaMenuService,
    public router: Router,
    private orderExceptionService: OrderExceptionService,
    private orderManualService: OrderManualService, public activerouter: ActivatedRoute,
    private menuCollapseService:MenuCollapseService,
    private _state: GlobalState) {
    super();
  }
  ngOnInit() {
    let resolution=window.screen.width;
    if(resolution<=1440){
      this._state.notifyDataChanged('menu.isCollapsed', true);
    }
    this.PAGES_MENU = CommonData.GetCurrentPageMenu();
    this.upDateMunu();
    this.loadCurrentMenu();
    //接受到通知链接跳转时，展开响应的menu
    this.orderManualService.getUpdateMenu().subscribe(data => {
      console.log(data);
      this.PAGES_MENU[0].children.forEach(value1=>{
        if(value1.data.menu.title=='订单'){
          value1.children.forEach(value2=>{
            if(value2.data.menu.title=='需人工处理'){
              value2.data.menu.expanded=true;
            }
          })
        }
      });
      this._menuService.updateMenuByRoutes(<Routes>this.PAGES_MENU);
    });
    //监听内部数据操作，页面直接显示
    // this.orderManualService.getMessage().subscribe(data => {
    //   this.ChangeRedPoint(data);
    // });
  }
  // ChangeRedPoint(data:{kill:boolean,errType:string}){
  //     console.log('清除小红点'+data.kill);
  //     let index=this.orderExceptionName.findIndex(value=>value==data.errType);
  //     if(data.kill){
  //       this.errorListCode[index]=0;
  //     }
  //     else{
  //       this.errorListCode[index]=1;
  //     }
  //     //this.DoUpdateMenu(this.errorListCode);
  // }
  ngOnDestroy(){
    //window.clearTimeout(this.timesOutId);
  }
  loadCurrentMenu() {
    this.menuCollapseService.getMessage().subscribe(data=>{
      //遍历一级菜单
      this.PAGES_MENU[0].children.forEach(value1=>{
        if(value1.data.menu.title==data.targetBar){
          value1.data.menu.expanded=!data.statu;
          //console.log(data.targetBar+'状态更改为：'+value1.data.menu.expanded);
          //如果一级菜单收起，那其下所有子菜单也收起
          if(data.statu){
            value1.children.forEach(value2=>{
                value2.data.menu.expanded=false;
            })
          }
        }
        //遍历二级菜单
        else{
          value1.children.forEach(value2=>{
            if(value2.data.menu.title==data.targetBar){
              value2.data.menu.expanded=!data.statu;
              //console.log(data.targetBar+'状态更改为：'+value2.data.menu.expanded);
            }
          })
        }
      })
    });
  //   //每30s查询一次异常列表
  //   // this.timesOutId=window.setInterval(() => {
  //   //   this.upDateMunu();
  //   // }, 60000);
  }

  upDateMunu() {
    let getErrorArr=new Promise(resolve => {
      let res=this.orderExceptionService.getAllOrderExceptionCount().toPromise();
      res.then(data=>{
        //resolve(data);
        this.getErrorList(data);
      },e=>{
          if (e.error && e.error.code == 'NO_LOGIN') {
            this.router.navigateByUrl('/login')
          }
          else {
            this.handleError(e);
          }
      });
    });
    // let timeout=new Promise(resolve => {
    //   setTimeout(resolve,1000,'超时1秒');
    // });
    // Promise.race([timeout,getErrorArr]).then(data=>{
    //   if(typeof data!=='string'){
    //     //this.getErrorList(data);
    //     this.endPointData=data;
    //     console.log('error-list 获取成功');
    //     //console.log(data);
    //   }
    //   else{
    //     this._menuService.updateMenuByRoutes(<Routes>this.PAGES_MENU);
    //     console.log('error-list 获取超时');
    //   }
    //   this.times++;
    // });
  }
  DoUpdateMenu(count){
    this.PAGES_MENU[0].children.forEach(value1=>{
      if(value1.data.menu.title=='订单'){
        //value1.children[1]  ---需人工处理
        // for(let i of count){
        //   if(i!=0){
        //     value1.children[1].data.menu.order=100;
        //     break;
        //   }
        // }
        value1.children[1].children.forEach((value2,index)=>{
          // if(count[index]!=0){
          //   value2.data.menu.icon='fa fa-exclamation-circle text-danger';
          // }
          // else{
            value2.data.menu.icon='ion-ios-arrow-right';
          // }
        })
      }
    });
    this._menuService.updateMenuByRoutes(<Routes>this.PAGES_MENU);
    //console.log('update error-list-menu');
  }
  getErrorList(data: any) {
    let count: number[] = [];
    for (let i in this.orderExceptionName) {
      for (let o in data.content) {
        if (this.orderExceptionName[i] == data.content[o].orderExceptionName) {
          count.push(data.content[o].orderExceptionCount);
        }
      }
    }
    //console.log(count);
    this.errorListCode=count;
    this.DoUpdateMenu(count);
  }
}
