import {Injectable} from "@angular/core";
import {ApiService} from "../../shared/services/api.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../../shared/models/api.response.basemodel";
import {EndPointsConfig} from "../../shared/Config";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class OptionsService{
  constructor(public apiService: ApiService) {
  }

  GetStorageData(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }
  GetChannelShipppingMethods(): Observable<ApiResponseBaseModel<any[]>> {
     return this.apiService.get(EndPointsConfig.EndPoints.OrderChannelShipping);
  }
  GetWarehouseShippingQuery(warehouseId:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId);
    return this.apiService.get(EndPointsConfig.EndPoints.Logicstics_GetWarehouseShippingQuery,searchParams);
  }
  GetAccountPlatform(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.get(EndPointsConfig.EndPoints.OrderRules_Platform);
  }
  GetChannelAccounts(type:string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('type', type);
    return this.apiService.get(EndPointsConfig.EndPoints.OrderRules_Accounts,searchParams);
  }
  GetChannelAccountsByCountry(type:any,siteCode:string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('type', type);
    searchParams.set('siteCode', siteCode);
    return this.apiService.get(EndPointsConfig.EndPoints.OrderRules_GetChannelAccountsByCountry,searchParams);
  }
  Currencys=['USD','EUR','TWD','CNY'];
  Countrys=['US','Russia','China','UK','Italy','French','Spain','Africa','Australia'];
  //Platforms=['Amazon','ebay','速卖通','Wish','Lazada','Cdiscount','PrinceMinister','Shopee','手工订单'];
  Platforms=['Amazon','手工订单','Wish','速卖通','ebay','Lazada','Cdiscount','PriceMinister','Shopee'];
  Attrs=[ { id: 'Normal', text: '普货' },
    { id: 'Battery', text: '纯电池' },
    { id: 'InternalBattery', text: '带内置电池' },
    { id: 'ExternalBattery', text: '带外置电池' },
    { id: 'IncludeButtonBattery', text: '含纽扣电池' },
    { id: 'Liquid', text: '液体' },
    { id: 'Powder', text: '粉末' },
    { id: 'Zippo', text: '打火机' },
    { id: 'Knife', text: '刀' },
    { id: 'Gun', text: '枪' },
    { id: 'MagneticProduct', text: '带磁物品' },
    { id: 'OtherDisableProduct', text: '其他禁运物品' },
    { id: 'Balm', text: '膏状' },
    { id: 'Fragile', text: '易碎' },
    { id: 'AnimalFeatherProduct', text: '动物羽毛类' },
    { id: 'HighPowerBattery', text: '大功率电池' },
    { id: 'ElectronicCigarette', text: '电子烟' },
    { id: 'MobilePower', text: '移动电源' },
    { id: 'RemovableBattery', text: '可拆卸电池' },
    { id: 'Motor', text: '电机_马达' },
    { id: 'CellPhone', text: '手机' },
    { id: 'BalanceBike', text: '平衡车' },
    { id: 'LiquidPen', text: '液体笔类' },
    { id: 'Copy', text: '仿品' }
    ];
  storageData=[];
  MatchLogisticses=[];
  PlatformStations=[];
}
