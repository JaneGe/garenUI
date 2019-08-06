import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbTypeaheadSelectItemEvent } from "@ng-bootstrap/ng-bootstrap";
import { RootComponent } from "../../../../shared/component/root.component";
import { WarehouseOptionModel } from "../../../../shared/models/warehouses/warehouse-option-model";
import { WarehouseShippingServiceOptionModel } from "../../../../shared/models/warehouses/warehouse-shipping-service-option-model";
import { ShippingMethodService } from "../../../../shared/services/shipping-method-service";
import { CommonService } from "../../../../shared/services/common-service";
import { Select2OptionData } from "ng2-select2/ng2-select2";
import { SkuService } from "../../../../shared/services/sku-service";
import { SkuSearchLiteModel } from "../../../../shared/models/products/sku-search-lite-model";
import { ShopAccountService } from "../../../../shared/services/shop.account.service";
import { OrderCompleteSaleRuleService } from "../../../../shared/services/order-complete-sale-rule.service";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { AccountLiteListModel } from "../../../../shared/models/channels/account-lite-list-model";
import { forEach } from "@angular/router/src/utils/collection";
import { of } from "rxjs/observable/of";

@Component({
  selector: 'app-complete-sale-rule-modal',
  templateUrl: './complete-sale-rule-modal.component.html',
  styleUrls: ['./complete-sale-rule-modal.component.scss'],
  providers: [ShippingMethodService, CommonService, SkuService, ShopAccountService, OrderCompleteSaleRuleService]
})
export class CompleteSaleRuleModalComponent extends RootComponent implements OnInit {
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .distinctUntilChanged()
      .switchMap(term => {
        if (term == null || term.length < 1) {
          return of([]);
        }
        else {
          let data = this.loadSkusProise(term).catch((e) => {
            this.handleError(e);
            return of([]);
          });
          return data;
        }
      });

  skuFormatter = (x: Select2OptionData) => x.text;
  disPlaySkuFormatter = (x: Select2OptionData) => {
    const skuId = x.id;
    if (skuId != '_Choice_') {
      const skuIndex = this.selectedSkuIds.findIndex(m => m == skuId);
      if (skuIndex < 0) {
        this.selectedSkuIds.push(skuId);
        this.refreshDisPlaySelectSkus();
      }
    }
    return x.text;
  };
  ruleName: string = '';
  priority: number = null;
  modalHeader: string = '';
  selectedWarehouseId: number = null;
  @Input()
  allWarehouses: WarehouseOptionModel[] = [];
  @Input()
  channelType: string;
  @Input()
  ruleId: number = 0;

  allCountries: Select2OptionData[];
  selectedCountryCodes: string[] = [];
  selectedCountries: Select2OptionData[] = [];
  isCheckAllChannel: boolean;
  selectTrackingNumberType: string = 'None';

  mondayExe: RuleExeTimeModel = { checked: true, time: { start: '0', end: '24' } };
  tuesdayExe: RuleExeTimeModel = { checked: true, time: { start: '0', end: '24' } };
  wednesdayExe: RuleExeTimeModel = { checked: true, time: { start: '0', end: '24' } };
  thursdayExe: RuleExeTimeModel = { checked: true, time: { start: '0', end: '24' } };
  fridayExe: RuleExeTimeModel = { checked: true, time: { start: '0', end: '24' } };
  saturdayExe: RuleExeTimeModel = { checked: true, time: { start: '0', end: '24' } };
  sundayExe: RuleExeTimeModel = { checked: true, time: { start: '0', end: '24' } };
  deliverTimeInfo: any = { value: 0, payHours: null, shipHours: null };


  allDropShippingService: Array<Select2OptionData>;
  warehouseAllShippingService: WarehouseShippingServiceOptionModel[] = [];
  selectSsIds: string[] = [];
  selectedDropShippingService: Select2OptionData[] = [];

  allDropSkus: Array<Select2OptionData> = [];
  allSkus: SkuSearchLiteModel[] = [];
  selectedSkuIds: string[] = [];
  selectedDropSkus: Select2OptionData[] = [];

  allDropChannels: Array<Select2OptionData>;
  allChannels: AccountLiteListModel[] = [];
  selectedChannelIds: string[] = [];
  selectedChannels: Select2OptionData[] = [];


  isActive: boolean = true;

  constructor(private activeModal: NgbActiveModal,
    private commonService: CommonService,
    private skuService: SkuService,
    private shopAccountService: ShopAccountService,
    private orderCompleteSaleRuleService: OrderCompleteSaleRuleService,
    private shippingMethodService: ShippingMethodService) {
    super();
  }

  ngOnInit() {
    $("#myform").parent().parent().css({ 'width': '1200px', 'left': '-200px' });

    const countrySub = new Subject<any>();
    const channelSub = new Subject<any>();
    //const skuSub = new Subject<any>();

    this.loadCounryData(countrySub);
    //this.loadSkus(skuSub);
    this.loadChannels(channelSub);

    const task = Observable.forkJoin(countrySub, channelSub);
    task.subscribe(d => {
        this.loadRuleDetail();
    });
  }

  OnselectItem(val) {
    //  console.log(val);
  }

  cleanSearchText() {
    $('#product').val('');
    $('#product')[0].focus();

    this.selectedSkuIds = [];
    this.refreshDisPlaySelectSkus();
  }

  loadRuleDetail() {
    if (this.ruleId > 0) {
      this.orderCompleteSaleRuleService.getRuleDetail(this.ruleId).subscribe(data => {
        const ruleInfo = data.content;
        if (this.channelType.toLowerCase() != ruleInfo.channelType.toLowerCase()) {
          this.error("平台数据错误,请刷新页面");
          return;
        }
        this.ruleName = ruleInfo.name;
        this.selectedWarehouseId = ruleInfo.warehouseId;
        this.priority = ruleInfo.priority;
        if (ruleInfo.channelIds != null) {
          this.selectedChannelIds = ruleInfo.channelIds;
        }
        if (ruleInfo.countryCodes != null) {
          this.selectedCountryCodes = ruleInfo.countryCodes;
        }
        if (ruleInfo.ssIds != null) {
          this.selectSsIds = ruleInfo.ssIds;
        }
        if (ruleInfo.skuIds != null) {
          this.selectedSkuIds = ruleInfo.skuIds;

          let iSkus: Select2OptionData[] = [];
          for (const sku of ruleInfo.skus) {
            const item = <any>{};
            item.id = sku.skuId.toString();
            item.text = sku.skuCode
            iSkus.push(item);
          }
          this.selectedDropSkus = iSkus;
        }
        if (ruleInfo.isAllChannel != null) {
          this.isCheckAllChannel = ruleInfo.isAllChannel;
        }
        this.isActive = ruleInfo.isActive;
        this.selectTrackingNumberType = ruleInfo.trackingNumberType;

        if (ruleInfo.runTimeInfo.shipTimeData != null) {
          const shipTimeData = ruleInfo.runTimeInfo.shipTimeData;
          if (shipTimeData.saleShipTimeType == 'Shipped') {
            this.deliverTimeInfo.value = 0;
          }
          else if (shipTimeData.saleShipTimeType == 'PaiedAfter') {
            this.deliverTimeInfo.value = 1;
            this.deliverTimeInfo.payHours = shipTimeData.hours;
          }
          else if (shipTimeData.saleShipTimeType == 'ChannelRequiredTimeBefore') {
            this.deliverTimeInfo.value = 2;
            this.deliverTimeInfo.shipHours = shipTimeData.hours;
          }
        }
        if (ruleInfo.runTimeInfo.times != null) {
          let timeInfo = ruleInfo.runTimeInfo.times;
          for (const item of timeInfo) {
            if (item.dayOfWeek == 'Monday') {
              this.mondayExe.checked = true;
              this.mondayExe.time.start = item.hourFrom.toString();
              this.mondayExe.time.end = item.hourTo.toString();
            }
            else if (item.dayOfWeek == 'Tuesday') {
              this.tuesdayExe.checked = true;
              this.tuesdayExe.time.start = item.hourFrom.toString();
              this.tuesdayExe.time.end = item.hourTo.toString();
            } else if (item.dayOfWeek == 'Wednesday') {
              this.wednesdayExe.checked = true;
              this.wednesdayExe.time.start = item.hourFrom.toString();
              this.wednesdayExe.time.end = item.hourTo.toString();
            } else if (item.dayOfWeek == 'Thursday') {
              this.thursdayExe.checked = true;
              this.thursdayExe.time.start = item.hourFrom.toString();
              this.thursdayExe.time.end = item.hourTo.toString();
            } else if (item.dayOfWeek == 'Friday') {
              this.fridayExe.checked = true;
              this.fridayExe.time.start = item.hourFrom.toString();
              this.fridayExe.time.end = item.hourTo.toString();
            } else if (item.dayOfWeek == 'Saturday') {
              this.saturdayExe.checked = true;
              this.saturdayExe.time.start = item.hourFrom.toString();
              this.saturdayExe.time.end = item.hourTo.toString();
            } else if (item.dayOfWeek == 'Sunday') {
              this.sundayExe.checked = true;
              this.sundayExe.time.start = item.hourFrom.toString();
              this.sundayExe.time.end = item.hourTo.toString();
            }
          }
        }

        this.refreshDisPlaySelectSkus();
        this.refreshDisplayChannels();
        this.refreshDisPlaySelectCountries();
        this.loadShippingServices();
      }, this.handleError);
    }else{
      this.orderCompleteSaleRuleService.GetMaxRulePriority(this.channelType).subscribe(data => {
          this.priority=data.content;
      }, this.handleError);
    }
  }

  onWarehouseChange(val) {
    this.selectSsIds = [];
    this.selectedDropShippingService = [];
    this.warehouseAllShippingService = [];
    this.allDropShippingService = [];
    this.loadShippingServices();
  }

  loadShippingServices() {
    this.shippingMethodService.getWarehouseAllSelectedShippingService(this.selectedWarehouseId).subscribe(data => {
      this.warehouseAllShippingService = data.content;
      const theAllDropShippingService: Select2OptionData[] = [{ id: '_Choice_', text: '请选择' }];
      for (let c of this.warehouseAllShippingService) {
        const item = <Select2OptionData>{};
        item.id = c.ssid.toString();
        item.text = c.name;
        theAllDropShippingService.push(item);
      }
      this.allDropShippingService = theAllDropShippingService;

      this.refreshDisPlaySelectShippingServices();
    }, e => {
      this.handleError(e);
    });
  }

  loadChannels(sub: Subject<any>) {
    this.shopAccountService.getAllAccountLiteList(this.channelType).subscribe(data => {
      let accountList: Select2OptionData[] = [{ id: '_Choice_', text: '请选择' }, { id: '_All_', text: '全部' }];
      const accounts = data.content;
      this.allChannels = accounts;
      for (const c of accounts) {
        const item = <Select2OptionData>{
          id: c.channelId.toString(),
          text: c.displayName
        };
        accountList.push(item);
      }
      this.allDropChannels = accountList;
      sub.next('1');
      sub.complete();
    }, this.handleError);
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  cleanSelectCountry(el: any) {
    this.selectedCountryCodes = [];
    this.refreshDisPlaySelectCountries();
    el.setElementValue('_Choice_');
  }

  loadCounryData(sub: Subject<any>) {
    this.commonService.getAllCountries().subscribe(data => {
      const theCountries: Select2OptionData[] = [{ id: '_Choice_', text: '请选择' }];

      for (let c of data.content) {
        const item = <any>{};
        item.id = c.code;
        item.text = `${c.chineseName}(${c.code})`;
        theCountries.push(item);
      }
      this.allCountries = theCountries;
      sub.next(1);
      sub.complete();
    }, this.handleError);
  }

  loadSkus(searchText) {
    this.skuService.serachSkus(searchText).subscribe(data => {
      this.allSkus = data.content;
      const dropSkus = [{ id: '_Choice_', text: '请选择' }];
      for (const sku of this.allSkus) {
        const item = <any>{};
        item.id = sku.skuId.toString();
        item.text = sku.skuCode;
        dropSkus.push(item);
      }
      this.allDropSkus = dropSkus;
    }, this.handleError);
  }

  loadSkusProise(searchText) {
    return this.skuService.serachSkus(searchText).map(data => {
      this.allSkus = data.content;
      const dropSkus = [{ id: '_Choice_', text: '请选择' }];
      for (const sku of this.allSkus) {
        const item = <any>{};
        item.id = sku.skuId.toString();
        item.text = sku.skuCode;
        dropSkus.push(item);
      }
      this.allDropSkus = dropSkus;
      return dropSkus;
    });
  }

  onSelectCountry(value: any, el: any) {
    el.setElementValue('_Choice_');
    const countryCode = value.value;
    if (countryCode == '_Choice_') {
      return;
    }
    let item = this.selectedCountryCodes.findIndex(m => m == countryCode);
    if (item < 0) {
      this.selectedCountryCodes.push(countryCode);
      this.refreshDisPlaySelectCountries();
    }
  }

  refreshDisPlaySelectCountries() {
    if (this.selectedCountryCodes != null) {
      this.selectedCountries = this.allCountries.filter(m => this.selectedCountryCodes.findIndex(x => x == m.id) >= 0);
    }
  }

  deleteCountry(countryCode) {
    const itemIndex = this.selectedCountryCodes.findIndex(m => m == countryCode);
    if (itemIndex >= 0) {
      this.selectedCountryCodes.splice(itemIndex, 1);
      this.refreshDisPlaySelectCountries();
    }
  }


  onShippingServiceChange(val: any, el: any) {
    el.setElementValue('_Choice_');
    const ssid = val.value;
    if (ssid == '_Choice_') {
      return;
    }
    const ssIndex = this.selectSsIds.findIndex(m => m == ssid);
    if (ssIndex < 0) {
      this.selectSsIds.push(ssid);
      this.refreshDisPlaySelectShippingServices();
    }
  }

  refreshDisPlaySelectShippingServices() {
    if (this.allDropShippingService != null && this.selectSsIds != null) {
      this.selectedDropShippingService = this.allDropShippingService.filter(m =>
        this.selectSsIds.findIndex(x => x == m.id) >= 0);
    }
  }

  deleteShippingService(ssId) {
    const ssIndex = this.selectSsIds.findIndex(m => m == ssId);
    if (ssIndex >= 0) {
      this.selectSsIds.splice(ssIndex, 1);
      this.refreshDisPlaySelectShippingServices();
    }
  }

  cleanSelectShippingService(el: any) {
    this.selectSsIds = [];
    this.refreshDisPlaySelectShippingServices();
    el.setElementValue('_Choice_');
  }

  onSkuChange(val: any, el: any) {
    el.setElementValue('_Choice_');
    const skuId = val.value;
    if (skuId == '_Choice_') {
      return;
    }
    const skuIndex = this.selectedSkuIds.findIndex(m => m == skuId);
    if (skuIndex < 0) {
      this.selectedSkuIds.push(skuId);
      this.refreshDisPlaySelectSkus();
    }
  }

  cleanSelectedSku(el: any) {
    this.selectedSkuIds = [];
    this.refreshDisPlaySelectSkus();
    el.setElementValue('_Choice_');
  }

  deleteSku(skuId) {
    const skuIndex = this.selectedSkuIds.findIndex(m => m == skuId);
    if (skuIndex >= 0) {
      this.selectedSkuIds.splice(skuIndex, 1);
      this.refreshDisPlaySelectSkus();
    }
  }

  refreshDisPlaySelectSkus() {
    if (this.selectedSkuIds != null) {
      const oSkus = this.selectedDropSkus.filter(m => this.selectedSkuIds.findIndex(x => x == m.id) >= 0);
      const nSkus = this.allDropSkus.filter(m => this.selectedSkuIds.findIndex(x => x == m.id) >= 0);
      for (let item of nSkus) {
        let itemIndex = oSkus.findIndex(m => m.id == item.id);
        if (itemIndex < 0) {
          oSkus.push(item);
        }
      }
      this.selectedDropSkus = oSkus;
    }
  }

  deleteChannel(channelId) {
    let cIndex = this.selectedChannelIds.findIndex(m => m == channelId);
    if (cIndex >= 0) {
      this.selectedChannelIds.splice(cIndex, 1);
      this.refreshDisplayChannels()
    }
  }

  onChannelChange(val, el: any) {
    if (this.isCheckAllChannel) {
      return;
    }
    el.setElementValue('_Choice_');
    const channelId = val.value;
    if (channelId == '_Choice_') {
      return;
    }
    if (channelId == '_All_') {
      this.selectedChannelIds = [];
      let tempArr = [];
      for (let c of this.allChannels) {
        tempArr.push(c.channelId.toString());
      }
      this.selectedChannelIds = tempArr;
      this.refreshDisplayChannels();
    }
    else {
      const cIndex = this.selectedChannelIds.findIndex(m => m == channelId);
      if (cIndex < 0) {
        this.selectedChannelIds.push(channelId);
        this.refreshDisplayChannels();
      }
    }

  }

  cleanSelectChannels(el: any) {
    this.selectedChannelIds = [];
    this.selectedChannels = [];
    el.setElementValue('_Choice_');
  }

  refreshDisplayChannels() {
    if (this.selectedChannelIds != null) {
      this.selectedChannels = this.allDropChannels.filter(m =>
        this.selectedChannelIds.findIndex(x => x == m.id) >= 0);
    }
  }


  NumberInput(minval: string, maxval: string) {
    if (minval != null) {
      if (minval.toString().indexOf('.') != -1 || maxval.toString().indexOf('.') != -1) {
        this.error('请确保输入整数！');
      }
      else if (parseInt(minval) < 0 || parseInt(maxval) < 0) {
        this.error('时间不能小于0时！');
      }
      else if (parseInt(minval) > 24 || parseInt(maxval) > 24) {
        this.error('时间不能大于24时！');
      }
      else if (parseInt(minval) > parseInt(maxval)) {
        this.error('注意时间区间！');
      }
    }
  }


  OnSubmit() {
    let data = <any>{
      id: this.ruleId,
      name: this.ruleName,
      channelType: this.channelType,
      WarehouseId: this.selectedWarehouseId,
      priority: this.priority,
      ChannelIds: this.selectedChannelIds.filter(m => m != null),
      CountryCodes: this.selectedCountryCodes.filter(m => m != null),
      SsIds: this.selectSsIds.filter(m => m != null),
      SkuIds: this.selectedSkuIds.filter(m => m != null),
      isActive: this.isActive
    };

    const runTimeDataItems: any[] = [];
    if (this.mondayExe.checked) {
      const item = {
        DayOfWeek: 'Monday',
        HourFrom: this.mondayExe.time.start,
        HourTo: this.mondayExe.time.end
      }
      runTimeDataItems.push(item);
    }
    if (this.tuesdayExe.checked) {
      const item = {
        DayOfWeek: 'Tuesday',
        HourFrom: this.tuesdayExe.time.start,
        HourTo: this.tuesdayExe.time.end
      }
      runTimeDataItems.push(item);
    }

    if (this.wednesdayExe.checked) {
      const item = {
        DayOfWeek: 'Wednesday',
        HourFrom: this.wednesdayExe.time.start,
        HourTo: this.wednesdayExe.time.end
      }
      runTimeDataItems.push(item);
    }

    if (this.thursdayExe.checked) {
      const item = {
        DayOfWeek: 'Thursday',
        HourFrom: this.thursdayExe.time.start,
        HourTo: this.thursdayExe.time.end
      }
      runTimeDataItems.push(item);
    }

    if (this.fridayExe.checked) {
      const item = {
        DayOfWeek: 'Friday',
        HourFrom: this.fridayExe.time.start,
        HourTo: this.fridayExe.time.end
      };
      runTimeDataItems.push(item);
    }

    if (this.saturdayExe.checked) {
      const item = {
        DayOfWeek: 'Saturday',
        HourFrom: this.saturdayExe.time.start,
        HourTo: this.saturdayExe.time.end
      }
      runTimeDataItems.push(item);
    }

    if (this.sundayExe.checked) {
      const item = {
        DayOfWeek: 'Sunday',
        HourFrom: this.sundayExe.time.start,
        HourTo: this.sundayExe.time.end
      }
      runTimeDataItems.push(item);
    }

    let shipTimeData = { SaleShipTimeType: this.deliverTimeInfo.value, Hours: 0 };
    if (this.deliverTimeInfo.value == 1) {
      shipTimeData.Hours = this.deliverTimeInfo.payHours
    }
    else if (this.deliverTimeInfo.value == 2) {
      shipTimeData.Hours = this.deliverTimeInfo.shipHours
    }
    if (shipTimeData.Hours == null) {
      shipTimeData.Hours = 0;
    }

    let timeData = {
      Times: runTimeDataItems,
      ShipTimeData: shipTimeData
    };
    data.RunTimeInfo = timeData;
    data.IsAllChannel = this.isCheckAllChannel;
    data.TrackingNumberType = this.selectTrackingNumberType;

    if (!/\d+/.test(data.priority)) {
      this.error('请填写优先级');
      return;
    }

    this.orderCompleteSaleRuleService.saveRule(data).subscribe(data => {
      this.alertMessage("保存成功");
      this.activeModal.close(true);
    }, this.handleError);
  }
  doCheckAllChannelAccounts() {
    this.selectedChannelIds = [];
    this.refreshDisplayChannels()
  }

}

export class RuleExeTimeModel {
  checked: boolean;
  time: { start: string, end: string }
}
