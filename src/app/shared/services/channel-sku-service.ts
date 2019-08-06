import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiPageList} from "../models/page-list.model";
import {ChooseSkuListModel} from "../models/products/ChooseSku-list-model";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http"


@Injectable()
export class ChannelSkuService {
  constructor(private apiService: ApiService) {

  }


  getSkuOrVirtualSkuList(skuType: string, searchText: string, searchType: string, pageNumber: number, pageSize: number): Observable<ApiResponseBaseModel<ApiPageList<ChooseSkuListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('skuType', skuType);
    searchParams.set('searchType', searchType);

    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }
    return this.apiService.get(EndPointsConfig.EndPoints.getSkuOrVirtualSkuList, searchParams);
  }

  saveChannelSku(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.channelSkuSave, data);
  }

  deleteChannelSku(skuId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('skuId', skuId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Channel_Sku_Delete, null, searchParams);
  }

  getPageList(selectedChannelType:string,selectedAccountsId:number,selectSearchType:string,searchText:string,
              pageNumber: number, pageSize: number): Observable<ApiResponseBaseModel<ApiPageList<any>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('channelType',selectedChannelType);
    searchParams.set('channelId', selectedAccountsId && selectedAccountsId.toString());
    searchParams.set('searchType', selectSearchType);
    searchParams.set('searchText',searchText);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }
    return this.apiService.get(EndPointsConfig.EndPoints.ChannelSku_PageList, searchParams);
  }

  getChannelSkuDetail(skuId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('skuId', skuId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Channel_Sku_Detail, searchParams);
  }

}
