import { Component, OnInit } from '@angular/core';
import { FreightChargeService } from "./freight-charge.service";
import { AuthorityComponent } from "../../../../shared/component/authority.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-freight-charge',
  templateUrl: './freight-charge.component.html',
  styleUrls: ['./freight-charge.component.scss', '../../style.scss'],
  providers: [FreightChargeService]
})
export class FreightChargeComponent extends AuthorityComponent implements OnInit {
  pageSize: number = 20;
  pageNumber: number = 1;
  total: number;

  public options: Select2Options;

  selectedWarehouseId: number = 1;

  selectShippingServiceId: number;

  selectSpId: number;
  currentWeight: number = 0;

  selectCountry: any = '';

  selectCountryName: any = '';

  showSelectCountryName = '';

  public warehouseValue: any[];
  warehouse: any[]

  public logisticsCompanyValue: any[];
  logisticsCompany: any[];

  public logisticsTypeValue: any[];
  logisticsType: any[];

  public destinationValue: any[];
  destination: any[];

  items = []
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };

  shipSort = 0;

  constructor(public chargeService: FreightChargeService, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
  }

  ngOnInit() {

    this.getStorageData();
    this.getAllCountrys();
    this.getSpServiceForPackage();
    this.getWarehouseShippingServiceForPackage();
  }

  onChanged(data: { value: string }) {
    console.log(data.value);
  }

  onSpChanged(data: { value: any }) {
    this.selectSpId = data.value;
    this.selectShippingServiceId = -1;
    this.getWarehouseShippingServiceForPackage();
  }

  onWarehouseChanged(data: { value: any }) {
    this.selectedWarehouseId = data.value;
    this.selectSpId = -1;
    this.getSpServiceForPackage();
  }

  OnSsChanged(data: { value: any }) {
    this.selectShippingServiceId = data.value;
  }


  OnSearch() {
    this.loadData();
  }
  onCountryChanged(data: { value: any }) {
    this.selectCountry = data.value;
    this.selectCountryName = this.destination.find(f => f.id == this.selectCountry).text;
  }

  loadData(pageNumber: number = 1) {

    const param = {
      WarehouseId: this.selectedWarehouseId,
      SpId: this.selectSpId,
      SsId: this.selectShippingServiceId,
      CountryCode: this.selectCountry,
      Weight: this.currentWeight,
      PageIndex: pageNumber - 1,
      PageSize: this.PageInfo.pageSize,
      ShipSort: this.shipSort
    };
    this.chargeService.shippingFeeRuleFinanceListQuery(param).subscribe(data => {
      this.items = data.content.items;
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
      this.showSelectCountryName = this.selectCountryName;
    }, this.handleError);
  }

  pageChanged(pN: number): void {
    this.loadData(pN);
  }


  getSpServiceForPackage() {
    this.chargeService.getSpServiceForPackage(this.selectedWarehouseId).subscribe(data => {
      let spList = [{ id: -1, text: '全部' }];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.spid;
        item.text = c.spName;
        spList.push(item);
      }
      this.logisticsCompany = spList;

    });
  }

  getStorageData() {
    this.chargeService.getStorageData().subscribe(data => {
      let ware = [];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.warehouseId;
        item.text = c.name;
        ware.push(item);
      }
      this.warehouse = ware;
    });
  }
  getWarehouseShippingServiceForPackage() {
    this.chargeService.getWarehouseShippingServiceForPackage(this.selectedWarehouseId, this.selectSpId).subscribe(data => {

      let shippingServices = [{ id: -1, text: '全部' }];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.ssid;
        item.text = c.name;
        shippingServices.push(item);
      }
      this.logisticsType = shippingServices;

    });
  }

  getAllCountrys() {
    this.chargeService.getAllCountries().subscribe(data => {

      let countries = [];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.code;
        item.text = c.chineseName;
        countries.push(item);
      }
      this.destination = countries;
      if (this.destination.length > 0) {
        this.selectCountry = this.destination[0].id;
        this.selectCountryName = this.destination[0].text;
      }
      // this.loadData();
    });
  }

  sortShip() {
    if (this.shipSort === 0) {
      this.shipSort = 1;
      this.loadData();
    } else if (this.shipSort === 1) {
      this.shipSort = 2;
      this.loadData();
    } else {
      this.shipSort = 0;
      this.loadData();
    }
  }

}
