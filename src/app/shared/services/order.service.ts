import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { EndPointsConfig } from "../Config";
import { URLSearchParams } from '@angular/http';
import { OrderInfo } from "./orderInfo";
import { PackageInfo } from "./packageInfo";
import { ShippingTrackInfo } from "./shippingTrack";
import { PostBackInfo, AdvancePostBackInfo } from "./postBack";
import { Screen } from "./screen";
import { Columns } from './columns';

@Injectable()
export class OrderInfoService {

  constructor(public apiService: ApiService) {
  }

  getAllOrderList(pageIndex: number, pageSize: number) {
    return  this.apiService.get(EndPointsConfig.EndPoints.Orders_All_List);
  }

  getOrderInfo() {
    return OrderInfo;
  }

  getPackageInfo() {
    return PackageInfo;
  }

  getShippingTrackInfo() {
    return ShippingTrackInfo;
  }

  getPostBackInfo() {
    return PostBackInfo;
  }

  getAdvancePostBackInfoo() {
    return AdvancePostBackInfo;
  }

  getScreen() {
    return Screen;
  }

  getColumns() {
    return Columns;
  }
}
