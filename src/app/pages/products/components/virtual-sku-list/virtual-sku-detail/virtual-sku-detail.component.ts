import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChooseSkuModalComponent} from "../choose-sku-modal/choose-sku-modal.component";
import {RootComponent} from "../../../../../shared/component/root.component";
import {VirtualSkuDetailervice} from "../../../../../shared/services/virtual-sku-detail-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  VirtualSkuDetailModel,
  VirtualSkuItemModel
} from "../../../../../shared/models/products/virtual-sku-detail-model";
import {SkuService} from "../../../../../shared/services/sku-service";


@Component({
  selector: 'app-virtual-sku-detail',
  templateUrl: './virtual-sku-detail.component.html',
  styleUrls: ['./virtual-sku-detail.component.scss'],
  providers: [VirtualSkuDetailervice, SkuService]
})
export class VirtualSkuDetailComponent extends RootComponent implements OnInit {

  @Input()
  virtualSkuId: number;
  @Input()
  modalHeader: string;

  selectStepIndex: number = 0;
  addModalState: boolean = false;
  chooseSkuIds: number[] = [];
  items: VirtualSkuItemModel[] = [];
  virtualSkuCode: string;

  title:string='创建虚拟SKU';
  operationText:string='创建';


  constructor(private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private virtualSkuDetailervice: VirtualSkuDetailervice,
              private skuService: SkuService) {
    super();


  }

  ngOnInit() {
    if (this.virtualSkuId > 0) {
      this.title='编辑虚拟SKU';
      this.operationText='保存';
      this.virtualSkuDetailervice.getVirtualSkuDetail(this.virtualSkuId).subscribe(data => {
        this.virtualSkuCode = data.content.code;
        for (let vitem of data.content.items) {
          let skuItem = <VirtualSkuItemModel> {
            skuId: vitem.skuId,
            quantity: vitem.quantity,
            skuCode: vitem.skuCode
          };
          this.items.push(skuItem);
        }
      }, this.handleError);
    }
  }


  closeModal() {
    this.activeModal.dismiss();
  }


  saveAddInfo() {
    this.addModalState = false;
  }


  openModal() {
    const chooseModal = this.modalService.open(ChooseSkuModalComponent,{size: 'sm', backdrop: 'static'});
    chooseModal.result.then(result => {
      // console.info(result);

//查询sku
      for (let sku of result) {
        if (this.chooseSkuIds.indexOf(sku) < 0) {
          this.chooseSkuIds.push(sku);
        }
      }
      for (let skuId of this.chooseSkuIds) {

        let exists = this.items.filter(m => m.skuId == skuId);
        if (exists && exists.length > 0) {
          continue;
        }

        this.skuService.getSkuDetail(skuId).subscribe(data => {
          const skuData = new VirtualSkuItemModel();
          skuData.skuId = data.content.id;
          skuData.skuCode = data.content.skuCode;

          this.items.push(skuData);
        }, this.handleError);

      }
    }, reason => {
    });
  }

  deleteItem(id: number) {
    let deleteSkus = this.items.filter(m => m.skuId == id);
    for (let sku of deleteSkus) {
      let index = this.items.indexOf(sku);
      this.items.splice(index, 1);
    }
  }

  doSave() {
    let skuItems: VirtualSkuDetailModel[] = [];

    let virtualSkuCode = this.virtualSkuCode;
    let skuItem;
    for (let sku of this.items) {
      skuItem = {
        skuId: sku.skuId,
        quantity: sku.quantity,
      };
      skuItems.push(skuItem);
    }
    let virtualSkuData = {
      id: this.virtualSkuId,
      code: this.virtualSkuCode,
      items: skuItems
    }
    this.virtualSkuDetailervice.saveSkuInfo(virtualSkuData).subscribe(data => {
      this.alertMessage("保存成功");
      this.activeModal.close();
    }, this.handleError);

  }
}
