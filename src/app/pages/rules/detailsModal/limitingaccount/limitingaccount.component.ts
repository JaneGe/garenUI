import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OptionsService} from "../../options.Service";
import {RootComponent} from "../../../../shared/component/root.component";

@Component({
  selector: 'app-limitingaccount',
  templateUrl: './limitingaccount.component.html',
  styleUrls: ['./limitingaccount.component.scss','../../public.scss']
})
export class LimitingaccountComponent extends RootComponent implements OnInit {
  Platforms:Array<any>=[];
  limitingaccount:Array<{id:string,name:string}>=[];
  accountList:Array<any>=[];
  accountSource:Array<any>=[];
  selectedPlatform:string='';
  accountValue:string='';
  isFristChoose:boolean=false;
  result:{id:string,name:string}={id:'',name:''};
  modalHeader:any='';
  Countrys=['全部','US','GB','IT','DE','FR','ES','JP'];
  selectedCountry: string='全部';

  constructor(private activeModal:NgbActiveModal,
              private _optionsService:OptionsService) {
    super();
    this.Platforms=this._optionsService.Platforms;
  }
  ngOnInit() {
    // var node=document.getElementById('select').children[0].children[0];
    // $(node)[0].focus();
    // console.log($('ng2-completer'));
    this.selectedPlatform='Amazon';
    this.selectedCountry='全部';
    this.loadAccounts(this.selectedCountry);
  }
  closeModal() {
    this.activeModal.close();
  }
  OnSubmit(){
    this.activeModal.close(this.limitingaccount);
  }
  addClass(target:any,types:string,value?:any){
    switch (types){
      case 'platform':{
        var selectedaccount=target.innerText;
        this.toggleSingleClass(target);
        if(selectedaccount=='ebay'){this.selectedPlatform='ebay';}
        if(selectedaccount=='Amazon'){this.selectedPlatform='Amazon';}
        if(selectedaccount=='速卖通'){this.selectedPlatform='速卖通';}
        if(selectedaccount=='Wish'){this.selectedPlatform='Wish';}
        if(selectedaccount=='Lazada'){this.selectedPlatform='Lazada';}
        if(selectedaccount=='Cdiscount'){this.selectedPlatform='Cdiscount';}
        if(selectedaccount=='PrinceMinister'){this.selectedPlatform='PrinceMinister';}
        if(selectedaccount=='手工订单'){this.selectedPlatform='Manual';}
        if(selectedaccount=='Shopee'){this.selectedPlatform='Shopee';}
        this.loadAccounts(this.selectedCountry);
      }
      break;
      case 'countrys':{
        if(target.tagName=='SPAN') {
         // let selectedCountry=value;
          this.toggleSingleClass(target);
          this.selectedCountry = value;
          this.loadAccounts(this.selectedCountry);
          // if (selectedaccount == 'GB') {
          //   this.selectedPlatform = 'GB';
          // }
          // if (selectedaccount == 'IT') {
          //   this.selectedPlatform = 'IT';
          // }
          // if (selectedaccount == 'DE') {
          //   this.selectedPlatform = 'DE';
          // }
          // if (selectedaccount == 'FR') {
          //   this.selectedPlatform = 'FR';
          // }
          // if (selectedaccount == 'ES') {
          //   this.selectedPlatform = 'ES';
          // }
          // if (selectedaccount == 'US') {
          //   this.selectedPlatform = 'US';
          // }
          // if (selectedaccount == 'JP') {
          //   this.selectedPlatform = 'JP';
          // }
        }
      }
      break;
    }


    }

    loadAccounts(siteCode:string){
      this.accountList=[];
      this._optionsService.GetChannelAccountsByCountry(this.selectedPlatform,siteCode).subscribe(data => {
        this.accountList=[];
        this.accountSource=data.content;
        for(var i=0;i<data.content.length;i++){
          this.accountList.push(data.content[i].displayName);
        }
        this.accountList.unshift('全部');
        this.accountList.unshift('请选择..');
        this.isFristChoose=true;
      }, this.handleError);
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
    target.style.cssText=" background:#fff;color:#2389F2;";
  }
  selectAll:boolean=false;
  choose(selaccount:any){
    // console.log(selaccount);
    // if(this.isFristChoose){
    //   this.isFristChoose=false;
    //   selaccount.value='';
    //   return;
    // }
    let name=selaccount.value;
    let tempobj:{id:string,name:string}={id:'',name:''};
    if(name!='请选择'&&name!='全部'){
     // this.result.name=temp;
      const selectAccount=this.accountSource.find(f=>f.displayName==name);
      if(!selectAccount){
        return;
      }
      tempobj.name=selectAccount.displayName;
      tempobj.id=selectAccount.channelId;

      let exitAccounts=this.limitingaccount.filter(f=>f.name==name);

      if((exitAccounts.length==0)&&(this.accountList.indexOf(name)!=-1)) {
        this.limitingaccount.push(tempobj);
      }
    }
    if(name=='全部'){
      this.selectAll=true;
      this.limitingaccount=[];
      this.accountSource.forEach(value=>{
        this.limitingaccount.push({id:value.channelId,name:value.displayName});
      });
    }
  }
  del(item:any){
    console.log(item);
    for(var i=0;i<this.limitingaccount.length;i++){
      let obj=this.limitingaccount[i];
      if(obj.name==item.name){
        this.limitingaccount.splice(i,1);
      }
    }
  }
}
