import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {PurchaseSkuOrderService} from "../../../../../shared/services/purchaseSkuOrder-service";
import {AuthorityComponent} from "../../../../../shared/component/authority.component";
import {RootComponent} from "../../../../../shared/component/root.component";
import {isInteger} from "@ng-bootstrap/ng-bootstrap/util/util";
import {isNumeric} from "rxjs/util/isNumeric";

@Component({
  selector: 'app-edit-other-order-info',
  templateUrl: './edit-other-order-info.component.html',
  styleUrls: ['./edit-other-order-info.component.scss'],
  providers: [PurchaseSkuOrderService]
})
export class EditOtherOrderInfoComponent extends RootComponent implements OnInit {
  public options: Select2Options;
  public value: any[];
  public current: string;
  public skuCode:any;
  public skuId:any;
  public purchaseSkuOrderId:any;
  public selectAccount:any;
  public selectAttrs:any;
  public purchaseUrlLines:any;
  public otherOrderNumber:any;
  public skuPrice:number;
  public orderCount:number;
  public  shippingFee:number;
  public disCount:number;
  public totalPrice:any;
  public Id:number;

  accountItems = [];
  constructor(private _modal: NgbActiveModal,protected purchaseSkuOrderService: PurchaseSkuOrderService) {
    super();
  }

  ngOnInit() {
  this.loadAccountList();
  this.onLoad();
  }

  loadAccountList(){
    this.purchaseSkuOrderService.GetAccountList().subscribe(data => {
      let accounts = [];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.id;
        item.text = c.accountName;
        accounts.push(item);
      }
      if(accounts.length>0){
        this.selectAccount = accounts[0].id;
      }
      this.accountItems = accounts;
    }, this.handleError);
  }

  CaleForTotalPrice(){
    if(isNumeric(this.skuPrice)&&isNumeric(this.orderCount)&&isNumeric(this.disCount)&&isNumeric(this.shippingFee)){
      this.totalPrice=(((this.skuPrice*this.orderCount)*100+this.shippingFee*100-this.disCount*100)/100).toFixed(2);
    }else{
      this.totalPrice='';
    }
  }

  closeModal() {
    this._modal.close();
  }

  onChanged(data: { value: any }) {
    this.selectAccount=data.value;
  }

  onSave() {

  if(!(this.totalPrice&&isNumeric(this.totalPrice))){
    this.error("请将金额信息添加完善!");
    return;
  }

  if(this.totalPrice<0){
    this.error("总金额不能为负数!");
    return;
  }
  var params={
    Id:this.Id,
    SkuId:this.skuId,
    SkuCode:this.skuCode,
    PurchaseSkuOrderId:this.purchaseSkuOrderId,
    amQuantityRratio:1,
    quantityRratioOther:1,
    purchaseAccountId:this.selectAccount,
    otherOrderNumber:this.otherOrderNumber,
    skuPrice:this.skuPrice,
    orderCount:this.orderCount,
    shippingFee:this.shippingFee,
    discount:this.disCount,
    totalPrice:this.totalPrice
  };
    this.purchaseSkuOrderService.PurchaseSkuSave(params).subscribe(data => {
      this.alertMessage("保存成功!");
      this.closeModal();
    }, this.handleError);
  }

  onLoad(){

    this.purchaseSkuOrderService.GetOtherPendPurchaseOrder(this.purchaseSkuOrderId).subscribe(data => {
      const otherSkuOrder = data.content;
      if(otherSkuOrder) {
        this.Id = otherSkuOrder.id;
        this.skuId = otherSkuOrder.skuId,
          this.skuCode = otherSkuOrder.skuCode,
          this.purchaseSkuOrderId = otherSkuOrder.purchaseSkuOrderId,
          this.selectAccount = otherSkuOrder.purchaseAccountId,
          this.otherOrderNumber = otherSkuOrder.otherOrderNumber;
        this.skuPrice = otherSkuOrder.skuPrice;
        this.orderCount = otherSkuOrder.orderCount;
        this.shippingFee = otherSkuOrder.shippingFee;
        this.disCount = otherSkuOrder.discount;
        this.totalPrice = otherSkuOrder.totalPrice;
      }
    }, this.handleError);
  }

  Enter(val:any){
    var value = Number(val);
    if (isNaN(value) || !isInteger(value)) {
      this.orderCount = 0;
    }
    this.CaleForTotalPrice();
  }
}
