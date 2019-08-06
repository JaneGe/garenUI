import { Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddSupplierComponent} from "../../modals/add-supplier/add-supplier.component";
import {RootComponent} from "../../../../../shared/component/root.component";

@Component({
  selector: 'sku-supply-info',
  templateUrl: './sku-supplier-info.component.html',
  styleUrls: ['../../public.scss','./sku-supplier-info.component.scss']
})
export class SkuSupplierInfoComponent extends RootComponent implements OnInit {
  pageSize:number=5;
  totalCount:number=1;
  pageIndex:number=1;
  status:Array<any>=['全部','无供应商','有供应商'];
  selectedstatu='全部';
  searchKind:Array<any>=['SKU','商品名',];
  selectedsearchKind='SKU';
  selectedThisPage:boolean=false;
  selectedSigleid:Array<any>=[];//勾选skuid
  SKUSupplyInfo=[
    {skuCode:'dsf4654',skuName:'哈哈',id:1,averagePrice:100,img:'http://p6.qhmsg.com/t01f19a83edd601f295.jpg',
      supplierInfo:[
        {supplierName:'test1',price:100,minPurchase:10,getday:7,upDateTime:'2017-10-30 12:25:10',id:1},
        {supplierName:'test2',price:200,minPurchase:20,getday:8,upDateTime:'2017-10-30 12:25:10',id:2},
        {supplierName:'test3',price:300,minPurchase:30,getday:9,upDateTime:'2017-10-30 12:25:10',id:3},
      ],
      firstSupplierId:1,
    },
    {skuCode:'dfg78432',skuName:'呵呵',id:2,averagePrice:50,img:'http://p6.qhmsg.com/t01f19a83edd601f295.jpg',
      supplierInfo:[{supplierName:'test1',price:100,minPurchase:10,getday:7,upDateTime:'2017-10-30 12:25:10',id:1}],
      firstSupplierId:1,
    },
    {skuCode:'gtyhjs8432',skuName:'嘿嘿',id:3,averagePrice:50,img:'http://p6.qhmsg.com/t01f19a83edd601f295.jpg',
      supplierInfo:[],
      firstSupplierId:null,
    },
  ];
  constructor(private ModalService: NgbModal,) {super();}

  ngOnInit() {
    this.loadData();
  }
  pageChanged(pn:any){
    this.loadData(pn)
  }
  topage(page:any){
    this.loadData(page);
  }
  loadData(pageIndex:number=1){
    this.pageIndex=pageIndex;
    this.totalCount=this.SKUSupplyInfo.length;
  }
  tolast(){
    var lastPage;
    if(this.totalCount%this.pageSize==0){lastPage=this.totalCount/this.pageSize}
    else {lastPage=this.totalCount/this.pageSize+1}
    this.loadData(lastPage);
  }
  selectStatu(val:any){
    this.selectedstatu=val;
  }
  selectsearchKind(val:any){
    this.selectedsearchKind=val;
  }
  SelectedThisPage(){     //选择本页checkbox
    this.selectedThisPage=this.selected(this.selectedThisPage);
    if(this.selectedThisPage){
      var thisPageInfo=[];    //获取本页skuCode
      $('#table .item').each(function () {
        var tr=$(this);
        var tdInfo=tr.find('span').text();
        thisPageInfo.push(tdInfo);
      });
      var selectedThisPageid=[];
      this.SKUSupplyInfo.forEach((value)=>{
        thisPageInfo.forEach(value2 => {
          if(value2==value.skuCode){
            selectedThisPageid.push(value.id);
          }
        })
      });
      this.selectedSigleid=selectedThisPageid;
    }
    else{
      this.selectedSigleid=[];
    }
  }
  selectSigle(id:any){    //多选选择sku
    let index=this.selectedSigleid.indexOf(id);
    if(index!=-1){this.selectedSigleid.splice(index,1);this.selectedThisPage=false;}
    else{this.selectedSigleid.push(id)}
  }
  selectSiglefirstID(skuid:any,firstsupplier:any){    //单选选择供应商
    this.SKUSupplyInfo.find(value => value.id==skuid).firstSupplierId=firstsupplier;
  }
  selected(select:boolean){
    if(select==false){select=true;}
    else{select=false}
    return select;
  }

  slidedownAll:boolean=true;
  toggleTalbe(id:any){
    var table=$(`#table${id}`);
    var check=$(table).attr('style');
    if(check==undefined){$(table).slideDown();this.slidedownAll=false;}
    else{
      if(check.includes('block')){$(table).slideUp();}
      else if(check.includes('none')){$(table).slideDown();this.slidedownAll=false;}
    }
  }
  toggleAllTalbe(open:any){
    if(open){
      this.SKUSupplyInfo.forEach(value => {
        $(`#table${value.id}`).slideDown();this.slidedownAll=false;
      });
    }
    else{
      this.SKUSupplyInfo.forEach(value => {
        $(`#table${value.id}`).slideUp();this.slidedownAll=true;
      });
    }
  }
  editstatu:boolean=false;
  editSupplier(skuId:any){
    var sku= this.SKUSupplyInfo.find(value => skuId==value.id).supplierInfo;
    for(let item of sku){
      this.price=item.price;
      this.minPurchase=item.minPurchase;
      this.getday=item.getday;
    }
    this.editstatu=true;
  }
  getEditChange(value:any,value2){
    if(value2=='price')this.price=value;
    if(value2=='minPurchase')this.minPurchase=value;
    if(value2=='getday')this.getday=value;
  }
  del(skuId:any,supplierId:any){
   this.SKUSupplyInfo.find(value => skuId==value.id).supplierInfo.forEach(
     function (value2,index,array) {
       if(value2.id==supplierId){
         array.splice(index,1);
       }
     }
   )
  }
  cancle(){
    this.editstatu=false;
  }
  price:any;minPurchase:any;getday:any;
  save(skuId:any,supplierId:any){
   for(let sku of this.SKUSupplyInfo){
     if(sku.id==skuId){
       sku.supplierInfo.forEach(value2=> {
         if(value2.id==supplierId){
           if(value2.price!=this.price)value2.price=this.price;
           if(value2.minPurchase!=this.minPurchase)value2.minPurchase=this.minPurchase;
           if(value2.getday!=this.getday)value2.getday=this.getday;
         }
       });
       break;
     }
   }
    this.editstatu=false;
    this.loadData();
  }
  addSupplierModal() {
    if(this.selectedSigleid.length==0){
      this.error('请先勾选SKU');
    }
    else {
      const activeModal = this.ModalService.open(AddSupplierComponent, {size: 'lg'});
      activeModal.componentInstance.modalHeader = "添加供应商";
      activeModal.result.then(result => {
        if (result != undefined) {
          this.SKUSupplyInfo.forEach(value => {
            if(this.selectedSigleid.indexOf(value.id)!=-1){  //选择勾选的sku
              // value.supplierInfo
              var exist=false;
              value.supplierInfo.forEach(value1=>{
                if(value1.id==result.id){
                  exist=true;
                }
              });
              console.log(`skuid:${value.id}  exist:${exist}`);
              if(!exist){value.supplierInfo.push(result);console.log('add')}
            }
          });
          this.loadData();
        }
      });
    }
  }
}

