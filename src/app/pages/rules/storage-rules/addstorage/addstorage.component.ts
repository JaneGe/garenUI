import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppointmoneyComponent} from "../../detailsModal/appointmoney/appointmoney.component";
import {AppoincommodityComponent} from "../../detailsModal/appoincommodity/appoincommodity.component";
import {OutrangecountryComponent} from "../../detailsModal/outrangecountry/outrangecountry.component";
import {LimitingaccountComponent} from "../../detailsModal/limitingaccount/limitingaccount.component";
import {LimitingcountryComponent} from "../../detailsModal/limitingcountry/limitingcountry.component";
import {StorageRulesService} from "../StorageRules.service";
import {LimitinglogisticsComponent} from "../../detailsModal/limitinglogistics/limitinglogistics.component";
import {OptionsService} from "../../options.Service";
import * as Slide from "../../../../shared/animations/modal-Slide";
import {
  LimitingAccountModel, LimitingLogisticsModel, LimitingMoneyModel, LimitingOrderChannelTypeModel,
  OrderRulesAddModel
} from "../../../../shared/models/orderrules/orderrules.model";
import {forEach} from "@angular/router/src/utils/collection";
import {RootComponent} from "../../../../shared/component/root.component";
import {limitingattrComponent} from "../../detailsModal/limitingAttr/limitingattr.component";
import {LimitingPlatformComponent} from "../../detailsModal/limitingPlatform/limitingPlatform.component";


@Component({
  selector: 'app-addstorage',
  templateUrl: './addstorage.component.html',
  styleUrls: ['./addstorage.component.scss', '../../public.scss']
})
export class AddstorageComponent extends RootComponent implements OnInit {
  modalHeader:string='';
  name: string = '';
  id: number;
  storage: number = 0;
  storageRulesData: Array<any>=[];
  storageData: Array<any>=[];
  ifModify: boolean;
  limitingmoney: { currency: string, min: string, max: string };
  limitingcommodity: Array<any>=[];
  limitingcountry: string[] = [];
  limitingaccount: Array<{ id: string, name: string }>=[];
  limitinglogistics: LimitingLogisticsModel[];
  allorders: boolean = true;
  outrangecountry: Array<any>=[];
  limitingAttr: Array<any>=[];
  outrangeAttr: Array<any>=[];
  selectedRules: string[] = [];
  bigpriority: number;
  bigid: number;
  node: any;
  modifyRuleItem: any;
  warehouseId:any;
  orderaddmodel: OrderRulesAddModel;
  seletedPlatform='';
  constructor(private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private _storageRulesService: StorageRulesService,
              private _optionsService: OptionsService) {
    super();
    this.storageRulesData = _storageRulesService.storageRulesData;
    this.storageData = _optionsService.storageData;
    this.orderaddmodel = new OrderRulesAddModel();
  }

  ngOnInit() {
    this.node = document.getElementById('form').parentNode.parentNode.parentNode;
    Slide.slideIn(this.node);
    this._optionsService.GetStorageData().subscribe(data => {
      this.storageData = data.content;
      // if(this.storageData.length>0)
      // {
      //   this.storage=this.storageData[0].warehouseId;
      // }
    });
    this.limitinglogistics.splice(0, 1);
    this.onInitRulesItem();
  }

  closeModal() {
    Slide.slideLeft(this.node, this);
  }

  onInitRulesItem() {
    if (this.id != null) {
      this._storageRulesService.GetWareHouseRulesItems(this.id).subscribe(data => {
        this.modifyRuleItem = data.content;
        this.storage = this.modifyRuleItem.wareHouseId;
        if (this.modifyRuleItem.hasRefund && this.selectedRules.indexOf('hasrefund') == -1) {
          this.selectedRules.push('hasrefund');
        }
        if (this.modifyRuleItem.hasRetroactive && this.selectedRules.indexOf('hasretroactive') == -1) {
          this.selectedRules.push('hasretroactive');
        }
        if (this.modifyRuleItem.notmatchPaypal && this.selectedRules.indexOf('notmatchPaypal') == -1) {
          this.selectedRules.push('notmatchPaypal');
        }
        if (this.modifyRuleItem.noProvince && this.selectedRules.indexOf('noprovince') == -1) {
          this.selectedRules.push('noprovince');
        }
        if (this.modifyRuleItem.limitingMoney != null && this.selectedRules.indexOf('limitingmoney') == -1) {
          this.selectedRules.push('limitingmoney');
          this.limitingmoney.currency = this.modifyRuleItem.limitingMoney.currency;
          this.limitingmoney.min = this.modifyRuleItem.limitingMoney.min;
          this.limitingmoney.max = this.modifyRuleItem.limitingMoney.max;
        }
        if (this.modifyRuleItem.limitingCommodity && this.selectedRules.indexOf('limitingcommodity') == -1) {
          this.selectedRules.push('limitingcommodity');
          this.limitingcommodity = this.modifyRuleItem.limitingCommodity;
        }
        if (this.modifyRuleItem.limitingCountry && this.selectedRules.indexOf('limitingcountry') == -1) {
          this.selectedRules.push('limitingcountry');
          this.limitingcountry = this.modifyRuleItem.limitingCountry;
        }
        if (this.modifyRuleItem.outRangeCountry && this.selectedRules.indexOf('outrangecountry') == -1) {
          this.selectedRules.push('outrangecountry');
          this.outrangecountry = this.modifyRuleItem.outRangeCountry;
        }
        if (this.modifyRuleItem.limitingLogistics && this.selectedRules.indexOf('limitinglogistics') == -1) {
          this.selectedRules.push('limitinglogistics');
          this.limitinglogistics = this.modifyRuleItem.logisticsInfos;
        }
        if (this.modifyRuleItem.allOrder && this.selectedRules.indexOf('allorders') == -1) {
          this.selectedRules.push('allorders');
        }
        if (this.modifyRuleItem.limitingAccount && this.selectedRules.indexOf('limitingaccount') == -1) {
          this.selectedRules.push('limitingaccount');
          for (let i = 0; i < this.modifyRuleItem.limitingAccount.length; i++) {
            let _tempRuleData: { id: string, name: string } = {id: '', name: ''};
            _tempRuleData.name = this.modifyRuleItem.limitingAccount[i].channelName;
            _tempRuleData.id = this.modifyRuleItem.limitingAccount[i].channelId;
            this.limitingaccount.push(_tempRuleData);
          }
        }
        if (this.modifyRuleItem.limitingChannelType && this.selectedRules.indexOf('limitingPlatform') == -1) {
          this.selectedRules.push('limitingPlatform');
          this.seletedPlatform = this.modifyRuleItem.limitingChannelType.channelType;
        }
        if (this.modifyRuleItem.productAttrIn && this.selectedRules.indexOf('attrlimiting') == -1) {
          this.selectedRules.push('attrlimiting');
          this.limitingAttr = this.modifyRuleItem.productAttrIn;
        }
        if (this.modifyRuleItem.productAttrOut && this.selectedRules.indexOf('outrangeattr') == -1) {
          this.selectedRules.push('outrangeattr');
          this.outrangeAttr = this.modifyRuleItem.productAttrOut;
        }
      });
    }
  }

  onSubmit() {
    this.bigpriority = 0;
    this.bigid = 1;
    for (var j = 0; j < this.storageRulesData.length; j++) {
      var obj = this.storageRulesData[j];
      for (var i in obj) {
        if (obj.priority > this.bigpriority) {
          this.bigpriority = obj.priority;
        }
      }
    }
    this.orderaddmodel.warehouseId = this.storage;
    this.orderaddmodel.priority = this.bigpriority + 1;
    if (this.name != '' && this.storage.toString() != '') {
      this.orderaddmodel.name = this.name;
      if (this.selectedRules.length == 0) {
        this.error("仓库规则不能没有明细!");
        return;
      }
      for (let j: number = 0; j < this.selectedRules.length; j++) {
        if (this.selectedRules[j] == 'limitingmoney') {
          if ((this.limitingmoney.min == null && this.limitingmoney.max == null) || this.limitingmoney.currency == '') {
            this.error("订单规则:订单金额在指定范围之内范围数据不能为空!");
            return;
          }

          this.orderaddmodel.limitingmoney = new LimitingMoneyModel();
          this.orderaddmodel.limitingmoney.max = this.limitingmoney.max;
          this.orderaddmodel.limitingmoney.min = this.limitingmoney.min;
          this.orderaddmodel.limitingmoney.currency = this.limitingmoney.currency;
        }
        if (this.selectedRules[j] == 'limitingcommodity') {
          if (this.limitingcommodity.length == 0) {
            this.error("订单规则:订单商品包含指定商品中请添加商品!");
            return;
          }
          this.orderaddmodel.limitingcommodity = this.limitingcommodity
        }
        if (this.selectedRules[j] == 'limitingcountry') {
          if (this.limitingcountry.length == 0) {
            this.error("订单规则:订单目的地为指定国家,请指定目的地!");
            return;
          }
          this.orderaddmodel.limitingcountry = this.limitingcountry;
        }
        if (this.selectedRules[j] == 'limitingaccount') {
          if (this.limitingaccount.length == 0) {
            this.error("订单规则:订单来源为指定平台帐号,请指定账号信息!");
            return;
          }
          this.orderaddmodel.limitingaccount = [];
          for (let i = 0; i < this.limitingaccount.length; i++) {
            let _tempData = {id: this.limitingaccount[i].id, name: this.limitingaccount[i].name};
            this.orderaddmodel.limitingaccount.push(_tempData);
          }
          this.orderaddmodel.limitingaccount = this.limitingaccount;
        }
        if (this.selectedRules[j] == 'limitingPlatform') {
          if(this.isNullOrEmpty(this.seletedPlatform)){
            this.error("订单规则:订单来源为指定平台,请指定平台信息!");
            return;
          }
          this.orderaddmodel.limitingChannelType = null;
          const limitingChannelTypeData = <LimitingOrderChannelTypeModel>{};
          limitingChannelTypeData.channelType = this.seletedPlatform;
          this.orderaddmodel.limitingChannelType = limitingChannelTypeData;
        }
        if (this.selectedRules[j] == 'outrangecountry') {
          if (this.outrangecountry.length == 0) {
            this.error("订单规则:订单目的地为指定国家之外,请指定目的地!");
            return;
          }
          this.orderaddmodel.outrangecountry = this.outrangecountry
        }
        if (this.selectedRules[j] == 'allorders') {
          this.orderaddmodel.allorder = true;
        }
        if (this.selectedRules[j] == 'limitinglogistics') {
          if (this.limitinglogistics.length == 0) {
            this.error("订单规则:买家选择的物流方式为指定物流方式,请指定物流方式");
            return;
          }
          const limitinglogisticsIds: number[] = [];
          for(const l of this.limitinglogistics){
            limitinglogisticsIds.push(l.id);
          }
          this.orderaddmodel.limitinglogistics = limitinglogisticsIds;
        }
        if(this.selectedRules[j]=='outrangeattr'){
          if(this.outrangeAttr.length==0){
            this.error("订单规则:订单指定物流属性之外，请设置物流属性!");
            return;
          }
          //  this.orderaddmodel.productAttrIn=[];
          this.orderaddmodel.productAttrOut = this.outrangeAttr;

        }
        if(this.selectedRules[j]=='attrlimiting'){
          if(this.limitingAttr.length==0){
            this.error("订单规则:订单指定物流属性，请设置物流属性!");
            return;
          }
          this.orderaddmodel.productAttrIn = this.limitingAttr;
        }
      }
      this._storageRulesService.AddWarehousesRules(this.orderaddmodel, this.ifModify, this.id).subscribe(data => {
        this.activeModal.close(1);
      },this.handleError);

    }
    else {
      this.error('请完善必填信息！');
    }
  }

  ifchecked(el: string) {
    var index = this.selectedRules.indexOf(el);
    if (index == -1) {
      this.selectedRules.push(el);
      console.log('添加' + el);
    }
    else if (index >= 0) {
      this.selectedRules.splice(index, 1);
      console.log('删除' + el);
    }
  }
  oppenLimitingAttrModal(){
    const activeModal = this.modalService.open(limitingattrComponent,{size: 'lg', backdrop: 'static'})
    activeModal.componentInstance.modalHeader = '指定商品属性之内';
    activeModal.componentInstance.selectedAttrs = this.limitingAttr;
    activeModal.result.then(result => {
      if (result != undefined) {
        this.limitingAttr = result;
      }
    },reject=>{})
  }
  oppenOutrangeAttrModal(){
    const activeModal = this.modalService.open(limitingattrComponent,{size: 'lg', backdrop: 'static'})
    activeModal.componentInstance.modalHeader = '指定商品属性之外';
    activeModal.componentInstance.selectedAttrs = this.outrangeAttr;
    activeModal.result.then(result => {
      if (result != undefined) {
        this.outrangeAttr = result;
      }
    },reject=>{})
  }
  oppenAppointmoneyModal() {
    const activeModal = this.modalService.open(AppointmoneyComponent,
      {size: 'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '指定订单金额范围';
    activeModal.componentInstance.limitingmoney = this.limitingmoney;
    console.log(this.limitingmoney);
    activeModal.result.then(result => {
      if (result != undefined) {
        this.limitingmoney = result;
      }
    },reject=>{});
  }

  oppenAppoincommodityModal() {
    const activeModal = this.modalService.open(AppoincommodityComponent,
      {size: 'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '指定商品';
    activeModal.componentInstance.limitingcommodity=[];
    for(var i=0;i<this.limitingcommodity.length;i++){
      let tempData=<any>{};
      tempData=this.limitingcommodity[i];
      activeModal.componentInstance.limitingcommodity.push(tempData);
    }
    activeModal.componentInstance.commodityList = [];
    activeModal.result.then(result => {
      if (result != undefined) {
        result=result.sort(function (a,b) {
          return a.length-b.length;
        });
        this.limitingcommodity = result;
      }
    },reject=>{})
  }

  oppenLimitingcountryModal() {
    this._storageRulesService.getAllCountries().subscribe(data => {
      let country = [];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.code;
        item.text = `${c.chineseName}(${c.code})`;
        country.push(item);
      }
      const activeModal = this.modalService.open(LimitingcountryComponent,
        {size: 'lg', backdrop: 'static'});
      activeModal.componentInstance.modalHeader = '指定国家';
      activeModal.componentInstance.country = country;
      activeModal.componentInstance.limitingcountry = [];
      for(var i=0;i<this.limitingcountry.length;i++){
        let tempData=<any>{};
        tempData=this.limitingcountry[i];
        activeModal.componentInstance.limitingcountry.push(tempData);
      }
      activeModal.result.then(result => {
        if (result != undefined) {
          result=result.sort(function (a,b) {
            return a.length-b.length;
          });
          this.limitingcountry = result;
        }
      },reject=>{})
    });
  }

  oppenOutrangecountryModal() {
    this._storageRulesService.getAllCountries().subscribe(data => {
      let country = [];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.code;
        item.text = `${c.chineseName}(${c.code})`;
        country.push(item);
      }
      const activeModal = this.modalService.open(OutrangecountryComponent,
        {size: 'lg', backdrop: 'static'});
      activeModal.componentInstance.modalHeader = '指定国家之外';
      activeModal.componentInstance.country = country;
      activeModal.componentInstance.outrangecountry =[];
      for(var i=0;i<this.outrangecountry.length;i++){
        let tempData=<any>{};
        tempData=this.outrangecountry[i];
        activeModal.componentInstance.outrangecountry.push(tempData);
      }
      activeModal.result.then(result => {
        if (result != undefined) {
          result=result.sort(function (a,b) {
            return a.length-b.length;
          });
          this.outrangecountry = result;
        }
      },reject=>{})
    });
  }

  oppenLimitingaccountModal() {
    const activeModal = this.modalService.open(LimitingaccountComponent,
      {size: 'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '指定平台帐号';
    activeModal.componentInstance.limitingaccount = [];
    for(var i=0;i<this.limitingaccount.length;i++){
      let tempData=<any>{};
      tempData=this.limitingaccount[i];
      activeModal.componentInstance.limitingaccount.push(tempData);
    }
    activeModal.result.then(result => {
      if (result != undefined) {
        result=result.sort(function (a,b) {
          return a.length-b.length;
        });
        this.limitingaccount = result;
      }
    },reject=>{})
  }
  oppenLimitingPlatformModal() {
    const activeModal = this.modalService.open(LimitingPlatformComponent,
      {size: 'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '指定平台';
    activeModal.componentInstance.seletedPlatform = this.seletedPlatform;
    activeModal.result.then(result => {
      if(result!=null && result.length > 0){
        this.seletedPlatform = result;
      };
    },reject=>{})
  }
  oppenLimitinglogisticsModal() {
    const activeModal = this.modalService.open(LimitinglogisticsComponent,
      {size: 'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '指定物流方式';
    activeModal.componentInstance.limitinglogistics = [];
    for(var i=0;i<this.limitinglogistics.length;i++){
      let tempData=<any>{};
      tempData=this.limitinglogistics[i];
      activeModal.componentInstance.limitinglogistics.push(tempData);
    }
    activeModal.result.then(result => {
      if (result != undefined) {
        result=result.sort(function (a,b) {
          return a.length-b.length;
        });
        this.limitinglogistics = result;
      }
    },reject=>{})
  }
}
