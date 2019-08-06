import { Component, OnInit } from '@angular/core';
import * as publicFunction from '../../../shared/publicFunction/publicFunction';
import {StockService} from "./stock.service";
import {PageWarehouseModel, WarehouseSearchModel} from "../../../shared/models/warehouses/warehouse-storeage-model";
import {AuthorityComponent} from "../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-quantity-in-stock',
  templateUrl: './quantity-in-stock.component.html',
  styleUrls: ['../public.scss','./quantity-in-stock.component.scss'],
  providers:[StockService]
})
export class QuantityInStockComponent extends AuthorityComponent implements OnInit {
  selectedOperate:string='库存清单';
  pageSize: number = 10;
  pageNumber: number = 1;
  dataNumber: number = 0;
  storageData:Array<any>;
  storeSearchKey: string="";
  searchParam: WarehouseSearchModel;
  stockList: Array<any>;
  PageInfo:{pageIndex:number,pageSize:number,totalCount:number,sortType:number,sortOrder:boolean}={pageIndex:0,pageSize:10,totalCount:0,sortType:1,sortOrder:true};
  transfer:{Shelf:string,SKU:string,available:number}={Shelf:'',SKU:'',available:1};
  constructor(private StockService:StockService,public activerouter: ActivatedRoute,public  router:Router
  ) {
    super(activerouter,router);
  }
  ngOnInit() {
    this.searchParam=new WarehouseSearchModel();
    this.searchParam.searchType=0;
    this.searchParam.locationType=-1;
    this.searchParam.lockedType=-1;
    this.searchParam.wareName='全部';
    this.searchParam.searchText='';
    this.StockService.GetStorageData().subscribe(data => {
      this.storageData = data.content;
      this.storageData.unshift({ ishasImportant: false, name: "全部", warehouseId: null })
    });
  }
  addClass1(target:any,searchtype:string,value:any){
    publicFunction.toggleSingleClass(target);
    this.searchParam.searchText=this.storeSearchKey;
    if(target.innerText=='库存清单'){this.selectedOperate='库存清单'}
    switch (searchtype)
    {
      case "warehouse":
        this.searchParam.wareName= value;
        break;
      case "locationlist":
        this.searchParam.locationType= value;
        break;
      case "lockedType":
        this.searchParam.lockedType= value;
        break;
      case "type":
        this.searchParam.searchType= value;
        break;
    }
    this.getChildEvent({pageIndex:0,pageSize:10});
  }
  getChildEvent(PageInfo)
  {
    this.searchParam.pageIndex=PageInfo.pageIndex;
    this.searchParam.pageSize=PageInfo.pageSize;
    this.searchParam.sortType=PageInfo.sortType;
    this.searchParam.sortOrder=PageInfo.sortOrder;
    this.searchParam.searchText=this.storeSearchKey;
    this.StockService.GetWarehouseStoreageQuery(this.searchParam).subscribe(data => {
    this.stockList = data.content.items;
      //console.log( this.stockList);
      for(let key in data.content.pageInfo){
        this.PageInfo[key]=data.content.pageInfo[key];
      }
      this.PageInfo.sortType=PageInfo.sortType;
      this.PageInfo.sortOrder=PageInfo.sortOrder;
    this.PageInfo.pageIndex++;
  });

  }

}
