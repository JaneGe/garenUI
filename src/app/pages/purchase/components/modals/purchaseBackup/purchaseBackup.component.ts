import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorityComponent } from "../../../../../shared/component/authority.component";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {SkuService} from "../../../../../shared/services/sku-service";
import {SkuSearchLiteModel} from "../../../../../shared/models/products/sku-search-lite-model";
import {Select2OptionData} from "ng2-select2";
import {AddPurchaseSkuModel} from "../../../../../shared/models/purchases/add-purchase-sku-model";
import {PurchaseService} from "../../purchase-pond/purchase-data.service";

@Component({
  selector: 'app-purchaseBackup',
  templateUrl: './purchaseBackup.component.html',
  styleUrls: ['../modal-public.scss', './purchaseBackup.component.scss'],
  providers: [SkuService,PurchaseService]
})

export class PurchaseBackupComponent extends AuthorityComponent implements OnInit {
  batchText:string = '';
  allSkus: SkuSearchLiteModel[] = [];
  batchResult:Array<any>=[];
  Data : AddPurchaseSkuModel[] = [];
  num: number = null;
  @Input()
  warehouseId: number;

  disPlaySkuFormatter = (x: Select2OptionData) => x.text;
  skuFormatter = (x: Select2OptionData) => `${x.text}-[${x.id}]`;
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
  constructor(private modalservice: NgbModal,
              private activeModal:NgbActiveModal,
              private skuService: SkuService,
              public activerouter: ActivatedRoute,
              private purchaseService: PurchaseService,
              public router: Router) {
    super(activerouter, router);
  }

  ngOnInit() {

  }
  closeModal(){
    this.activeModal.dismiss();
  }
  batchImport(content){
    let modal=this.modalservice.open(content,{backdrop:'static',size:'sm'});
    modal.result.then(r=>{},c=>{});
    this.batchText='';
    this.batchResult=[];





  }
  loadSkusProise(searchText) {
    return this.skuService.serachSkus(searchText).map(data => {
      const theSkus = data.content;
      const dropSkus = [];
      for (const sku  of  theSkus) {
        const item = <any>{};
        item.id = sku.skuId.toString();
        item.text = sku.skuCode;
        dropSkus.push(item);
        if (this.allSkus.findIndex(m => m.skuId == sku.skuId) < 0) {
          this.allSkus.push(sku)
        }
      }
      return dropSkus;
    });
  }
  selectedItem:any;
  OnselectItem(val) {
    console.info(val);
    const itemInfo = val.item;
    // const skuCode = itemInfo.text;
    this.selectedItem=val;
    $('#number')[0].focus();
  }
  doAddSigleSku(){
    if(this.selectedItem == null){
       this.error("请选择Sku");
       return;
    }
    if(this.num == null || this.num < 1){
      this.error("数量不能小于1");
      return;
    }
    //
    const theSku = this.Data.find(m => m.skuId == this.selectedItem.item.id);
    if(theSku != null){
      this.error("Sku已经存在");
      return;
    }
    const newSku = new AddPurchaseSkuModel();
    newSku.skuId = this.selectedItem.item.id;
    newSku.skuCode = this.selectedItem.item.text;
    newSku.quantity = this.num;

    this.Data.push(newSku);
    this.num=null;
    $('#product').val('');
  }
  closeBatchModal(c:any){
    c();
  }
  confirmBatchImport(c:any){
    if(this.isNullOrEmpty(this.batchText)){
        this.error("请输入Sku");
        return;
    }
    const pData = <any>{};
    pData.Text = this.batchText;
    this.purchaseService.batchAddSkuParse(pData).subscribe(data=> {
        console.info(data);
         const parseResult = data.content;
         let message = "";
         if(parseResult.successCount > 0) {
           let newItemCount = 0;
           for(const sku of parseResult.skus){
               const theSku = this.Data.find(m=>m.skuId == sku.skuId);
               if(theSku == null){
                 const newSku = new AddPurchaseSkuModel();
                 newSku.skuId = sku.skuId;
                 newSku.skuCode = sku.skuCode;
                 newSku.quantity = sku.quantity;
                 this.Data.push(newSku);
                 newItemCount++;
               }
           }
           message += `新增:${newItemCount}个.`;
         }
         else {
           message += `没有解析成功记录.`;
         }
         if(parseResult.errorMessage != null){
           message += parseResult.errorMessage.join(";");
         }
         if(parseResult.successCount > 0){
           if(parseResult.errorMessage ==null || parseResult.errorMessage.length ==0){
             this.alertMessage(message);
             c();
           }
           else{
             this.error(message);
           }
         }
         else{
           this.error(message);
         }
    }, this.handleError);
  }
  onSave(){
    if(!(this.warehouseId > 0)){
      this.error("请指定仓库");
      return;
    }
    if(this.Data.length < 1){
      this.error("请添加Sku");
      return;
    }
    console.info(this.Data);
    let data = <any>{};
    data.warehouseId = this.warehouseId;

    data.skuInfos = [];
    for(const s of this.Data){
       let item = <any>{};
      item.skuId = s.skuId;
      item.skuCode = s.skuCode;
      item.quantity = s.quantity;
      data.skuInfos.push(item);
    }
    this.purchaseService.manualCreatePurchasePlan(data).subscribe(res=>{
      this.alertMessage("创建成功");
      this.activeModal.close();
    }, this.handleError);
  }
  // changeNum(target,code:any){
  //   let index=this.Data.findIndex(v=>v.skuCode==code);
  //   this.Data[index].quantity = target.value;
  //   $(target)[0].blur();
  // }
  // doEdit(target){
  //   $(target).parents('.show-wrap').toggle();
  //   $(target).parents('.show-wrap').next().toggle();
  //   $(target).parents('.show-wrap').next().children('input')[0].focus();
  //   $(target).parents('.show-wrap').next().children('input').val('');
  // }
  // cancelEdit(target){
  //   $(target).parents('.edit-wrap').toggle();
  //   $(target).parents('.edit-wrap').siblings('.show-wrap').toggle();
  // }
}
