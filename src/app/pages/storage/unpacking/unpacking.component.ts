///<reference path="../../../shared/models/purchases/unpack-package-info-model.ts"/>
import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PrintLabelComponent } from '../modals/printLabel/printLabel.component';
import { RootComponent } from 'app/shared/component/root.component';
import { WarehouseService } from "../../../shared/services/warehouse-service";
import { UnpackPackageService } from "../../../shared/services/unpack-package.service";
import { UnpackPackageInfoModel } from "../../../shared/models/purchases/unpack-package-info-model";
import { forEach } from "@angular/router/src/utils/collection";
import { IsTroubleComponent } from '../modals/isTrouble/isTrouble.component';
import { Print } from './print';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from "../../../../environments/environment";
import { DetailsComponent } from 'app/pages/storage/modals/details/details.component';
import { AuthorityComponent } from "../../../shared/component/authority.component";
import { ActivatedRoute, Router } from "@angular/router";
import { GroupSkuBillModalComponent } from '../modals/group-sku-bill-modal/group-sku-bill-modal.component';

@Component({
  selector: 'app-unpacking',
  templateUrl: './unpacking.component.html',
  styleUrls: ['./unpacking.component.scss'],
  providers: [WarehouseService, UnpackPackageService, Print]
})

export class UnpackingComponent extends AuthorityComponent implements OnInit {
  allWarehouses: any[] = [];

  skuPackages: UnpackPackageInfoModel[] = [];
  remarks: string;
  remarks_item = new Array;

  putInNum: number = 0;
  lackNum: number = 0;
  qualityNum: number = 0;
  releaseNum: number = 0;

  inputStock: { [id: number]: InputStockInfo; } = {};
  isEnsureActual: boolean = false;
  isEnsureSendBack: boolean = false;

  chanelActualShow: boolean = false;
  chanelSendBackShow: boolean = false;

  selectWarehouseId: number = null;
  selectScanType: string = 'TrackingNumber';
  scanText: string = null;

  constructor(private modalService: NgbModal,
    private unpackPackageService: UnpackPackageService,
    private warehouseService: WarehouseService,
    private print: Print,
    private sanitizer: DomSanitizer, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
  }
  ngOnInit() {
    this.warehouseService.getAllOptions().subscribe(data => {
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.warehouseId;
        item.text = c.name;
        this.allWarehouses.push(item);
      }
      if (this.allWarehouses.length > 0) {
        this.selectWarehouseId = this.allWarehouses[0].id;
      }
      else {
        this.error("没有可选仓库");
      }
    }, this.handleError);
  }

  onWarehouseChanged($event) {
    this.selectWarehouseId = $event.value;
  }

  openModal() {
    const searchModal = this.modalService.open(PrintLabelComponent, { size: 'sm', backdrop: 'static' });
  }


  doSearch() {
    if (!(this.selectWarehouseId > 0)) {
      this.error("请选择仓库");
      return;
    }
    if (this.isNullOrEmpty(this.selectScanType)) {
      this.error("扫描搜索类型");
      return;
    }
    if (this.isNullOrEmpty(this.scanText)) {
      return;
    }

    this.unpackPackageService.searchUnpackPackageInfo(this.selectWarehouseId, this.selectScanType, this.scanText)
      .subscribe(data => {
        this.skuPackages = data.content;
        console.log(this.skuPackages);

        for (let skuP of this.skuPackages) {
          let inputStockInfo = new InputStockInfo();
          inputStockInfo.skuId = skuP.skuId;
          console.log(inputStockInfo.skuId);
          inputStockInfo.purchasePlatformOrderId = skuP.purchasePlatformOrderId;
          inputStockInfo.purchasePlatformOrderItemId = skuP.purchasePlatformOrderItemId;
          inputStockInfo.goodQuantity = 0;
          inputStockInfo.lackQuantity = 0;
          inputStockInfo.badQuantity = 0;
          inputStockInfo.sendWrongQuantity = 0;
          this.inputStock[skuP.purchasePlatformOrderItemId] = inputStockInfo;
        }
      }, this.handleError);
  }

  getReceivePackageCount(skuPackage: UnpackPackageInfoModel) {
    if (skuPackage.trackingNumbers == null) {
      return 0;
    }
    const receiveTrackingNumbers = skuPackage.trackingNumbers.filter(m => m.isReceived == true);
    return receiveTrackingNumbers.length;
  }

  addWarehouseNote(inputInfo: InputStockInfo, skuPackage: UnpackPackageInfoModel) {
    if (this.isNullOrEmpty(inputInfo.warehouseNote)) {
      this.error('备注不能为空');
      return;
    }
    let postData = <any>{};
    postData.id = inputInfo.purchasePlatformOrderItemId;
    postData.content = inputInfo.warehouseNote;

    this.unpackPackageService.addWarehouseNote(postData).subscribe(data => {
      this.alertMessage('成功');
      inputInfo.warehouseNote = null;

      this.unpackPackageService.getPurchasePlatformOrderNotes(inputInfo.purchasePlatformOrderId)
        .subscribe(noteData => {
          skuPackage.orderNotes = noteData.content;
        }, e => {
          console.error(e);
        });

    }, this.handleError);
  }

  instockNumber: number;
  Confirm(purchase, skuPackage, quantityInfo: InputStockInfo) {
    if (quantityInfo.goodQuantity < 0 || quantityInfo.lackQuantity < 0 || quantityInfo.badQuantity < 0
      || quantityInfo.sendWrongQuantity < 0) {
      this.error('所有数量最少为零，请检查');
    } else if (quantityInfo.goodQuantity > purchase && quantityInfo.goodQuantity !== 0) {
      this.confirm("确定该包裹为赠品包裹?", () => {
        this.doInstock(quantityInfo, skuPackage);
      });
    } else {
      this.confirm("确定入库?", () => {
        this.doInstock(quantityInfo, skuPackage);
        this.instockNumber = quantityInfo.goodQuantity
      });
    }
  }

  doInstock(quantityInfo: InputStockInfo, skuPackage: UnpackPackageInfoModel) {
    const postData = <any>{
      'purchasePlatformOrderId': quantityInfo.purchasePlatformOrderId,
      'purchasePlatformOrderItemId': quantityInfo.purchasePlatformOrderItemId,
      'instockQuantity': quantityInfo.goodQuantity,
      'lackQuantity': quantityInfo.lackQuantity,
      'badQuantity': quantityInfo.badQuantity,
      'sendWrongQuantity': quantityInfo.sendWrongQuantity,
      'warehouseId': this.selectWarehouseId,
      'scanText': this.scanText,
      'scanType': this.selectScanType,
    };
    quantityInfo.printLabelQuantity = quantityInfo.goodQuantity;

    this.unpackPackageService.doUnpackInstock(postData).subscribe(data => {
      this.alertMessage('入库成功');
      skuPackage.instockQuantity += quantityInfo.goodQuantity;

      quantityInfo.sendWrongQuantity = 0;
      quantityInfo.lackQuantity = 0;
      quantityInfo.badQuantity = 0;
      quantityInfo.goodQuantity = 0;

      this.unpackPackageService.getPurchasePlatformOrderNotes(skuPackage.purchasePlatformOrderId)
        .subscribe(noteData => {
          skuPackage.orderNotes = noteData.content;
        }, e => {
          console.error(e);
        });
    }, this.handleError);
  }
  printSkuLabel(skuPackage: UnpackPackageInfoModel) {
    const stock = this.inputStock[skuPackage.purchasePlatformOrderItemId];
    if (stock.printLabelQuantity < 1) {
      return;
    }
    const featrure = "toolbar=yes, location=yes, directories=no, " +
      "status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=600, height=600";
    let newWin = window.open('', "_blank", featrure);
    const printUrl = `${environment.api_url}/sku-print/${skuPackage.skuId}/print?pItemId=${skuPackage.purchasePlatformOrderItemId}&warehouseId=${this.selectWarehouseId}&quantity=${stock.printLabelQuantity}`;
    newWin.focus();
    newWin.location.href = printUrl;
  }




  PutIn(purchase, $event, quantityInfo: InputStockInfo) {
    if (($event.keyCode >= 48 && $event.keyCode <= 57) || ($event.keyCode >= 96 && $event.keyCode <= 105) || $event.keyCode === 8) {
      //  if ((purchase - this.putInNum - this.qualityNum - this.releaseNum) >= 0) {
      const lackQuantity = purchase - quantityInfo.goodQuantity - quantityInfo.badQuantity - quantityInfo.sendWrongQuantity;
      if (lackQuantity >= 0) {
        quantityInfo.lackQuantity = lackQuantity;
      } else {
        quantityInfo.lackQuantity = 0;
      }
    }
  }

  openDetailsModal(id: any) {
    const activeModal = this.modalService.open(DetailsComponent, { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = "1688订单详情";
    activeModal.componentInstance.platOrderId = id;
    activeModal.result.then(result => {
      if (result != undefined) {
        console.log(result);
      }
    })
  }

  printModal(skuPackage, quantityInfo: InputStockInfo) {
    const modal = this.modalService.open(GroupSkuBillModalComponent, { size: 'sm', backdrop: 'static' });
    modal.componentInstance.skuCode = skuPackage.skuCode;
    modal.componentInstance.optionUser = skuPackage.operationUserName;
    modal.componentInstance.instockNumber = this.instockNumber;
    modal.componentInstance.trackNumber = this.scanText;
    modal.componentInstance.purchaseUser = skuPackage.createOrderUserName;
    modal.componentInstance.purchaseTime = skuPackage.createOrderTimeDesc;
  }
}

export class InputStockInfo {
  purchasePlatformOrderId: number;
  purchasePlatformOrderItemId: number;
  skuId: number;

  goodQuantity: number;
  lackQuantity: number;
  badQuantity: number;
  sendWrongQuantity: number;

  printLabelQuantity: number;

  warehouseNote: string;
}

export class remarksItem {
  id: number;
  content: string;
}
