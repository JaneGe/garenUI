import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiPageList} from "../models/page-list.model";
import {VirtualSkuListModel} from "../models/products/virtual-sku-list-model";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http"
import {SkuDetailModel} from "../models/products/sku-detail-model";


@Injectable()
export class VirtualSkuService {
  constructor(private apiService: ApiService) {

  }


  getPageList( searchText: string,  pageNumber: number, pageSize: number)
    : Observable<ApiResponseBaseModel<ApiPageList<VirtualSkuListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());

    if(searchText != null && searchText != ''){
      searchParams.set('searchText', searchText);
    }

    return this.apiService.get(EndPointsConfig.EndPoints.Virtual_Sku_PageList, searchParams);
  }


  deleteSku(skuId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('skuId', skuId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Virtual_Sku_Delete, null, searchParams);
  }
}
