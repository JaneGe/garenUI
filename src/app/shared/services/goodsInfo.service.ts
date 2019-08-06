import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { EndPointsConfig } from "../Config";
import { URLSearchParams } from '@angular/http';
import { GoodsInfo } from "./goodsInfo";
@Injectable()
export class GoodsInfoService {

  constructor(public apiService: ApiService) {
  }
  getGoodsInfo() {
    return GoodsInfo;
  }
}
