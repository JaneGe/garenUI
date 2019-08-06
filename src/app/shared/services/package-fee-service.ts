import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiPageList} from "../models/page-list.model";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http"
import {PackageListModel} from "../models/Package/package-list-model";
import {PackageDetailModel} from "../models/Package/package-detail-model";
import {environment} from "../../../environments/environment";
import {SpPackageDetailModel} from "../models/Package/sp-package-detail-model";


@Injectable()
export class PackageFeeService {
  constructor(private apiService: ApiService) {

  }


  getPageList(selectedTimeFiltType:any,selectedWarehouseId: number, packageSearchStatus: string,
              shippingServiceIds: string, trackNumberTypes: string,
              timeValueType: string, timeStart: string, timeEnd: string,
              batchSearchType: string, batchSearchText: string,
              searchText: string, searchType: string, pageNumber: number, pageSize: number,
              spId:any, hasSpFeeChecking: string): Observable<ApiResponseBaseModel<ApiPageList<PackageListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('selectedWarehouseId', selectedWarehouseId && selectedWarehouseId.toString());
    searchParams.set('packageSearchStatus', packageSearchStatus);
    searchParams.set('shippingServiceIds', shippingServiceIds);
    searchParams.set('spId', spId);
    searchParams.set('trackNumberTypes', trackNumberTypes);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('batchsearchType', batchSearchType);
    searchParams.set('hasSpFeeChecking', hasSpFeeChecking);
    searchParams.set('TimeSreenValueType', selectedTimeFiltType);

    searchParams.set('searchType', searchType);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }
    let bodyData = { batchsearchText:batchSearchText };
    return this.apiService.post(EndPointsConfig.EndPoints.Finance_Package_SpFee_PageList, bodyData, searchParams);
  }
  getPackageSpFeeDetail(pakageId: string): Observable<ApiResponseBaseModel<SpPackageDetailModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id', pakageId);
    return this.apiService.get(EndPointsConfig.EndPoints.Finance_Package_SpFee_GetPackageInfoById, searchParams);
  }
  saveSpFeeChecking(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Finance_Package_SpFee_SaveSpFeeChecking, data);
  }
}
