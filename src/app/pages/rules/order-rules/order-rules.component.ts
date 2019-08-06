import {Component, OnInit} from '@angular/core';
import {OrderRulesService} from "./orderRules.service";
import {RootComponent} from "../../../shared/component/root.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddrulesModalComponent} from "./addrules-modal/addrules-modal.component";
import {isInteger} from "@ng-bootstrap/ng-bootstrap/util/util";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../shared/component/authority.component";
@Component({
  selector: 'app-order-rules',
  templateUrl: './order-rules.component.html',
  styleUrls: ['./order-rules.component.scss','../public.scss'],
  providers:[OrderRulesService]
})
export class OrderRulesComponent extends AuthorityComponent implements OnInit {
  orderRulesData:any[];
  ifModify:boolean;
  hasrefund:boolean;
  hasretroactive:boolean;
  notmatchPaypal:boolean;
  noprovince:boolean;
  limitingmoney:{currency:string,min:number,max:number};
  limitingcommodity:Array<any>;
  limitingcountry:string[]=[];
  limitingaccount:Array<{id:string,name:string}>;
  outrangecountry:string[]=[];
  selectKind:string='all';
  selectedRules:string[]=[];
  preValue:number=0;
  big:number=0;
  constructor(private _orderRulesService: OrderRulesService,
              private modalService:NgbModal,public activerouter: ActivatedRoute,public  router:Router ) {
    super(activerouter,router);
   // this.orderRulesData=_orderRulesService.orderRulesData;
  }
  ngOnInit() {
    this.getbig(0);
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
  getPreValue(target:any){
    this.preValue=target.value;
  }
  getbig(ruleStatus: number){

    this._orderRulesService.GetOrderRules(ruleStatus).subscribe(data => {
      this.orderRulesData= data.content;
      let big=1;
      for(let j=0;j<this.orderRulesData.length;j++){
        if(this.orderRulesData[j].priority>big){
          big=this.orderRulesData[j].priority;
        }
      }
      this.big=big;
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
    this._orderRulesService.UpdateRuleOrderPriority(value,id).subscribe(data => {
      this.getbig(0);
    });
  }
  deleteRule(name:string,Id:number){
    this.confirm("确定删除该规则",()=>{
      this._orderRulesService.DeleteOrderRules(Id).subscribe(data => {
        this.getbig(0);
      });
    });

  }
  modifyRule(name:string,id:number){
    this.ifModify=true;
    this.selectedRules=[];
    for(var i=0;i<this.orderRulesData.length;i++){
      var obj=this.orderRulesData[i];
      if(obj.id==id){
        for(var j in obj){  //初始化已选的标签
          this.selectedRules.push(j);
        }
        //初始化按钮里的值
        if(obj.limitingmoney!=undefined){this.limitingmoney=obj.limitingmoney;}
        else{this.limitingmoney={currency:'',min:null,max:null};}
        if(obj.limitingcommodity!=undefined){this.limitingcommodity=obj.limitingcommodity;}
        else{this.limitingcommodity=[];}
        if(obj.limitingcountry!=undefined){this.limitingcountry=obj.limitingcountry;}
        else{this.limitingcountry=[];};
        if(obj.limitingaccount!=undefined){this.limitingaccount=obj.limitingaccount;}
        else{this.limitingaccount=[];}
        if(obj.outrangecountry!=undefined){this.outrangecountry=obj.outrangecountry;}
        else{this.outrangecountry=[];}
        if(obj.hasrefund!=undefined){this.hasrefund=obj.hasrefund;}
        else{this.hasrefund=true;}
        if(obj.hasretroactive!=undefined){this.hasretroactive=obj.hasretroactive;}
        else{this.hasretroactive=true;}
        if(obj.notmatchPaypal!=undefined){this.notmatchPaypal=obj.notmatchPaypal;}
        else{this.notmatchPaypal=true;}
        if(obj.noprovince!=undefined){this.noprovince=obj.noprovince;}
        else{this.noprovince=true;}
      }
    }
    const activeModal = this.modalService.open(AddrulesModalComponent,
      {size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '修改订单审核规则';
    // activeModal.componentInstance.selectedRules =this.selectedRules;
    activeModal.componentInstance.name=name;
    activeModal.componentInstance.id=id;
    activeModal.componentInstance.limitingmoney=this.limitingmoney;
    activeModal.componentInstance.limitingcommodity=this.limitingcommodity;
    activeModal.componentInstance.limitingcountry=this.limitingcountry;
    activeModal.componentInstance.limitingaccount=this.limitingaccount;
    activeModal.componentInstance.outrangecountry=this.outrangecountry;
    activeModal.componentInstance.hasrefund=this.hasrefund;
    activeModal.componentInstance.hasretroactive=this.hasretroactive;
    activeModal.componentInstance.notmatchPaypal=this.notmatchPaypal;
    activeModal.componentInstance.noprovince=this.noprovince;
    activeModal.componentInstance.ifModify=this.ifModify;
    activeModal.componentInstance.orderRulesData=this.orderRulesData;
    activeModal.result.then(result=>{
      if ( result === 1) {
        this.getbig(0);
      }
    },reject=>{});
  }
  openAddRulesModal(){
    this.ifModify=false;
    const activeModal = this.modalService.open(AddrulesModalComponent,
      {size: 'lg', windowClass: 'large-lmt-modal', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = '编辑订单审核规则';
    activeModal.componentInstance.ifModify=this.ifModify;
    activeModal.componentInstance.selectedRules =[];
    activeModal.componentInstance.limitingmoney={currency:'',min:null,max:null};
    activeModal.componentInstance.limitingcommodity=[];
    activeModal.componentInstance.limitingcountry=[];
    activeModal.componentInstance.limitingaccount=[];
    activeModal.componentInstance.outrangecountry=[];
    activeModal.componentInstance.hasrefund=true;
    activeModal.componentInstance.hasretroactive=true;
    activeModal.componentInstance.notmatchPaypal=true;
    activeModal.componentInstance.noprovince=true;
    activeModal.componentInstance.orderRulesData=this.orderRulesData;
    activeModal.result.then(result=>{
      if ( result === 1) {
        this.getbig(0);
      }
    },reject=>{});
  }
  setStatusDisable(editName:string, Id: number){
    this.confirm("确定停用该规则",()=>{
    this.orderRulesData.forEach(function(item){if(item.name==editName){
          item.status='已停用';
      }});
      this._orderRulesService.SetOrderRulesStatus(Id,false).subscribe(data => {

      });
    })
  }
  setStatusOnable(editName:string,Id:number){
    this.confirm("确定启用该规则",()=>{
      this.orderRulesData.forEach(function(item){if(item.name==editName){
        item.status='已启用';
      }});
    this._orderRulesService.SetOrderRulesStatus(Id,true).subscribe(data => {

    });
    })
  }

  addClass1(target:any){
    this.toggleSingleClass(target);
    var selectKindName=target.innerText;
    if(selectKindName=='全部'){this.selectKind='all'; this.getbig(0); }
    if(selectKindName=='已启用'){this.selectKind='on'; this.getbig(1);}
    if(selectKindName=='已停用'){this.selectKind='off';this.getbig(2);}
  }
  siblings(el:any){
    var a = [];
    var b = el.parentNode.children;
    for(var i=0;i<b.length;i++) {
      if(b[i] !== el) a.push(b[i]);
    }
    return a;
  }
  toggleSingleClass(target:any){
    var a=this.siblings(target);
    for(var i=0;i<a.length;i++){
      a[i].style.cssText="background:none;color:white";
    }
    target.style.cssText="background:#fff;color:#2389F2;";
  }
}
