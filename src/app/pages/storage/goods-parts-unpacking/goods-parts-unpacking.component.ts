import { Component, OnInit } from '@angular/core';
import { AuthorityComponent } from 'app/shared/component/authority.component';
import { ActivatedRoute, Router } from '@angular/router';
import {PackageUnpackingService} from "./goods-parts-unpacking.server";
import { environment } from "../../../../environments/environment";
import {isNumeric} from "rxjs/util/isNumeric";

@Component({
  selector: 'app-goods-parts-unpacking',
  templateUrl: './goods-parts-unpacking.component.html',
  styleUrls: ['./goods-parts-unpacking.component.scss'],
  providers: [PackageUnpackingService]
})
export class GoodsPartsUnpackingComponent extends AuthorityComponent implements OnInit {

/*   packageType = [
    { id: 1, name: '可入库包裹' },
    { id: 0, name: '不可入库包裹' },
  ] */

  searchType = [
    { id: 'orderNumber', name: '订单号' },
    { id: 'purchaseNumber', name: '下单号' },
    { id: 'skuCode', name: 'SKUCode' },
    { id: 'skuName', name: '商品名称' },
  ]

  searchText:string='';
  chooseType:string='orderNumber';
  batchId:number=-1;
  goodsPartsItems = [
    // {
    //   isUnfold: true,
    //   items: [
    //     {
    //       trackNumber: '11231456456498',
    //       orderNumber: '3353948615031',
    //       purchaseNumber: '田茂561',
    //       purchaseQuantityRatio: '1:1',
    //       createOrderUserName: 'DevUser',
    //       purchaseNote: '无',
    //       aliAttributes: '木棍球羽毛'
    //     }, {
    //       trackNumber: '11231456456498',
    //       orderNumber: '3353948615031',
    //       purchaseNumber: '田茂561',
    //       purchaseQuantityRatio: '1:1',
    //       createOrderUserName: 'DevUser',
    //       purchaseNote: '无',
    //       aliAttributes: '木棍球羽毛'
    //     }, {
    //       trackNumber: '11231456456498',
    //       orderNumber: '3353948615031',
    //       purchaseNumber: '田茂561',
    //       purchaseQuantityRatio: '1:1',
    //       createOrderUserName: 'DevUser',
    //       purchaseNote: '无',
    //       aliAttributes: '木棍球羽毛'
    //     }, {
    //       trackNumber: '11231456456498',
    //       orderNumber: '3353948615031',
    //       purchaseNumber: '田茂561',
    //       purchaseQuantityRatio: '1:1',
    //       createOrderUserName: 'DevUser',
    //       purchaseNote: '无',
    //       aliAttributes: '木棍球羽毛'
    //     }
    //   ]
    // }
  ];
  constructor(public activerouter: ActivatedRoute, public router: Router,private packageUnpackingService: PackageUnpackingService) {
    super(activerouter, router);
  }

  ngOnInit() {
    this.OnQuery();
  }

  onSearchTypeChange(event, id) {
    this.chooseType = id;
  }

  unfoldItem(item) {
    item.isUnfold = !item.isUnfold;
  }

  unfoldAll(state) {
    this.goodsPartsItems.forEach(element => {
      element.isUnfold = state;
    });
  }

  OnQuery(){
    const params={
      SearchType:this.chooseType,
      SearchText:this.searchText
    };
    this.packageUnpackingService.CombineUnpackRecorderQuery(params).subscribe(data => {
      this.goodsPartsItems = data.content;
    }, this.handleError);

  }

  enterPutIn(param:any) {
    if(param.inStoreNumber==0){
      this.error("请输入正确的入库数量!");
      return;
    }
    this.confirm("确认入库?", () => {
      this.packageUnpackingService.CombineUnpackInStore(param).subscribe(data => {
        this.batchId = data.content;
        this.alertMessage("确认入库成功,请开始打印标签!");
        //this.OnQuery();
      }, this.handleError);
    });
  }

  printSkuLabel(param: any) {
    if(this.batchId==-1){
      this.error("请确认入库后,才能进行打印标签!");
      return;
    }
    if(param.printNumber< 1){
      this.error("请输入正确的打印数量进行打印!");
      return;
    }

    const featrure = "toolbar=yes, location=yes, directories=no, " +
      "status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=600, height=600";
    let newWin = window.open('', "_blank", featrure);
    const printUrl = `${environment.api_url}/sku-print/${param.skuId}/printcombineSk?batchId=${this.batchId}&warehouseId=${param.warehouseId}&quantity=${param.printNumber}`;
    newWin.focus();
    newWin.location.href = printUrl;
  }
}
