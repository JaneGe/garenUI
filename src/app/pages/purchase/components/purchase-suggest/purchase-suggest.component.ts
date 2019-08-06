import { InventoryHistoryModalComponent } from '../modals/Inventory-history-modal/Inventory-history-modal.component';
import { PurchaseHistoryModalComponent } from '../modals/purchase-history-modal/purchase-history-modal.component';
import { PurchaseSuggestModel } from "../../../../shared/models/purchases/purchase-suggest-model";
import { PurchaseService } from './purchase-detail-data.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import * as JQuery from "jquery";
import { isInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
import 'rxjs/Rx';
import { RootComponent } from "../../../../shared/component/root.component";
import { error } from 'selenium-webdriver';
import {SkuDetailModalComponent} from "../../../products/components/sku-list/sku-detail-modal/sku-detail-modal.component";

@Component({
  selector: 'app-purchase-suggest',
  templateUrl: './purchase-suggest.component.html',
  styleUrls: ['./purchase-suggest.component.scss', '../../style.scss'],
  providers: [PurchaseService]
})
export class PurchaseSuggestComponent extends RootComponent implements OnInit {
  isStockQuantity: boolean = false;

  detailData: any[] = [];
  screen: any[];
  checkAttr: string[] = [];
  taskId: number;
  orderState: string;
  selectValue: number;
  InputCount: string = '';
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };
  searchParam: PurchaseSuggestModel;
  storeSearchKey: string = '';
  providers: any[];
  isChanged: boolean = false;
  thead_item = [
    { isOrder: false, th: ['编号'] },
    { isOrder: false, th: ['产品信息'],style:{'min-width':'120px'} },
    { isOrder: false, th: ['供应商/采购价'] },
    { isOrder: true, th: ['当前库存', '可用库存', '在途库存', '库存预计销售天数', '采购中'] },
    { isOrder: true, th: ['欠票', '采购建议数量'] },
    { isOrder: true, th: ['当前仓库平均销量'],style:{'max-width':'120px'}},
    { isOrder: true, th: ['7天销量', '15天销量', '30天销量', '90天销量'] },
    { isOrder: false, th: ['补货数量'],style:{'min-width':'110px'}},
    { isOrder: false, th: ['状态'],style:{'min-width':'60px'} }
  ];

  selectPackageIds: number[] = [];
  //isCheckAllPages: boolean = false;

  constructor(public http: Http,
    private purchaseService: PurchaseService,
    private routeInfo: ActivatedRoute,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit() {
    this.searchParam = new PurchaseSuggestModel();
    this.searchParam.Status = -1;
    this.searchParam.Hot = 0;
    this.searchParam.supplierId = -1;
    this.screen = this.purchaseService.screen;
    this.taskId = this.routeInfo.snapshot.params['id'];
    this.orderState = this.routeInfo.snapshot.params['state'];
    this.searchParam.SkuAttr = [];
    this.searchParam.Id = this.taskId;

    if (this.orderState === '欠票') {
      this.isStockQuantity = true;
    }
    this.supplierInit();
    this.onQuery();
  }

  supplierInit() {
    this.purchaseService.GetSupplierList().subscribe(data => {
      let tempdata = [];
      let all = { id: -1, text: '全部' };
      tempdata.push(all);
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.id;
        item.text = c.name;
        tempdata.push(item);
      }
      this.providers = tempdata;
      //console.log(this.providers);
    });
  }

  pageChanged(pN: number): void {
    $('html, body').animate({ scrollTop: 0 }, 0);
    this.onQuery(pN);
  }

  reloadData() {
    this.onQuery(this.PageInfo.pageIndex);
  }

  onSelect($event, type, value) {
    switch (type) {
      case "status":
        this.searchParam.Status = value;
        break;
      case "ishot":
        this.searchParam.Hot = value;
        break;
    }
    this.onQuery();
  }

  GenterOrderModal() {
    this.confirm("确定是否生成采购订单?(注:会将已确认的采购明细生成为采购订单。)", () => {
      this.purchaseService.GeneratePurchaseOrder(this.taskId).subscribe(data => {
        this.onQuery();
      }, this.handleError);
    });

  }
  checkForAttr(target, value) {
    if (target.checked) {
      this.searchParam.SkuAttr.push(value);
    } else {
      for (var i = 0; i < this.searchParam.SkuAttr.length; i++) {
        let obj = this.searchParam.SkuAttr[i];
        if (obj == value) {
          this.searchParam.SkuAttr.splice(i, 1);
        }
      }
    }
    this.onQuery();
  }

  onChangeSupplierChanged(data: { value: number }) {
    if (this.isChanged) {
      this.selectValue = data.value;
      this.searchParam.supplierId = this.selectValue;
      this.onQuery();
    }
    this.isChanged = true;
  }
  onQuery(pageNumber: number = 1) {
    this.searchParam.PageIndex = pageNumber - 1;
    this.searchParam.PageSize = this.PageInfo.pageSize;
    this.searchParam.SearchText = this.storeSearchKey;
    this.purchaseService.PurchasePlanItemQuery(this.searchParam).subscribe(data => {
      this.detailData = data.content.items;
    console.log(this.detailData);
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    });
  }

  checkModal(i, isOver) {
    isOver ? $('.detail-modal-body').eq(i).fadeIn(0) : $('.detail-modal-body').eq(i).fadeOut(0);
  }

  Enter(target: any, index) {
    var value = Number(target.actualNumberShow);
    if (isNaN(value) || !isInteger(value)) {
      target.actualNumberShow = '';
      return;
    }
    target.actualNumber = value;
    var Id = target.id;
    var statusText = target.statusShow;
    var inCount = target.actualNumber;
    if (inCount == 0) {
      this.confirm("确定忽略该订单？", () => {
        this.purchaseService.UpdatePurchasePlanCount(Id, inCount).subscribe(data => {
          this.alertMessage('已忽略')
          target.statusShow = '已忽略';
          this.reloadData();
        });
      });
    } else if (inCount < target.outOfStockQuantity) {
      this.error('采购数量不可小于欠票数量！');
    } else {
      this.purchaseService.UpdatePurchasePlanCount(Id, inCount).subscribe(data => {
        this.alertMessage('已确认')
        target.statusShow = '已确认';
        this.reloadData();
      });
    }
    //this.reloadData();
    //$('.edit-num').eq(index + 1).focus();
  }

  ignore(target: any) {
    var Id = target.id;
    var inCount = 0;
    this.confirm("确定忽略该订单？", () => {
      this.purchaseService.UpdatePurchasePlanCount(Id, inCount).subscribe(data => {
        target.statusShow = '已忽略';
        this.reloadData();
      }, e => {
        this.handleError(e);
      });
    });
  }

  activa(target: any) {
    var Id = target.id;
    this.confirm("确定激活该订单？", () => {
      this.purchaseService.ActivaPurchasePlan(Id).subscribe(data => {
        target.statusShow = '已创建';
        this.reloadData();
      }, e => {
        this.handleError(e);
      });
    });
  }

  openPurchaseHistoryModal(supplierId: number, skuId: number) {
    const PurchaseModal = this.modalService.open(PurchaseHistoryModalComponent,
      { size: 'sm', backdrop: 'static' });
    PurchaseModal.componentInstance.supplierId = supplierId;
    PurchaseModal.componentInstance.skuId = skuId;
  }

  openInventoryHistoryModal(skuId: any) {
    const InventoryModal = this.modalService.open(InventoryHistoryModalComponent,
      { size: 'sm', backdrop: 'static' });
    InventoryModal.componentInstance.skuId = skuId;
  }

  onCheckPackageChanged(isChecked: boolean, orderId: number) {

    if (isChecked) {
      const orderIndex = this.selectPackageIds.indexOf(orderId);
      if (orderIndex >= 0) {
        return;
      }
      else {
        this.selectPackageIds.push(orderId);
      }
    }
    else {
      const orderIndex = this.selectPackageIds.indexOf(orderId);
      if (orderIndex >= 0) {
        this.selectPackageIds.splice(orderIndex, 1);
      }
      //this.isCheckAllPages = false;
    }
  }

  onCheckAllPackageChanged(checked: boolean) {
    if (checked) {
      this.selectPackageIds = [];
      for (let o of this.detailData) {
        this.selectPackageIds.push(o.id);
      }
    }
    else {
      this.selectPackageIds = [];
      //this.isCheckAllPages = false;
    }
    // console.info(this.selectPackageIds);
  }

  /* onCheclAllPageChange(checked: boolean) {


    if (checked) {
      this.selectPackageIds = [];
      for (let o of this.detailData) {
        this.selectPackageIds.push(o.id);
      }
      this.isCheckAllPages = true;
    }
    else {
      this.selectPackageIds = [];
      this.isCheckAllPages = false;
    }
  } */


  addAllGenter() {
    this.confirm("确定生成所有欠票订单？", () => {
      for (let index of this.detailData) {
        if ((index.statusShow === '已确认' || index.statusShow === '已创建') && index.outOfStockQuantity !== 0) {
          index.actualNumberShow = index.outOfStockQuantity;
          this.EnterAllGenter(index);
        }
      }
      this.alertMessage('已生成全部欠票订单。')
    });
    this.reloadData();
  }

  EnterAllGenter(target: any) {
    var value = Number(target.actualNumberShow);
    target.actualNumber = value;
    var Id = target.id;
    var statusText = target.statusShow;
    var inCount = target.actualNumber;
    if (inCount !== 0) {
      this.purchaseService.UpdatePurchasePlanCount(Id, inCount).subscribe(data => {
        target.statusShow = '已确认';
      });
    }
  }
  editProdutInfoModal(skuId){
    const detailModal= this.modalService.open(SkuDetailModalComponent,{size:'sm',backdrop:'static'});
    detailModal.componentInstance.skuId = skuId;
    detailModal.componentInstance.selectStepIndex = 2;
    detailModal.componentInstance.tabs =  [
      { name: '基本信息', selected: false },
      { name: '报关信息', selected: false },
      { name: '采购信息', selected: true }
    ];
  }
  openUrl(url:string){
    let w=window.open(url,'_blank');
    w.focus();
  }
}
