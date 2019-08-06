import {Component, OnInit} from '@angular/core';
import {OrderRulesService} from "../order-rules/orderRules.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RootComponent} from "../../../shared/component/root.component";
import {AddstorageComponent} from "./addstorage/addstorage.component";
import {Subject} from "rxjs/Subject";
import {isInteger, isString} from "@ng-bootstrap/ng-bootstrap/util/util";
import {StorageRulesService} from "./StorageRules.service";
import {OptionsService} from "../options.Service";
import {AuthorityComponent} from "../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-storage-rules',
  templateUrl: './storage-rules.component.html',
  styleUrls: ['./storage-rules.component.scss', '../public.scss']
})
export class StorageRulesComponent extends AuthorityComponent implements OnInit {
  storageRulesData: Array<any>;
  storageData: Array<any>;
  name: string;
  ifModify: boolean;
  limitingmoney: { currency: string, min: number, max: number };
  limitingcommodity: Array<any>;
  limitingcountry: string[] = [];
  limitingaccount: Array<{ id: string, name: string }>;
  limitinglogistics: Array<{ platform: string, stations: string, logistics: string }>;
  allorders: boolean;
  outrangecountry: string[] = [];
  selectKind: string = 'all';
  selectedRules: string[] = [];
  preValue: number = 0;
  big: number = 0;
  storage: string;

  constructor(private _storageRulesService: StorageRulesService,
              private _optionsService: OptionsService,
              private modalService: NgbModal,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.storageRulesData = _storageRulesService.storageRulesData;
    this.storageData = _optionsService.storageData;
  }

  ngOnInit() {
    this.getbig(0);
  }

  getPreValue(target: any) {
    this.preValue = target.value;
  }
  doEditPriority(target){
    $(target).parents('.show-wrap').toggle();
    $(target).parents('.show-wrap').next().toggle();
    $(target).parents('.show-wrap').next().children('input')[0].focus();
    $(target).parents('.show-wrap').next().children('input').val('');
  }
  cancelEdit(target){
    $(target).parents('.edit-wrap').toggle();
    $(target).parents('.edit-wrap').siblings('.show-wrap').toggle();
  }
  getbig(ruleStatus: number) {
    this._storageRulesService.GetWarehouseRules(ruleStatus).subscribe(data => {
      this.storageRulesData = data.content;
      console.log(this.storageRulesData);
      let big = 1;
      for (let j = 0; j < this.storageRulesData.length; j++) {
        if (this.storageRulesData[j].priority > big) {
          big = this.storageRulesData[j].priority;
        }
      }
      this.big = big;
    }, this.handleError);
  }

  changePriority(target:any,id:number){
    var value=Number(target.value);
    if(target.value<=0||isNaN(value)||!isInteger(value)){
      this.error("优先级不符合规则！");
      return;
    }
    if(value>this.big){
      value=this.big;
    }
    this._storageRulesService.UpdateRuleWarehousePriority(value,id).subscribe(data => {
      this.getbig(0);
    });
  }

  modifyRule(name: string, id: number,warehouseId,any) {    //判断是否点击的是修改按钮
    this.ifModify = true;
    this.selectedRules = [];
    // console.log('初始化');
    // console.log(this.storageRulesData);
    for (var i = 0; i < this.storageRulesData.length; i++) {    //根据id取得点击那一列的所有数据,用来初始化下一个弹窗
      var obj = this.storageRulesData[i];
      if (obj.id == id) {
        for (var j in obj) {  //初始化已选的标签
          this.selectedRules.push(j);
        }
        //初始化按钮里的值
        if (obj.storage != undefined) {
          this.storage = obj.storage;
        }
        else {
          this.storage = ''
        }
        if (obj.limitingmoney != undefined) {
          this.limitingmoney = obj.limitingmoney;
        }
        else {
          this.limitingmoney = {currency: '', min: null, max: null};
        }
        // console.log(this.limitingmoney);
        if (obj.limitingcommodity != undefined) {
          this.limitingcommodity = obj.limitingcommodity;
        }
        else {
          this.limitingcommodity = [];
        }
        // console.log(this.limitingcommodity);
        if (obj.limitingcountry != undefined) {
          this.limitingcountry = obj.limitingcountry;
        }
        else {
          this.limitingcountry = [];
        }
        // console.log(this.limitingcountry);
        if (obj.limitingaccount != undefined) {
          this.limitingaccount = obj.limitingaccount;
        }
        else {
          this.limitingaccount = [];
        }


        if (obj.limitinglogistics != undefined) {
          this.limitinglogistics = obj.limitinglogistics;
        }
        else {
          this.limitinglogistics = [{platform: '', stations: '', logistics: ''}];
        }
        // console.log(this.limitinglogistics);
        if (obj.outrangecountry != undefined) {
          this.outrangecountry = obj.outrangecountry;
        }
        else {
          this.outrangecountry = [];
        }
        // console.log(this.outrangecountry);
        if (obj.allorders != undefined) {
          this.allorders = obj.allorders;
        }
        else {
          this.allorders = false;
        }
        // console.log(this.outrangecountry);
      }
    }
    const activeModal = this.modalService.open(AddstorageComponent,
      {size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '修改仓库自动分配规则';
    // activeModal.componentInstance.selectedRules = this.selectedRules;
    activeModal.componentInstance.name = name;
    activeModal.componentInstance.id = id;
    activeModal.componentInstance.warehouseId = warehouseId;

    activeModal.componentInstance.storageRulesData = this.storageRulesData;
    activeModal.componentInstance.limitingmoney = this.limitingmoney;
    activeModal.componentInstance.limitingcommodity = this.limitingcommodity;
    activeModal.componentInstance.limitingcountry = this.limitingcountry;
    activeModal.componentInstance.limitingaccount = this.limitingaccount;
    activeModal.componentInstance.limitinglogistics = this.limitinglogistics;
    activeModal.componentInstance.allorders = this.allorders;
    activeModal.componentInstance.outrangecountry = this.outrangecountry;
    activeModal.componentInstance.ifModify = this.ifModify;

    activeModal.result.then(result => {
      if (result != undefined) {
        this.getbig(0);
      }
    },reject=>{});
}

  openAddRulesModal() {
    this.ifModify = false;
    const activeModal = this.modalService.open(AddstorageComponent,
      {size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '编辑仓库自动分配规则';
    activeModal.componentInstance.ifModify = this.ifModify;
    activeModal.componentInstance.selectedRules = [];
    activeModal.componentInstance.storage = '';
    activeModal.componentInstance.limitingmoney = {currency: '', min: null, max: null};
    activeModal.componentInstance.limitingcommodity = [];
    activeModal.componentInstance.limitingcountry = [];
    activeModal.componentInstance.limitingaccount = [];
    activeModal.componentInstance.limitinglogistics = [{platform: '', stations: '', logistics: ''}];
    activeModal.componentInstance.allorders = false;
    activeModal.componentInstance.storageRulesData = this.storageRulesData;
    activeModal.componentInstance.outrangecountry = [];
    activeModal.result.then(result => {
      if (result != undefined) {
        this.getbig(0);
      }
    },reject=>{});
  }

  setStatusDisable(editName: string, Id: number) {

    this.confirm("确定停用该规则", () => {
      this.storageRulesData.forEach(function (item) {
        if (item.name == editName) {
          item.status = '已停用';
        }
      });
      this._storageRulesService.SetOrderRulesStatus(Id, false).subscribe(data => {

      });
    })
  }

  setStatusOnable(editName: string, Id: number) {
    this.confirm("确定启用该规则", () => {
      this.storageRulesData.forEach(function (item) {
        if (item.name == editName) {
          item.status = '已启用';
        }
      });
      this._storageRulesService.SetOrderRulesStatus(Id, true).subscribe(data => {

      });
    })
  }

  deleteRule(name: string, Id: number) {
    this.confirm("确定删除该规则", () => {
      this._storageRulesService.DeleteOrderRules(Id).subscribe(data => {
        this.getbig(0);
      });
    });

  }

  addClass1(target: any) {
    this.toggleSingleClass(target);
    var selectKindName = target.innerText;
    if (selectKindName == '全部') {
      this.selectKind = 'all';
      this.getbig(0);
    }
    if (selectKindName == '已启用') {
      this.selectKind = 'on';
      this.getbig(1);
    }
    if (selectKindName == '已停用') {
      this.selectKind = 'off';
      this.getbig(2);
    }
  }

  siblings(el: any) {
    var a = [];
    var b = el.parentNode.children;
    for (var i = 0; i < b.length; i++) {
      if (b[i] !== el) a.push(b[i]);
    }
    return a;
  }

  toggleSingleClass(target: any) {
    var a = this.siblings(target);
    for (var i = 0; i < a.length; i++) {
      a[i].style.cssText = "background:none;color:white";
    }
    target.style.cssText = "background:#fff;color:#2389F2;";
  }
}
