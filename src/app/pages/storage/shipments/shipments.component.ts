import { Component, OnInit } from '@angular/core';
import { WarehouseService } from "../../../shared/services/warehouse-service";
import { WarehouseOptionModel } from "../../../shared/models/warehouses/warehouse-option-model";
import { RootComponent } from "../../../shared/component/root.component";
import { ShippingMethodService } from "../../../shared/services/shipping-method-service";
import {
  WarehouseShippingServiceOptionModel
}
  from "../../../shared/models/warehouses/warehouse-shipping-service-option-model";
import { PacakgeShipmentService } from "../../../shared/services/pacakge-shipment-service";
import { PackageShipmentInfo } from "app/shared/models/Package/package-shipment-info";
import * as JQuery from "jquery";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorityComponent } from "../../../shared/component/authority.component";
import {environment} from "../../../../environments/environment";

export class SucLog {
  packageId: string;
  trackingId: string;
  weight: string;
  time: string;
}

export class FailLog {
  packageId: string;
  trackingId: string;
  time: string;
}
class Tabs { //选项卡
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss'],
  providers: [WarehouseService, ShippingMethodService, PacakgeShipmentService]
})
export class ShipmentsComponent extends AuthorityComponent implements OnInit {

  tabs: Tabs[] = [
    { name: '按件发货', selected: true },
    { name: '按袋发货', selected: false },
  ];

  selectedTab: Tabs = { name: '按件发货', selected: true };
  tabChoose(i: Tabs) {
    for (const a of this.tabs) {
      a.selected = false;
    }
    this.selectedTab = i;
    i.selected = true;
    this.loadWarehouseShippingService();
  }

  goodsInfo;
  allWarehouses: WarehouseOptionModel[] = [];
  warehouseAllShippingService: any[] = [];

  trackingId: string = '';
  shipWeight: string = '';
  selectedWarehouseId: number = null;
  selectSsId: number = null;

  packagePocket:any;
  totalPocketWeight:any;
  sucLogs = [];
  failLogs = [];
  SucLogsLength = 0;
  FailLogsLength = 0;

  bagNumber: string;

  successTips: boolean = false;
  scanText: string = null;
  scanType: string = "TrackingNumber";
  packageInfo: PackageShipmentInfo = null;

  isPrintOver: boolean = true;
  constructor(private warehouseService: WarehouseService,
    private shippingMethodService: ShippingMethodService,
    private pacakgeShipmentService: PacakgeShipmentService, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
  }

  ngOnInit() {
    this.warehouseService.getAllOptions().subscribe(data => {

      this.allWarehouses = data.content;
      if (this.allWarehouses.length == 1) {
        this.selectedWarehouseId = this.allWarehouses[0].warehouseId;
      }

      this.loadWarehouseShippingService();


    }, this.handleError);


    $('.logistic-id').focus();
  }


  loadWarehouseShippingService() {
    if (this.selectedWarehouseId > 0) {
      this.selectSsId = null;
      let  ispocket:boolean=false;
      if(this.selectedTab.name == '按袋发货'){
          ispocket=true;
      }
      this.shippingMethodService.getWarehousePocketShippingService(this.selectedWarehouseId,ispocket).subscribe(data => {

        const ss = data.content;
        this.warehouseAllShippingService = [];
        let i = 0;
        for (const c of ss) {
          if (i === 0) {
            this.selectSsId = c.ssid;
          }
          const item = <any>{};
          item.id = c.ssid;
          item.text = c.name;
          this.warehouseAllShippingService.push(item);
          i++;
        }
      }, e => {
        this.handleError(e);
      });
    }
  }

  onWarehouseChanged($event) {
    console.info(this.selectedWarehouseId);
    this.loadWarehouseShippingService();
  }

  onShippingServiceChanged(target) {
    this.selectSsId = target.value;
  }

  searchPackage() {
    if (!(this.selectedWarehouseId > 0)) {
      document.getElementById('inputScanText').blur();
      this.error("请选择仓库");
      return;
    }
    if (!(this.selectSsId > 0)) {
      document.getElementById('inputScanText').blur();
      this.error("请选择物流");
      return;
    }
    if (this.isNullOrEmpty(this.scanText)) {
      document.getElementById('inputScanText').blur();
      this.error("扫描信息不能为空");
      return;
    }
    this.scanText = this.scanText.trim();
    this.packageInfo = null;
    this.shipWeight = null;

    this.pacakgeShipmentService.getShipmentInfo(this.selectedWarehouseId, this.selectSsId, this.scanType, this.scanText)
      .subscribe(data => {
        this.packageInfo = data.content;

        $('.weight').focus();

      }, e => {
        document.getElementById('inputScanText').blur();
        this.handleError(e);
        this.scanText = '';
      });
  }

  printPDF(url: string) {
    const featrure = "toolbar=yes, location=yes, directories=no, " +
      "status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=600, height=600";
    let newWin = window.open(url, "_blank", featrure);
  }

  doShip(isPocket:boolean) {
    if (this.packageInfo == null) {
      this.error("包裹信息不存在");
      return;
    }
    this.shipWeight = this.shipWeight.trim();
    if (!(parseInt(this.shipWeight) > 0)) {
      this.error("包裹重量无效");
      return;
    }

    $('.weight').blur();

    this.innerDoShip(isPocket);
  }

  innerDoShip(isPocket:boolean,forceShip: boolean = false) {

    // if(isPocket){
    //   if((!this.packagePocket)||this.packagePocket.ssId!=this.selectSsId) {
    //     this.error("当前袋号对应的是" + this.packagePocket.ssName + "，和选择的物流方式不匹配!");
    //     return;
    //   }
    // }

    const shipData = {
      packageId: this.packageInfo.packageId,
      warehouseId: this.selectedWarehouseId,
      shipWeight: this.shipWeight,
      isPocketSend: isPocket,
      forceShip,
      pocketNumber:this.bagNumber
    };

    this.pacakgeShipmentService.doScanShip(shipData).subscribe(data => {
      const shipResult = data.content;

      if (shipResult.isSuccess) {
        this.alertMessage("发货成功");
        setTimeout(this.closeAlert, 1000);

        if(isPocket){
          alert(this.shipWeight);
          this.packagePocket.totalWeightAmount+=this.shipWeight;
          this.packagePocket.packageCounts++;
        }
        this.resetScanInfo();
        this.shipWeight = null;
        this.scanText = '';
        $('#inputScanText')[0].focus();
      }
      else {
        if (shipResult.failCode == "PackageWeightInvalid") {
          const msg = `包裹扫描重量异常.扫描重量:${this.shipWeight}g,预估重量: ${this.packageInfo.estimateWeight}g,确定强制发货`;
          this.confirm(msg, () => {
            this.innerDoShip(false,true);
          }, () => {
            this.resetScanInfo();
          });
        }
        else {
          this.error(shipResult.failMessage);
          document.getElementById('weight').blur();
          this.shipWeight = null;
        }
      }
    }, e => {
      this.handleError(e);
      document.getElementById('weight').blur();
      this.shipWeight = null;
    });
  }


  sendPackagePocket(){
    if(!this.packagePocket){
      this.error("当前袋号无法查找!");
      return;
    }
    this.pacakgeShipmentService.sendPackagePocket(this.packagePocket.pocketId,this.totalPocketWeight)
      .subscribe(data => {
        this.packagePocket = null;
        $('.weight').focus();
        let url = `${environment.api_url}/shipping-label/${this.packagePocket.pocketId}/pocket-ticket`;
        this.printPDF(url);
      }, e => {
        document.getElementById('inputScanText').blur();
        this.handleError(e);
        this.scanText = '';
      });
  }

  getDisplayTrackingNumber(): string {
    if (this.packageInfo == null) {
      return "";
    }
    if (!this.isNullOrEmpty(this.packageInfo.trackingNumber)) {
      return this.packageInfo.trackingNumber;
    }
    if (!this.isNullOrEmpty(this.packageInfo.spPackageId)) {
      return this.packageInfo.spPackageId;
    }
    return "";
  }
  resetScanInfo() {
    this.scanText = null;
    this.packageInfo = null;
    this.shipWeight = null;
    $("#inputScanText").focus();
  }

  setBagInfo(){
    if((!this.bagNumber)||this.bagNumber==''){
      this.error("请输入袋号!");
      $('.bagNumber').focus();
      return;
    }

    if (!(this.selectSsId > 0)) {
      document.getElementById('inputScanText').blur();
      this.error("请选择物流");
      return;
    }

    let selectedSsName=  this.warehouseAllShippingService.find(f=>f.id==this.selectSsId).text;

    this.pacakgeShipmentService.getPackageByPocketNumber(this.bagNumber,this.selectSsId,selectedSsName)
      .subscribe(data => {
        this.packagePocket = data.content;

        $('.weight').focus();

      }, e => {
        document.getElementById('inputScanText').blur();
        this.handleError(e);
        this.scanText = '';
        this.packagePocket=null;
      });
  }

}

