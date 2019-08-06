import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditLogisticStyleService } from "../../../../../shared/services/editLogisticStyle.service";
import { ChooseApiTemplateComponent } from "../chooseApiTemplate/chooseApiTemplate.component";
import { ChannelCarrierCodeModel } from "../../../../../shared/models/channels/channel-carrier-code-model";
import { ShopAccountService } from "../../../../../shared/services/shop.account.service";
import { RootComponent } from "../../../../../shared/component/root.component";
import { ShippingMethodService } from "../../../../../shared/services/shipping-method-service";
import { AddressEntity, ShippingServiceSettingDetailModel, ShippingSettingCarrierCodeModel }
  from "../../../../../shared/models/logistics/shipping-service-setting-detail-model";
import { CommonService } from "../../../../../shared/services/common-service";
import { CityListModel, ProvinceListModel, RegionListModel }
  from "../../../../../shared/models/commons/province-list-model";


@Component({
  selector: 'app-shipping-service-setting',
  templateUrl: './shipping-service-setting.component.html',
  styleUrls: ['./shipping-service-setting.component.scss'],
  providers: [EditLogisticStyleService, ShopAccountService, ShippingMethodService, CommonService]
})
export class ShippingServiceSettingComponent extends RootComponent implements OnInit {
  modalHeader: string;
  ifNeedTraceNum: boolean = false;
  shipTypes: string = 'ByPackage';
  @Input()
  ssId: number;

  @Input()
  warehouseId: number;


  isEdit: boolean = false;
  isEditCarrierCodes: boolean = false;

  bill;
  declaration;
  choose_bill;
  declaration_bill;

  allCarrierCodes: ChannelCarrierCodeModel[] = [];
  allAmazonCarrierCodes: ChannelCarrierCodeModel[] = [];


  ssDetail: ShippingServiceSettingDetailModel = <ShippingServiceSettingDetailModel>{};
  selectedCarrierCodes: ShippingSettingCarrierCodeModel[] = [];

  amazonCarrierCode: ShippingSettingCarrierCodeModel = <ShippingSettingCarrierCodeModel>{};
  aliExpressCarrierCode: ShippingSettingCarrierCodeModel = <ShippingSettingCarrierCodeModel>{};
  wishCarrierCode: ShippingSettingCarrierCodeModel = <ShippingSettingCarrierCodeModel>{};
  saveCarrierCodes: ShippingSettingCarrierCodeModel[] = [];

  senderCn: AddressEntity = <AddressEntity>{};
  senderEn: AddressEntity = <AddressEntity>{};

  provinces: ProvinceListModel[] = [];
  cities: CityListModel[] = [];
  regions: RegionListModel[] = [];
  pickWay: string;

  addressLabelCode: string = 'API';
  declarationLabelCode: string = 'API';

  signRule_Amazon=0;
  signRule_Aliexpress=0;
  signRule_Wish=0;
  constructor(private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private shopAccountService: ShopAccountService,
    private shippingMethodService: ShippingMethodService,
    private commonService: CommonService,
    private editLogisticStyleService: EditLogisticStyleService) {
    super();
  }


  ngOnInit() {
    if (!this.ssId) {
      this.ssDetail.hasTrackingNumber = false;
      this.ssDetail.needReturnPackage = false;
      this.pickWay = 'BySku';
      $('#ssName').removeAttr('disabled');
      //$('#spName').removeAttr('disabled');
    }
    this.shopAccountService.getAllCarrierCodes().subscribe(data => {
      this.allCarrierCodes = data.content;
      this.allAmazonCarrierCodes = this.allCarrierCodes.filter(m => m.channelType == 'Amazon');

    }, this.handleError);


    this.commonService.getProvinces().subscribe(data => this.provinces = data.content);

    if (this.ssId && this.warehouseId) {
      this.shippingMethodService.getShippingServiceDetail(this.warehouseId, this.ssId).subscribe(data => {
        this.ssDetail = data.content;
        console.log(this.ssDetail);
        this.pickWay = this.ssDetail.pickingType;
        this.shipTypes = this.ssDetail.shipType;
        if (this.ssDetail.senderAddressCn) {
          this.senderCn = this.ssDetail.senderAddressCn;

          if (this.senderCn.provinceId != null) {
            this.loadCities(this.senderCn.provinceId);
          }
          if (this.senderCn.cityId != null) {
            this.loadRegions(this.senderCn.cityId);
          }
        }
        if (this.ssDetail.senderAddressEn) {
          this.senderEn = this.ssDetail.senderAddressEn;
        }


        this.amazonCarrierCode = this.ssDetail.carrierCodes.find(m => m.channelType == 'Amazon');
        this.aliExpressCarrierCode = this.ssDetail.carrierCodes.find(m => m.channelType == 'AliExpress');
        this.wishCarrierCode = this.ssDetail.carrierCodes.find(m => m.channelType == 'Wish');
        this.saveCarrierCodes.push(this.amazonCarrierCode);
        this.saveCarrierCodes.push(this.aliExpressCarrierCode);
        this.saveCarrierCodes.push(this.wishCarrierCode);
      }, this.handleError);
    }

    this.bill = this.editLogisticStyleService.getBill();
    this.declaration = this.editLogisticStyleService.getDeclarationBill();
    this.choose_bill = this.bill[0];
    this.declaration_bill = this.declaration[0];
  }
  getChannelCarrierCodes(channelType: string ){
      return this.allCarrierCodes.filter(m=>m.channelType == channelType)
  }
  onIfNeedTraceNumChange(hasTrackingNumber: boolean) {
    this.ssDetail.hasTrackingNumber = hasTrackingNumber;
  }
  onIfNeedReturnPackage(needReturnPackage: boolean) {
    this.ssDetail.needReturnPackage = needReturnPackage;
  }
  loadCities(provinceId: string) {
    this.cities = [];
    this.commonService.getCities(provinceId).subscribe(data => {
      this.cities = data.content;
    });
  }

  loadRegions(regionId: string) {
    this.regions = [];
    this.commonService.getRegions(regionId).subscribe(data => {
      this.regions = data.content;
    });
  }

  editCarrierCodes() {
    this.isEditCarrierCodes = true;
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  openModal(index) {
    const chooseModal = this.modalService.open(ChooseApiTemplateComponent, { size: 'sm', backdrop: 'static' });
    if (index === 0) {
      chooseModal.componentInstance.bill = this.bill;
    } else {
      chooseModal.componentInstance.bill = this.declaration;
    }

    chooseModal.result.then((result) => {
      console.log(result);

      if (index === 0) {
        this.choose_bill = result;

        var ss = result.img;
        var str = ss.split("/").pop().replace(/(^ll)|(\.\S+$)/g, "");
        this.addressLabelCode = str;

      } else {
        this.declaration_bill = result;

        var ss = result.img;
        var str = ss.split("/").pop().replace(/(^on)|(\.\S+$)/g, "");
        this.declarationLabelCode = str;

      }
    }, (reason) => {
      console.info(reason);
    });
  }


  saveServiceSetting() {
    if (this.ssId == null) {
       var ssName = $('#ssName').val();

      if (ssName == '' || ssName == null) {
        this.error('物流方式名称必填');
        return;
      }
      if (this.amazonCarrierCode.carrierCode == '' || this.amazonCarrierCode.carrierCode == null) {
        this.error('回传名称必选');
        return;
      }
      if (this.addressLabelCode == 'API') {
        this.error('手动添加的物流方式地址标签不能选择API模板');
        return;
      }
      if (this.declarationLabelCode == 'API') {
        this.error('手动添加的物流方式报关单标签不能选择API模板');
        return;
      }
      for(const carrier of this.saveCarrierCodes){
        if(carrier.carrierCode != null && carrier.carrierCode.toLowerCase().indexOf('other')>=0){

        }
        else{
          carrier.customCarrierName="";
        }
      }



      this.senderEn.zipCode = this.senderCn.zipCode;
      this.senderEn.email = this.senderCn.email;
      this.senderEn.phoneNumber = this.senderCn.phoneNumber;
      this.senderEn.regionId = this.senderCn.regionId;
      this.senderEn.cityId = this.senderCn.cityId;
      this.senderEn.provinceId = this.senderCn.provinceId;

      let data = {
        WarehouseId: this.warehouseId,
        ssName: ssName,
        carrierCodes: this.saveCarrierCodes,
        hasTrackingNumber: this.ssDetail.hasTrackingNumber,
        needReturnPackage: this.ssDetail.needReturnPackage,
        trackSite: this.ssDetail.trackSite,
        shippingLabelSetting: {
          PaperType: 'L10X10',
          AddressLabelCode: this.addressLabelCode,
          DeclarationLabelCode: this.declarationLabelCode,
        },
        senderAddressCn: this.senderCn,
        senderAddressEn: this.senderEn,
        pickingType: this.pickWay,
        shipType:this.shipTypes

      };

      this.shippingMethodService.createServiceSetting(data).subscribe(data => {
        this.alertMessage("添加成功");
        this.activeModal.close();
      }, this.handleError);

    }
    else {
      for(const carrier of this.saveCarrierCodes){
        if(carrier.carrierCode != null && carrier.carrierCode.toLowerCase().indexOf('other')>=0){

        }
        else{
          carrier.customCarrierName="";
        }
      }


      this.senderEn.zipCode = this.senderCn.zipCode;
      this.senderEn.email = this.senderCn.email;
      this.senderEn.phoneNumber = this.senderCn.phoneNumber;
      this.senderEn.regionId = this.senderCn.regionId;
      this.senderEn.cityId = this.senderCn.cityId;
      this.senderEn.provinceId = this.senderCn.provinceId;

      let data = {
        settingId: this.ssDetail.settingId,
        WarehouseId: this.warehouseId,
        ssid: this.ssDetail.ssId,
        ssName: this.ssDetail.ssName,
        carrierCodes: this.saveCarrierCodes,
        hasTrackingNumber: this.ssDetail.hasTrackingNumber,
        needReturnPackage: this.ssDetail.needReturnPackage,
        trackSite: this.ssDetail.trackSite,
        shippingLabelSetting: {
          PaperType: 'L10X10',
          AddressLabelCode: 'API',
          DeclarationLabelCode: 'API',
        },
        senderAddressCn: this.senderCn,
        senderAddressEn: this.senderEn,
        pickingType: this.pickWay,
        shipType:this.shipTypes
      };
      console.log(data);
      this.shippingMethodService.saveServiceSetting(this.warehouseId, this.ssId, data).subscribe(data => {
        this.alertMessage("修改成功");
        this.activeModal.close();
      }, this.handleError);
    }


  }

  onProvinceChange() {
    this.senderCn.cityId = null;
    this.senderCn.regionId = null;
    if (this.senderCn.provinceId != null) {
      this.loadCities(this.senderCn.provinceId)
    }
  }

  onCityChange() {
    this.senderCn.regionId = null;

    if (this.senderCn.cityId != null) {
      this.loadRegions(this.senderCn.cityId)
    }
  }
}
