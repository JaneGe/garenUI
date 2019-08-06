import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http"
import {PackageShipmentInfo} from "../models/Package/package-shipment-info";
import {PackageShipResultModel} from "../models/Package/package-ship-result-model";

@Injectable()
export class PacakgeShipmentService {
  constructor(private apiService: ApiService) { }

  getShipmentInfo( selectedWarehouseId: number, selectSsId: number, scanType: string, scanText: string)
  : Observable<ApiResponseBaseModel<PackageShipmentInfo>> {


    const searchParams = new URLSearchParams();
    searchParams.set('scanTextType', scanType);
    searchParams.set('scanText', scanText);
    searchParams.set('warehouseId', selectedWarehouseId.toString());
    searchParams.set('ssId', selectSsId.toString());


    return this.apiService.get(EndPointsConfig.EndPoints.Package_Get_Shipment_Info, searchParams);
  }

  doScanShip(pageData: any): Observable<ApiResponseBaseModel<PackageShipResultModel>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Package_Do_Scan_Ship, pageData);
  }


  getPackageByPocketNumber(packageId: any,ssId:any,ssName:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('pocketNumber', packageId);
    searchParams.set('ssId', ssId);
    searchParams.set('ssName', ssName);
    return this.apiService.get(EndPointsConfig.EndPoints.PackagePocket_GetPackageByPocketNumber, searchParams);
  }
  sendPackagePocket(pocketId: any,totalWeight:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('pocketId', pocketId);
    searchParams.set('totalWeight', totalWeight);
    return this.apiService.get(EndPointsConfig.EndPoints.PackagePocket_SendPackagePocket, searchParams);
  }
  packagePocketQuery(param:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PackagePocket_PackagePocketQuery, param);
  }
}
