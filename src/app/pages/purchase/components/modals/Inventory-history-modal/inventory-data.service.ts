import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { URLSearchParams } from "@angular/http";
import {WarehouseFlowModel} from "../../../../../shared/models/warehouses/warehouse-flow-model";
import {ApiResponseBaseModel} from "../../../../../shared/models/api.response.basemodel";
import {EndPointsConfig} from "../../../../../shared/Config";
import {ApiService} from "../../../../../shared/services/api.service";

@Injectable()
export class InventoryService {
  constructor(private apiService: ApiService){
  }

  GetStockOverFlowQuery(param:WarehouseFlowModel):Observable<ApiResponseBaseModel<any>> {
    const data = {
      WareName:param.wareName,
      OperateKind:param.operateKind,
      TimeSearch : param.timeSearch,
      BeginTime: param.beginTime,
      EndTime: param.endTime,
      SearchType: param.searchType,
      SearchText:param.searchText,
      PageIndex:param.pageIndex,
      PageSize:param.pageSize,
      SkuId:param.skuId
    };
    return this.apiService.post(EndPointsConfig.EndPoints.GetStockOverFlowQuery,data);
  }
  GetStorageData(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }
  recordTypes=[{id:-1,text:'全部'},{id:0,text:'仓库初始化'},{id:1,text:'入库'},
    {id:2,text:'出库'},{id:3,text:'发货'},
    {id:4,text:'报损'},{id:5,text:'报溢'},
    {id:6,text:'包裹生成'},{id:7,text:'包裹回收'},
    {id:8,text:'货架转出'},{id:9,text:'货架转入'},{
    id:10,text:'作废出库单'},{id:11,text:'订单预分配'},
    {id:12,text:'订单释放库存'},{id:13,text:'捡货失败(包裹)'},
    {id:14,text:'捡货成功(包裹)'}];

  warehouse = [
    { Id: 0, Name: '东莞' },
    { Id: 1, Name: '深圳' },
    { Id: 2, Name: '123' }
  ];

  timeSpan = [
    { Id: 0, Name: '全部' },
    { Id: 1, Name: '今天' },
    { Id: 2, Name: '昨天' },
    { Id: 3, Name: '7天以内' },
    { Id: 4, Name: '30天以内' },
    { Id: 5, Name: '自定义' }
  ];

  searchTypes = [
    { Id: 0, Name: '货架' },
    { Id: 1, Name: 'SKU' }
  ];
  
  Data = [
    {
      time:'2017-09-11 15:12:18',
      sku:'DMT1284218',
      changeNumber:10,
      reservedInventory:10,
      usableInventory:20,
      goodsShelf:'A01',
      operationType:'入库',
      operator:'张周三',
      remark:'释放预留库存数：1。订单号:SGDD-0001'
    },
    {
      time: '2017-09-11 15:12:18',
      sku: 'DMT1284218',
      changeNumber: 10,
      reservedInventory: 10,
      usableInventory: 20,
      goodsShelf: 'A01',
      operationType: '入库',
      operator: '张周三',
      remark: '释放预留库存数：1。订单号:SGDD-0001'
    },
    {
      time: '2017-09-11 15:12:18',
      sku: 'DMT1284218',
      changeNumber: 10,
      reservedInventory: 10,
      usableInventory: 20,
      goodsShelf: 'A01',
      operationType: '入库',
      operator: '张周三',
      remark: '释放预留库存数：1。订单号:SGDD-0001'
    },
    {
      time: '2017-09-11 15:12:18',
      sku: 'DMT1284218',
      changeNumber: 10,
      reservedInventory: 10,
      usableInventory: 20,
      goodsShelf: 'A01',
      operationType: '入库',
      operator: '张周三',
      remark: '释放预留库存数：1。订单号:SGDD-0001'
    },
    {
      time: '2017-09-11 15:12:18',
      sku: 'DMT1284218',
      changeNumber: 10,
      reservedInventory: 10,
      usableInventory: 20,
      goodsShelf: 'A01',
      operationType: '入库',
      operator: '张周三',
      remark: '释放预留库存数：1。订单号:SGDD-0001'
    }
  ];

}
