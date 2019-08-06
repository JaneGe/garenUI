import {Component, OnInit} from '@angular/core';
import {RootComponent} from "../../../shared/component/root.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddlogisticsComponent} from "./addlogistics/addlogistics.component";
import {isInteger} from "@ng-bootstrap/ng-bootstrap/util/util";
import {LogisticsRulesService} from "./LogisticsRules.service";
import {OptionsService} from "../options.Service";
import {AuthorityComponent} from "../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-logistics-rules',
  templateUrl: './logistics-rules.component.html',
  styleUrls: ['./logistics-rules.component.scss', '../public.scss'],
  providers: [LogisticsRulesService]
})
export class LogisticsRulesComponent extends AuthorityComponent implements OnInit {
  logiticsRulesData: Array<any>;
  storageData: Array<any>;
  sortStorageData: any[] = [];
  MatchLogisticses: Array<any>;
  storage: string;
  ifModify: boolean;
  matchLogistics: string;
  weightrange: { min: number, max: number };
  limitingmoney: { currency: string, min: number, max: number };
  limitingcommodity: Array<any>;
  limitingcountry: string[] = [];
  limitingaccount: Array<{ id: string, name: string }> ;
  limitinglogistics: Array<{ platform: string, stations: string, logistics: string }>;
  allorders: boolean;
  outrangecountry: string[] = [];
  selectKind: string = 'all';
  selectedRules: string[] = [];
  preValue: number = 0;
  big: number = 0;

  constructor(private _logisticsRulesService: LogisticsRulesService,
              private _optionsService: OptionsService,
              private modalService: NgbModal,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
    this.logiticsRulesData = _logisticsRulesService.LogisticsRulesData;
    this.storageData = _optionsService.storageData;
    this.MatchLogisticses = _optionsService.MatchLogisticses;
  }

  ngOnInit() {
    this.getbig(0);
   //  var temp: string[] = [];
   // for (let i: number = 0; i < this.logiticsRulesData.length; i++) {
   //   temp.push(this.logiticsRulesData[i].storage);
   //   this.sortStorageData = this.noRepeat(temp);
   //  }
  }

  noRepeat(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i].id) == -1) {
        result.push(arr[i])
      }
    }
    return result;
  }

  getPreValue(target: any) {
    this.preValue = target.value;
  }

  getbig(ruleStatus: number) {
    this._logisticsRulesService.GetLogisticsRules(ruleStatus).subscribe(data => {
      this.logiticsRulesData= data.content;
      //console.log(this.logiticsRulesData);
      let big=1;
      for(let j=0;j<this.logiticsRulesData.length;j++){
        if(this.logiticsRulesData[j].priority>big){
          big=this.logiticsRulesData[j].priority;
        }
      }
      this.big=big;
    }, this.handleError);

    this._logisticsRulesService.GetWareHouseIdByRuleType().subscribe(data => {
     // this.sortStorageData= data.content.result;
      //仓库分组数组
      this.sortStorageData= data.content;
      //console.log(this.sortStorageData)
    }, this.handleError);
  }

  isNumber(e: any) {
    var char_code = e.charCode ? e.charCode : e.keyCode;
    if (char_code < 48 || char_code > 57) {
      this.error("只允许输入数字");
      return false;
    }
    else {
      return true;
    }
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
  changePriority(target:any,id:number){
    var reg = /^[1-9]\d*$/;
    var value=target.value;
    if(reg.test(value)){
      value=value>this.big?this.big:value;
      console.log(value);
      // console.log(this.big);
      this._logisticsRulesService.UpdateRuleLogPriority(value,id).subscribe(data => {
        this.getbig(0);
      });
      this.cancelEdit(target);
    }
    else{
      this.error("优先级不符合规则！");
    }

    // if(target.value<=0||isNaN(value)||!isInteger(value)){
    //   this.error("优先级不符合规则！");
    //   return;
    // }
    // if(value>this.big){
    //   value=this.big;
    // }
    // this._logisticsRulesService.UpdateRuleLogPriority(value,id).subscribe(data => {
    //   this.getbig(0);
    // });
  }


  changeWarehousePriority(target: any, id: number) {
    var value=Number(target.value);
    this._logisticsRulesService.ChangeOrderProtityByRuleId(id,value).subscribe(data => {
      this.getbig(0);
    },this.handleError);
  }




  deleteRule(name:string,Id:number) {
    this.confirm("确定删除该规则", () => {
      this._logisticsRulesService.DeleteOrderRules(Id).subscribe(data => {
          this.getbig(0);
      });
    });
  }

  modifyRule(name: string, id: number,wareHouseName:any,warehouseId:any) {
    this.ifModify=true;
    this.selectedRules=[];
    // console.log('初始化');
    // console.log(this.storageRulesData);
    for(var i=0;i<this.logiticsRulesData.length;i++){    //根据id取得点击那一列的所有数据,用来初始化下一个弹窗
      var obj=this.logiticsRulesData[i];
      if(obj.id==id){
        for(var j in obj){  //初始化已选的标签
          this.selectedRules.push(j);
        }
        //初始化按钮里的值
        if(obj.storage!=undefined){this.storage=obj.storage;}
        else{this.storage=''}
        if(obj.matchLogistics!=undefined){this.matchLogistics=obj.matchLogistics;}
        else{this.matchLogistics=''}
        if(obj.limitingmoney!=undefined){this.limitingmoney=obj.limitingmoney;}
        else{this.limitingmoney={currency:'',min:null,max:null};}
        // console.log(this.limitingmoney);
        if(obj.limitingcommodity!=undefined){this.limitingcommodity=obj.limitingcommodity;}
        else{this.limitingcommodity=[];}
        // console.log(this.limitingcommodity);
        if(obj.limitingcountry!=undefined){this.limitingcountry=obj.limitingcountry;}
        else{this.limitingcountry=[];}
        // console.log(this.limitingcountry);
        if(obj.limitingaccount!=undefined){this.limitingaccount=obj.limitingaccount;}
        else{this.limitingaccount=[];}
        // console.log(this.limitingaccount);
        if(obj.limitinglogistics!=undefined){this.limitinglogistics=obj.limitinglogistics;}
        else{this.limitinglogistics=[];}
        // console.log(this.limitinglogistics);
        if(obj.outrangecountry!=undefined){this.outrangecountry=obj.outrangecountry;}
        else{this.outrangecountry=[];}
        // console.log(this.outrangecountry);
        if(obj.allorders!=undefined){this.allorders=obj.allorders;}
        else{this.allorders=false;}
        if(obj.weightrange!=undefined){this.weightrange=obj.weightrange;}
        else{this.weightrange={min:null,max:null};}
        // console.log(this.outrangecountry);
      }
    }
    const activeModal = this.modalService.open(AddlogisticsComponent,
      {size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '修改物流审核规则';
    // activeModal.componentInstance.selectedRules =this.selectedRules;
    activeModal.componentInstance.name=name;
    activeModal.componentInstance.id=id;
    activeModal.componentInstance.wareHouseName=wareHouseName;
    activeModal.componentInstance.warehouseId= warehouseId;
    activeModal.componentInstance.storage=this.storage;
    activeModal.componentInstance.matchLogistics=this.matchLogistics;
    activeModal.componentInstance.logiticsRulesData=this.logiticsRulesData;
    activeModal.componentInstance.limitingmoney=this.limitingmoney;
    activeModal.componentInstance.limitingcommodity=this.limitingcommodity;
    activeModal.componentInstance.limitingcountry=this.limitingcountry;
    activeModal.componentInstance.limitingaccount=this.limitingaccount;
    activeModal.componentInstance.limitinglogistics=this.limitinglogistics;
    activeModal.componentInstance.allorders=this.allorders;
    activeModal.componentInstance.outrangecountry=this.outrangecountry;
    activeModal.componentInstance.ifModify=this.ifModify;
    activeModal.componentInstance.weightrange = this.weightrange;
    activeModal.result.then(result=>{
      if(result!=undefined){
        this.getbig(0);
      }
    },reject=>{});
  }

  openAddRulesModal() {
    this.ifModify = false;
    const activeModal = this.modalService.open(AddlogisticsComponent,
      {size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '编辑物流分配规则';
    activeModal.componentInstance.ifModify = this.ifModify;
    activeModal.componentInstance.selectedRules = [];
    activeModal.componentInstance.storage = '';
    activeModal.componentInstance.logiticsRulesData=this.logiticsRulesData;
    activeModal.componentInstance.limitingmoney = {currency: '', min: null, max: null};
    activeModal.componentInstance.limitingcommodity = [];
    activeModal.componentInstance.limitingcountry = [];
    activeModal.componentInstance.limitingaccount = [];
    activeModal.componentInstance.limitinglogistics = [{platform: '', stations: '', logistics: ''}];
    activeModal.componentInstance.allorders = false;
    activeModal.componentInstance.outrangecountry = [];
    activeModal.componentInstance.weightrange = {min: null, max: null};
    activeModal.componentInstance.matchLogistics = '';
    activeModal.result.then(result => {
      if (result != undefined) {
        console.log('获取返回数据');
        console.log(result);
        this.getbig(0);
      }
    },reject=>{});
  }

  setStatusDisable(editName:string, Id: number){

    this.confirm("确定停用该规则",()=>{
      this.logiticsRulesData.forEach(function(item){if(item.name==editName){
        item.status='已停用';
      }});
      this._logisticsRulesService.SetOrderRulesStatus(Id,false).subscribe(data => {

      });
    })
  }
  setStatusOnable(editName:string,Id:number){
    this.confirm("确定启用该规则",()=>{
      this.logiticsRulesData.forEach(function(item){if(item.name==editName){
        item.status='已启用';
      }});
      this._logisticsRulesService.SetOrderRulesStatus(Id,true).subscribe(data => {

      });
    })
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
