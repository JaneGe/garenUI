import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiPageList} from "../models/page-list.model";
import {ChooseSkuListModel} from "../models/products/ChooseSku-list-model";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http"


@Injectable()
export class ChooseSkuService {
  constructor(private apiService: ApiService) {

  }


  getPageList( searchText: string, searchType: string, pageNumber: number, pageSize: number)
    : Observable<ApiResponseBaseModel<ApiPageList<ChooseSkuListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('searchType', searchType);

    if(searchText != null && searchText != ''){
      searchParams.set('searchText', searchText);
    }
    return this.apiService.get(EndPointsConfig.EndPoints.Sku_PageList, searchParams);
  }

}
