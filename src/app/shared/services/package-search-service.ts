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


@Injectable()
export class PackageService {
  constructor(private apiService: ApiService) {

  }


  getPageList(selectedWarehouseId: number, packageSearchStatus: string,
              shippingServiceIds: string, trackNumberTypes: string,
              timeValueType: string, timeStart: string, timeEnd: string,
              batchSearchType: string, batchSearchText: string,
              searchText: string, searchType: string, pageNumber: number, pageSize: number,spId:any): Observable<ApiResponseBaseModel<ApiPageList<PackageListModel>>> {

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
    //searchParams.set('batchsearchText', batchSearchText);

    searchParams.set('searchType', searchType);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }
    let bodyData = { batchsearchText:batchSearchText };
    return this.apiService.post(EndPointsConfig.EndPoints.Package_Search_PageList, bodyData, searchParams);
  }

  exceptionPackageList(selectedWarehouseId: number,shippingServiceId:any,spId:any,timeType:any, timeValueType: string,timeStart: string,timeEnd: string,pageNumber: number, pageSize: number): Observable<ApiResponseBaseModel<any>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const  datas ={
      pageIndex:pageIndex,
      pageSize:pageSize,
      WarehouseId:selectedWarehouseId,
      ShippingServiceIds:shippingServiceId,
      SpId:spId,
      timeType:timeType,
      timeValueType:timeValueType,
      BeginTime:timeStart,
      EndTime:timeEnd
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Package_ExceptionPackageList, datas);
  }

  SrceenPackageList(selectedWarehouseId: number,SearchType:any,SearchText:any,pageNumber:number, pageSize:number): Observable<ApiResponseBaseModel<any>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const  datas ={
      pageIndex:pageIndex,
      pageSize:pageSize,
      WarehouseId:selectedWarehouseId,
      SearchType:SearchType,
      SearchText:SearchText

    };
    return this.apiService.post(EndPointsConfig.EndPoints.Package_SrceenList, datas);
  }

  getNotShipmentPackageList(selectedWarehouseId: number, packageSearchStatus: string,
              shippingServiceId: number, trackNumberTypes: string,
              timeValueType: string, timeStart: string, timeEnd: string,
              batchSearchType: string, batchSearchText: string,
              searchText: string, searchType: string, pageNumber: number, pageSize: number): Observable<ApiResponseBaseModel<ApiPageList<PackageListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('selectedWarehouseId', selectedWarehouseId && selectedWarehouseId.toString());
    searchParams.set('packageSearchStatus', packageSearchStatus);
    searchParams.set('shippingServiceId', shippingServiceId && shippingServiceId.toString());
    searchParams.set('trackNumberTypes', trackNumberTypes);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('batchsearchType', batchSearchType);
    searchParams.set('batchsearchText', batchSearchText);

    searchParams.set('searchType', searchType);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }

    return this.apiService.get(EndPointsConfig.EndPoints.Package_Search_NotShipmentPackageList, searchParams);
  }

  getpackageDetail(packageId: string): Observable<ApiResponseBaseModel<PackageDetailModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id', packageId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Package_Detail, searchParams);
  }


  fetchTrackingNumber(packageId: string) {
    const searchParams = new URLSearchParams();
    searchParams.set('packageId', packageId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Package_Fetch_TrackingNumber, searchParams);
  }

  manualEntryTrackingNumber(selectedWarehouseId: number, packageId: string, truckNumber: string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('selectedWarehouseId', selectedWarehouseId && selectedWarehouseId.toString());
    searchParams.set('packageId', packageId && packageId.toString());
    searchParams.set('trackingNumber', truckNumber);
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_manualEntryTrackingNumberr, null, searchParams);
  }

  getDownloadUrl(packageId: string, packageNumber: string) {
    const url = `${environment.api_url}/shipping-label/${packageId}/label/${packageNumber}?includeItemDetails=true`;
    return url;
  }

  getPackagePickingFailList(selectedWarehouseId: number, selectedIsShipped: boolean,
                            selectedTimeFiltType: string, selectedTimeValueType: string, timeSearchStart: string, timeSearchEnd: string,
                            searchText: string, selectSearchType: string, pageNumber: number, pageSize: number,
                            selectIsPurchased: boolean, selectedCanShipStatus: boolean, selectedPackageType: string, selectedUntreatedSearchType: string): Observable<ApiResponseBaseModel<ApiPageList<any>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('selectedWarehouseId', selectedWarehouseId && selectedWarehouseId.toString());
    searchParams.set('isShipped', selectedIsShipped && selectedIsShipped.toString());
    searchParams.set('timeSearchType', selectedTimeFiltType);
    searchParams.set('timeValueType', selectedTimeValueType);
    searchParams.set('timeStart', timeSearchStart);
    searchParams.set('timeEnd', timeSearchEnd);
    searchParams.set('isPurchased', selectIsPurchased && selectIsPurchased.toString());
    searchParams.set('canShip', selectedCanShipStatus && selectedCanShipStatus.toString());
    searchParams.set('packageType', selectedPackageType);
    searchParams.set('untreatedSearch', selectedUntreatedSearchType);

    searchParams.set('searchType', selectSearchType);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }

    return this.apiService.get(EndPointsConfig.EndPoints.Package_Search_PackagePickingFailList, searchParams);
  }

  getPackagePickingFailInfoById(pageNumber: number, pageSize: number, packageId: number,
                                searchText: string, searchType: string): Observable<ApiResponseBaseModel<ApiPageList<any>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('packageId', packageId && packageId.toString());
    searchParams.set('searchText', searchText);
    searchParams.set('searchType', searchType);


    return this.apiService.get(EndPointsConfig.EndPoints.Package_Search_GetPackagePickingFailInfoById, searchParams);
  }

  creatNewExceptionInformation(selectedWarehouseId: number, selectedIsExceptionStatus: boolean,
                               selectedTimeFiltType: string, selectedTimeValueType: string, timeSearchStart: string, timeSearchEnd: string,
                               searchText: string, selectSearchType: string,
                               selectedCanHandleStatus: boolean, selectedIsCompletedStatus: boolean, selectedPackageType: string,
                               data: number[]): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();

    searchParams.set('selectedWarehouseId', selectedWarehouseId && selectedWarehouseId.toString());
    searchParams.set('isException', selectedIsExceptionStatus && selectedIsExceptionStatus.toString());
    searchParams.set('timeSearchType', selectedTimeFiltType);
    searchParams.set('timeValueType', selectedTimeValueType);
    searchParams.set('timeStart', timeSearchStart);
    searchParams.set('timeEnd', timeSearchEnd);
    searchParams.set('canHandle', selectedCanHandleStatus && selectedCanHandleStatus.toString());
    searchParams.set('isCompleted', selectedIsCompletedStatus && selectedIsCompletedStatus.toString());
    searchParams.set('packageType', selectedPackageType);

    searchParams.set('searchType', selectSearchType);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }

    return this.apiService.post(EndPointsConfig.EndPoints.Package_Search_CreatNewExceptionInformation, postData, searchParams);
  }

  setPackagePickingFailed(pickingId: number, packageId: string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('pickingId', pickingId.toString());
    searchParams.set('packageId', packageId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Picking_Second_Picking_Set_Package_PickingFailed,
      null, searchParams);
  }

  cancelPackageByPackageId(packageId: number, orderNumber: string) {
    const searchParams = new URLSearchParams();
    searchParams.set('packageId', packageId.toString());
    searchParams.set('orderNumber', orderNumber);
    return this.apiService.get(EndPointsConfig.EndPoints.Package_CancelPackageByPackageId, searchParams);
  }


  reallocateShipping(postData: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Package_Reallocate_Shipping, postData);
  }

  packageDefuseQuery(param: any) {
    return this.apiService.post(EndPointsConfig.EndPoints.Package_Search_PackageDefuseQuery, param);
  }

  packageDefuse(param: any, packageId: any) {
    const searchParams = {
      Params: param,
      PackageId: packageId
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Package_Search_PackageDefuse, searchParams);
  }

  voidPackage(packageId: string, message: string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('packageId', packageId && packageId.toString());
    searchParams.set('message', message);

    return this.apiService.post(EndPointsConfig.EndPoints.Packages_Void_Package, null, searchParams)
  }

  createCustomTruckingNumbers(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Packages_Create_CustomTruckingNumbers, data);
  }

  getTrackingNumbers( ssId:number, pageNumber: number, pageSize: number): Observable<ApiResponseBaseModel<ApiPageList<any>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('ssId', ssId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Packages_Get_CustomTruckingNumbers, searchParams);
  }

 getWarehouseShippingServiceForPackage( warehouseId:number, spId: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('spId', spId);
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingService_GetWarehouseShippingServiceForPackage, searchParams);
  }

  getSpServiceForPackage( warehouseId:number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingService_GetSpServiceForPackage, searchParams);
  }

  editPackageShipWeight(packageId: number, editShipWeight: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('packageId', packageId && packageId.toString());
    searchParams.set('editShipWeight', editShipWeight && editShipWeight.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Packages_Edid_tPackageShipWeight, null, searchParams)
  }
  ExceptionPackageList(warehouseId:any,shippingServiceId:any,spId:any,timeType:any,timeValueType:any,beginTime:any,endTime:any,pageIndex:any,pageSize:any): Observable<ApiResponseBaseModel<any>> {
    const data = {
      warehouseId:warehouseId,
      shippingServiceId:shippingServiceId,
      spId:spId,
      timeType:timeType,
      timeValueType:timeValueType,
      beginTime:beginTime,
      endTime:endTime,
      pageIndex:pageIndex,
      pageSize:pageSize
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Package_ExceptionPackageList,data);
  }


}
