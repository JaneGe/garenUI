import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { EndPointsConfig } from "../Config";
import { URLSearchParams } from '@angular/http';
import { Bill } from "./bill";
import { Declaration } from "./bill";

@Injectable()
export class EditLogisticStyleService {

  constructor(public apiService: ApiService) {
  }

  getBill() {
    return Bill;
  }

  getDeclarationBill() {
    return Declaration;
  }
}
