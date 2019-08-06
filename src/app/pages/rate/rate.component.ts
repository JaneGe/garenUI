import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Jsonp } from '@angular/http';
import { RateService } from "../../shared/services/rate.service";
import { AuthorityComponent } from "../../shared/component/authority.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  providers: [RateService]
})

export class RateComponent extends AuthorityComponent implements OnInit {

  dataSource: Observable<any>;

  dataState = false;

  rateData = [];

  updata;

  img = 'assets/country';

  country = [
    { name: '美元', flag: (`${this.img}/US.svg`), currency: 'USD' },
    { name: '英镑', flag: (`${this.img}/GB.svg`), currency: 'GBP' },
    { name: '欧元', flag: (`${this.img}/EU.svg`), currency: 'EUR' },
    { name: '日元', flag: (`${this.img}/JP.svg`), currency: 'JPY' },
    { name: '加元', flag: (`${this.img}/CA.svg`), currency: 'CAD' },
    { name: '台币', flag: (`${this.img}/TW.svg`), currency: 'TWD' },
    { name: '澳元', flag: (`${this.img}/AU.svg`), currency: 'RUB' },
    { name: '卢布', flag: (`${this.img}/RU.svg`), currency: 'AUD' },
    { name: '比索', flag: (`${this.img}/MX.svg`), currency: 'SGD' },
    { name: '新加坡元', flag: (`${this.img}/SG.svg`), currency: 'MXN' },
    { name: '林吉特', flag: (`${this.img}/MY.svg`), currency: 'MYR' },
    { name: '人民币', flag: (`${this.img}/CN.svg`), currency: 'CNY' },
  ];

  constructor(private rateService: RateService, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
  }

  ngOnInit() {
    this.loadRateData();
  }

  loadRateData() {
    this.rateService.getCurrencyRate().subscribe(data => {
      this.dataState = data.success;
      this.rateData = data.content;
      for (let i in this.rateData) {
        this.rateData[i].fromFlag = this.findIndex(this.rateData[i].from).flag;
        this.rateData[i].fromName = this.findIndex(this.rateData[i].from).name;
        this.rateData[i].toFlag = this.findIndex(this.rateData[i].to).flag;
        this.rateData[i].toName = this.findIndex(this.rateData[i].to).name;
      }
      this.updata = this.rateData[0].lastModifiedTime;
      console.log(this.rateData);
    });
  }

  findIndex(key) {
    let countryInfo: { flag: string, name: string } = { flag: null, name: null };
    this.country.forEach(element => {
      if (key === element.currency) {
        countryInfo.flag = element.flag;
        countryInfo.name = element.name;
      }
    });
    return countryInfo;
  }

}
