import {Injectable} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {Observable} from "rxjs/Observable";
import {EndPointsConfig} from "../../../shared/Config";
import {ApiResponseBaseModel} from "../../../shared/models/api.response.basemodel";
import {WarehouseFlowModel} from "../../../shared/models/warehouses/warehouse-flow-model";

@Injectable()
export class StockOverFlowService{
  constructor(private apiService: ApiService){
  }
  GetStorageData(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }
  GetStockOverFlowQuery(param:WarehouseFlowModel):Observable<ApiResponseBaseModel<any>> {
    const data = {
      WareName:param.wareName,
      OperateKind:param.operateKind,
      TimeSearch : param.timeSearch,
      BeginTime: param.beginTime,
      EndTime: param.endTime,
      SkuId:null,
      SearchType: param.searchType,
      SearchText:param.searchText,
      PageIndex:param.pageIndex,
      PageSize:param.pageSize
    };
    return this.apiService.post(EndPointsConfig.EndPoints.GetStockOverFlowQuery,data);
  }
  getTime=function () {
    var time=new Date();
    var day=parseInt((Math.random()*50).toFixed(0));
    time.setDate(time.getDate()-day);
    return time.toLocaleString();
  };


  getSku=function () {
    var t=String.fromCharCode(Math.random()*(122-97+1)+97);
    var sku='';
    for(var i=0;i<4;i++){sku+=t;}
    return sku;
  };
  getChange=function () {
    var t=Number(Math.random().toFixed(1));
    if(t>0.5){var s='+';}else{var s='-'}
    var num=(Math.random()*50).toFixed(0).toString();
    return (s+num);
  };
  getStock=function () {
    return (Math.random()*100).toFixed(0);
  };
  getoperateKind=function () {
    var operateKind=['仓库初始化','入库','出库','发货','报损','报溢','包裹生成','包裹回收','货架转出','货架转入','捡货失败(包裹)','捡货成功(包裹)','作废出库单'];
    var index=(Math.random()*12).toFixed(0);
    return operateKind[index];
  };
  stockoverflow=[
    {time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
    remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},
    {time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},{time:this.getTime(),sku:this.getSku(),change:this.getChange(),prepared:this.getStock(),
      available:this.getStock(),shelf:this.getSku(),operateKind:this.getoperateKind(),operator:'张三',
      remark:'出库单OB-1004拣货失败，报损数量：1，出库单已作废。'},
  ];
}
