import {Injectable} from "@angular/core";

@Injectable()
export class salesBack{
  $this=this;
  getorderNum=function () {
    var t='';
    for(var i=0;i<16;i++){
      var s=String.fromCharCode(parseInt((Math.random()*(122-97+1)+97).toFixed(0)));
      t+=s;
    }
    return t;
  }
  getaccoutInfo=function () {
    var platForm=['eBay','Amazon','SMT','Wish','Cdiscount'];
    var p=platForm[parseInt((Math.random()*4).toFixed(0))];
    var accout='';
    for(var i=0;i<6;i++){
      var s=String.fromCharCode(parseInt((Math.random()*(122-97+1)+97).toFixed(0)));
      accout+=s;
    }
    var ai:AI=new AI();
    ai.platform=p;
    ai.accout=accout;
    return ai;
  }
  getbuyerInfo=function () {
    var country=['America','UK','Russia','Spain','Australia'];
    var c=country[(Math.random()*4).toFixed(0)];
    var name='';
    for(var i=0;i<6;i++){
      var s=String.fromCharCode(parseInt((Math.random()*(122-97+1)+97).toFixed(0)));
      name+=s;
    }
    var bi:BI=new BI();
    bi.country=c;
    bi.name=name;
    return bi;
  }
  getmoney=function () {
    return (Math.random()*1000).toFixed(0);
  }
  getTimes=function () {
    var deliverTime=new Date();
    var saleReturnTime=new Date();
    var t=parseInt((Math.random()*5).toFixed(0));
    saleReturnTime.setDate(saleReturnTime.getDate()+t);
    var times:TS=new TS();
    times.deliverTime=deliverTime.toLocaleString().toString();
    times.saleReturnTime=saleReturnTime.toLocaleString().toString();
    return times;
  }
  getlogistics=function () {
    var logistics=['顺风','京东','亚马逊','邮政','韵达'];
    var Lo=logistics[parseInt((Math.random()*4).toFixed(0))];
    return Lo;
  }
  getreason=function () {
    var logistics=['邮局退包','买家退包'];
    var t=Number(Math.random().toFixed(1));
    if(t>0.5){var lo=logistics[0];return lo;}else {var lo=logistics[1];return lo;}
  }
  gethandleStatus=function () {
    var handleStatus=['待处理','已退款','已重发','已完成'];
    var Hs=handleStatus[parseInt((Math.random()*3).toFixed(0))];
    return Hs;
  };

  getsku=function () {
    var skus=function () {
      var sku='';
      for(var i=0;i<4;i++){
        var s=String.fromCharCode(parseInt((Math.random()*(90-65+1)+65).toFixed(0)));
        sku+=s;
      }
      return sku;
    };
    var SKUS:string[]=[];
    for(var i=0;i<6;i++){
      var ss=skus();
      SKUS.push(ss);
    }
    return SKUS;
  };
  getPic=function () {
   var pic=['http://p6.qhmsg.com/t01f19a83edd601f295.jpg',
     'http://img3.100bt.com/upload/ttq/20121202/1354443812118.png',
     'http://wenwen.soso.com/p/20090516/20090516064335-462569542.jpg',
     'http://p6.qhmsg.com/t01f19a83edd601f295.jpg',
     'http://img3.100bt.com/upload/ttq/20121202/1354443812118.png',]
    return pic;
  };
  getNum=function () {
    var Num=[1,2,3,4,5];
    return Num;
  };
  getChineseName(){
    var ChineseName=['锤子','剪刀','石头','布','叉子'];
    return ChineseName;
  }
  getSkuID=function () {
    var skuID=[1,2,3,4,5];
    return skuID;
  }
  GetSalesBack=function ($this) {
    let sb:Sback=new Sback();
    sb.orderNum=$this.getorderNum();
    sb.accoutInfo=$this.getaccoutInfo();
    sb.buyerInfo=$this.getbuyerInfo();
    sb.money=$this.getmoney();
    sb.times=$this.getTimes();
    sb.logistics=$this.getlogistics();
    sb.reason=$this.getreason();
    sb.handleStatus=$this.gethandleStatus();

    sb.pic=$this.getPic();
    sb.sku=$this.getsku();
    sb.Num=$this.getNum();
    sb.ChineseName=$this.getChineseName();
    sb.skuID=$this.getSkuID();
    return sb;
  };
  salesBack=[
    {SalesBack:this.GetSalesBack(this)},
    {SalesBack:this.GetSalesBack(this)},
    {SalesBack:this.GetSalesBack(this)},
    {SalesBack:this.GetSalesBack(this)},
    {SalesBack:this.GetSalesBack(this)},
    {SalesBack:this.GetSalesBack(this)},
    {SalesBack:this.GetSalesBack(this)},
    {SalesBack:this.GetSalesBack(this)},
    {SalesBack:this.GetSalesBack(this)},
    {SalesBack:this.GetSalesBack(this)},
    {SalesBack:this.GetSalesBack(this)},
    {SalesBack:this.GetSalesBack(this)},
  ];
}
export class Sback{
  orderNum:string;
  accoutInfo:AI;
  buyerInfo:BI;
  money:string;
  times:TS;
  logistics:string;
  reason:string;
  handleStatus:string;

  pic:string[];
  sku:string[];
  Num:number[];
  ChineseName:string[];
  skuID:number[];
}
export class AI{
  platform:string;
  accout:string;
}
export  class BI{
  country:string;
  name:string;
}
export class TS{
  deliverTime:string;
  saleReturnTime:string;
}
