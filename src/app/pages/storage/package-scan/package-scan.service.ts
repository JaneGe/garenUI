import {ApiService} from "../../../shared/services/api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../../../shared/models/api.response.basemodel";
import {EndPointsConfig} from "../../../shared/Config";
import {PackingScanModel} from "../../../shared/models/warehouses/package-scan-model";
import {URLSearchParams} from "@angular/http";
import {SinglePackagePrintScanModel} from "../../../shared/models/Package/single-package-print-scan-model";

@Injectable()
export class PackageScanService {
  constructor(public apiService: ApiService) {

  }
  GetStorageData(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }
  GetPickTaskQuery(param:PackingScanModel): Observable<ApiResponseBaseModel<SinglePackagePrintScanModel>> {
    const data = {
      WareHouseid:param.WareHouseid,
      SkuCode:param.SkuCode,
      PickNumber:param.PickNumber,
      PickingId:param.PickingId
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_PickScan_List,data);
  }
  GetPackageTotalQuantity(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Picking_GetPackageTotalQuantity);
  }

  CalculatePackageForQuery(pickNumber:string=''): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('pickNumber', pickNumber);
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Calculate_Package,searchParams);
  }
}
