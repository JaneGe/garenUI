import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiPageList} from "../models/page-list.model";
import {SkuListModel} from "../models/products/sku-list-model";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http"
import {SkuDetailModel} from "../models/products/sku-detail-model";
import {PurchaseAddParam} from "../models/purchases/purchase-url-model";
import {SkuSearchLiteModel} from "../models/products/sku-search-lite-model";


@Injectable()
export class SkuService {
  constructor(private apiService: ApiService) {

  }


  getPageList(shippingAttribute: string, searchText: string, searchType: string, pageNumber: number, pageSize: number,
              selectSearchUnusualType:string,selectSkuHasCombine:string,selectSearchIfPurchaseLink:any)
    : Observable<ApiResponseBaseModel<ApiPageList<SkuListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('searchUnusualType', selectSearchUnusualType);
    searchParams.set('shippingAttribute', shippingAttribute);
    searchParams.set('skuHasPruchaseUrl', selectSearchIfPurchaseLink);
    searchParams.set('SkuHasCombine', selectSkuHasCombine);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);

    return this.apiService.get(EndPointsConfig.EndPoints.Sku_PageList, searchParams);
  }

  saveSkuInfo(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Sku_Save, data);
  }

  getSkuDetail(skuId: number): Observable<ApiResponseBaseModel<SkuDetailModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('skuId', skuId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Sku_Detail, searchParams);
  }

  deleteSku(skuId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('skuId', skuId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Sku_Delete, null, searchParams);
  }

  AddPurchaseUrl(param:PurchaseAddParam){
    return this.apiService.post(EndPointsConfig.EndPoints.PurchaseUrl_AddPurchaseUrl, param);
  }
  DeletePurchaseUrl(Id:number){
    const searchParams = new URLSearchParams();
    searchParams.set('Id', Id.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseUrl_DeletePurchaseUrl, searchParams);
  }
  PurchaseUrlQuery(SkuId:number = -1): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('SkuId',SkuId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseUrl_PurchaseUrlQuery, searchParams);
  }
  PurchaseUrlGroupQuery(SkuId:number = -1): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('SkuId',SkuId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseUrl_PurchaseUrlGroupQuery, searchParams);
  }
  SetDefaultUrl(Id:number,isDefault:boolean){
    const searchParams = new URLSearchParams();
    searchParams.set('Id', Id.toString());
    searchParams.set('isDefault', isDefault.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseUrl_SetDefaultUrl, searchParams);
  }
  SetMailPurchaseUrl(skuId:any,groupSort:any){
    const searchParams = new URLSearchParams();
    searchParams.set('skuId', skuId);
    searchParams.set('groupSort', groupSort);
    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseUrl_SetMailPurchaseUrl, searchParams);
  }

  disableSku(skuId:number,data: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('skuId', skuId.toString());;
    return this.apiService.post(EndPointsConfig.EndPoints.Sku_DisableSku, data,searchParams);
  }

  activateSku(skuId: number,data: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('skuId', skuId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Sku_ActivateSku, data, searchParams);
  }


  serachSkus(searchCode: string = null): Observable<ApiResponseBaseModel<SkuSearchLiteModel[]>> {
    const searchParams = new URLSearchParams();
    if(searchCode == null){
      searchCode = "";
    }
    searchParams.set('searchCode', searchCode);
    return this.apiService.get(EndPointsConfig.EndPoints.Sku_SkuSearch, searchParams);
  }
}
