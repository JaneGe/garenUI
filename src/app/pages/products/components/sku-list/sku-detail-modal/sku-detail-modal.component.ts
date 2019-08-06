import { Component, Input, OnInit } from '@angular/core';
import { RootComponent } from "../../../../../shared/component/root.component";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { SkuService } from "../../../../../shared/services/sku-service";
import { PurchaseAddParam } from "../../../../../shared/models/purchases/purchase-url-model";
import { ImgUploadModalComponent } from 'app/pages/products/components/sku-list/img-upload-modal/img-upload-modal.component';
class SelectOptionModel {
  value: string;
  name: string;
}
@Component({
  selector: 'app-sku-detail-modal',
  templateUrl: './sku-detail-modal.component.html',
  styleUrls: ['./sku-detail-modal.component.scss'],
  providers: [SkuService]
})
export class SkuDetailModalComponent extends RootComponent implements OnInit {
  public options = { multiple: true }
  public value = [];
  public current = [];
  shippmentTypes = [
    { id: 'Normal', text: '普货' },
    { id: 'Battery', text: '纯电池' },
    { id: 'InternalBattery', text: '带内置电池' },
    { id: 'ExternalBattery', text: '带外置电池' },
    { id: 'IncludeButtonBattery', text: '含纽扣电池' },
    { id: 'Liquid', text: '液体' },
    { id: 'Powder', text: '粉末' },
    { id: 'Zippo', text: '打火机' },
    { id: 'Knife', text: '刀' },
    { id: 'Gun', text: '枪' },
    { id: 'MagneticProduct', text: '带磁物品' },
    { id: 'OtherDisableProduct', text: '其他禁运物品' },
    { id: 'Balm', text: '膏状' },
    { id: 'Fragile', text: '易碎' },
    { id: 'AnimalFeatherProduct', text: '动物羽毛类' },
    { id: 'HighPowerBattery', text: '大功率电池' },
    { id: 'ElectronicCigarette', text: '电子烟' },
    { id: 'MobilePower', text: '移动电源' },
    { id: 'RemovableBattery', text: '可拆卸电池' },
    { id: 'Motor', text: '电机_马达' },
    { id: 'CellPhone', text: '手机' },
    { id: 'BalanceBike', text: '平衡车' },
    { id: 'LiquidPen', text: '液体笔类' },
    { id: 'Copy', text: '仿品' }
  ];

  @Input()
  skuId: number;

  @Input()
  tabs = [
    { name: '基本信息', selected: true },
    { name: '报关信息', selected: false },
    { name: '采购信息', selected: false }
  ];

  tabChoose(i) {
    for (const a of this.tabs) {
      a.selected = false;
    }
    this.tabs[i].selected = true;
    this.selectStepIndex = i;
  }

  @Input()
  selectStepIndex: number = 0;
  addModalState: boolean = false;
  editModal: boolean = false;
  isBackUp: boolean = false;
  groupSortId?: any;
  componentPart: any = '';
  isOnlyShowBasicInfo: boolean = true;

  basicInfoForm: FormGroup;
  declarationForm: FormGroup;
  purchaseForm: FormGroup;

  selectShippingAttributes: string[];

  title: string = '添加商品';

  ComponentAttrItems: Array<any> = [
    // {value:'box',name:'箱子'},
    // {value:'box1',name:'盒子'},
    // {value:'stone',name:'石头'},
  ];
  constructor(private activeModal: NgbActiveModal,
    private modalSevice: NgbModal,
    private fb: FormBuilder,
    private skuService: SkuService) {
    super();

    this.basicInfoForm = fb.group({
      'skuName': ['', Validators.compose([Validators.required])],
      'skuCode': ['', Validators.compose([Validators.required])],
      'length': ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      'width': ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      'height': ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      'weight': ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      'isComponent': [''],
      'purchasePrice': [''],
      'imageUrl': [''],
      'shippingAttribute': [''],
      'componentAttr': ['']
    });

    this.declarationForm = fb.group({
      'decEnName': [''],
      'decCnName': [''],
      'hsCode': [''],
      'decValue': ['']
    });

    this.purchaseForm = fb.group({
      'purchaseLink': ['', Validators.compose([Validators.required])],
      'nature': [''],
      'AMZ': ['', Validators.compose([Validators.required])],
      'one688': ['', Validators.compose([Validators.required])],
      'id': [''],
      'default': [''],
      'isBackUp': [''],
      'groupSortId': [''],
      'componentPart': [''],
      'remark': ['', Validators.compose([Validators.maxLength(15)])]
    });
  }

  _isComponent: boolean = false;
  disabled: boolean = false;
  addComponentAttr(val) {
    this.ComponentAttrItems.push(val);
    this.basicInfoForm.controls['componentAttr'].setValue('');
  }
  delComponentAttr(itemname) {
    let index = this.ComponentAttrItems.findIndex(i => i == itemname);
    if (index != -1)
      this.ComponentAttrItems.splice(index, 1);
  }

  ngOnInit() {
    this.basicInfoForm.controls['isComponent'].setValue(false);
    console.log(this.skuId);
    console.log(this.selectStepIndex);
    if (this.skuId > 0) {
      this.isOnlyShowBasicInfo = false;
      this.title = '编辑商品';
      this.disabled = true;
      this.skuService.getSkuDetail(this.skuId).subscribe(data => {
        const skuDetail = data.content;
        this.basicInfoForm.controls['skuName'].setValue(skuDetail.name);
        this.basicInfoForm.controls['skuCode'].setValue(skuDetail.skuCode);

        this.basicInfoForm.controls['length'].setValue(skuDetail.length);
        this.basicInfoForm.controls['width'].setValue(skuDetail.width);
        this.basicInfoForm.controls['height'].setValue(skuDetail.height);
        this.basicInfoForm.controls['weight'].setValue(skuDetail.weight);
        this.basicInfoForm.controls['purchasePrice'].setValue(skuDetail.costPrice);
        this.basicInfoForm.controls['imageUrl'].setValue(skuDetail.imageUrl);
        if (skuDetail.isGroupSku) {
          this.basicInfoForm.controls['isComponent'].setValue('true');
          this.ComponentAttrItems = skuDetail.compositeAttrs;
        }
        else {
          this.basicInfoForm.controls['isComponent'].setValue('false');
        }
        //this.basicInfoForm.controls['isComponent'].setValue(skuDetail.isGroupSku);

        this.value = skuDetail.shippingAttributes;

        this.declarationForm.controls['decEnName'].setValue(skuDetail.declaration.englishName);
        this.declarationForm.controls['decCnName'].setValue(skuDetail.declaration.chineseName);
        this.declarationForm.controls['hsCode'].setValue(skuDetail.declaration.hsCode);
        this.declarationForm.controls['decValue'].setValue(skuDetail.declaration.declaredValue);
        this._isComponent = skuDetail.isGroupSku;
        this.OnUrlQuery();
        this.OnUrlGroupQuery();
      }, this.handleError);
    }
    else {
      //this.basicInfoForm.controls['shippingAttributes'].setValue('Normal');
    }
    this.OnUrlQuery();
  }
  isComponentAttrs: Array<any> = [];
  naturesByAttr: Array<any> = [];
  selectedAttrIndex = 0;
  OnUrlQuery() {
    this.skuService.PurchaseUrlQuery(this.skuId).subscribe(data => {
      this.natures = data.content;
      this.naturesByAttr.push(this.natures[0]);
      if (this._isComponent) {
        this.isComponentAttrs = this.natures[0].purchaseUrlAttr[0].split(',');
      }
    }, this.handleError);
  }
  OnUrlGroupQuery() {
    this.skuService.PurchaseUrlGroupQuery(this.skuId).subscribe(data => {
      this.spareLinkGroup = data.content;
    }, this.handleError);
  }

  showUrlByAttr(attr: any, index: any) {
    console.log(index);
    this.selectedAttrIndex = index;
  }
  closeModal() {
    this.activeModal.close(this.addUrlReload);
    //this.activeModal.dismiss();
  }

  prevStep() {
    if (this.selectStepIndex === 0) {
      this.selectStepIndex = 0;
    } else {
      this.selectStepIndex--;
      for (let item of this.tabs) {
        item.selected = false;
      }
      this.tabs[this.selectStepIndex].selected = true;
    }
  }

  validMessages = [
    { key: 'skuName', message: '商品名称必填，且少于16字' },
    { key: 'skuCode', message: 'SKUCode必填，最大长度为10' },
    { key: 'length', message: '商品长度未填或错误，请检查' },
    { key: 'width', message: '商品宽度未填或错误，请检查' },
    { key: 'height', message: '商品高度未填或错误，请检查' },
    { key: 'weight', message: '商品重量未填或错误，请检查' }
  ];

  Validators(form) {
    let isValid = true;
    for (let i in form.controls) {
      if (!form.controls[i].valid) {
        for (let a in this.validMessages) {
          if (this.validMessages[a].key === i) {
            this.error(this.validMessages[a].message)
            break;
          }
        }
        isValid = false;
        break;
      }
    }
    if (isValid) {
      this.nextStep();
    }
  }

  nextStep() {
    if (this.selectStepIndex === 1 && isNaN(this.skuId)) {
      this.selectStepIndex = 1;
    }
    else if (this.selectStepIndex === 2) {
      this.selectStepIndex = 2;
    } else {
      this.selectStepIndex++;
      for (let item of this.tabs) {
        item.selected = false;
      }
      this.tabs[this.selectStepIndex].selected = true;
    }
    this.isOnlyShowBasicInfo = false;
  }
  openAddModal(isbackupUrl: boolean, isEdit: boolean, content: any, groupSortId?: any) {
    this.addModalState = true;
    this.editModal = isEdit;
    this.isBackUp = isbackupUrl;
    this.groupSortId = groupSortId;
    this.purchaseForm.controls['id'].setValue(null);
    this.purchaseForm.controls['isBackUp'].setValue(isbackupUrl);
    this.purchaseForm.controls['groupSortId'].setValue(groupSortId);
    this.purchaseForm.controls['purchaseLink'].setValue(null);
    this.purchaseForm.controls['nature'].setValue(null);
    this.purchaseForm.controls['AMZ'].setValue(null);
    this.purchaseForm.controls['one688'].setValue(null);
    this.purchaseForm.controls['remark'].setValue(null);
    this.purchaseForm.controls['componentPart'].setValue(null);
    this.componentPart = "";
    this.modalSevice.open(content, { size: 'sm', backdrop: 'static' });
  }

  closePurchase() {
    //this.addModalState = false;
  }

  LinkTab(i) {
    this.selectStepIndex = i;
  }

  onSaveBasicInfo() {
    this.nextStep();
  }


  /* Validators($event, formcontrol) {
    if (!this.basicInfoForm.controls[formcontrol].valid) {
      $event.className = 'form-control short-input error-input';
    } else {
      $event.className = 'form-control short-input';
    }
  } */



  onSaveSku(value: any) {
    this.basicInfoForm.value.skuName = this.basicInfoForm.value.skuName.trim();

    const baseInfoValue = this.basicInfoForm.value;
    const declarationValue = this.declarationForm.value;

    if (isNaN(baseInfoValue.length) || isNaN(baseInfoValue.weight) || isNaN(baseInfoValue.width) || isNaN(baseInfoValue.height)
      || isNaN(baseInfoValue.purchasePrice)) {
      this.error("只允许输入数字");
      return;
    }

    let skuData = {
      id: this.skuId,
      skuCode: baseInfoValue.skuCode,
      name: baseInfoValue.skuName,
      length: baseInfoValue.length,
      weight: baseInfoValue.weight,
      width: baseInfoValue.width,
      height: baseInfoValue.height,
      imageUrl: baseInfoValue.imageUrl,
      shippingAttribute: this.selectShippingAttributes,
      costPrice: baseInfoValue.purchasePrice,
      isGroupSku: baseInfoValue.isComponent,
      CompositeProductAttrs: this.ComponentAttrItems,
      declaration: {
        chineseName: declarationValue.decCnName,
        englishName: declarationValue.decEnName,
        declaredValue: declarationValue.decValue,
        hsCode: declarationValue.hsCode,
      }
    };

    if (!this.isNullOrEmpty(baseInfoValue.shippingAttribute)) {
      skuData.shippingAttribute.push(baseInfoValue.shippingAttribute);
    }

    this.skuService.saveSkuInfo(skuData).subscribe(data => {
      this.alertMessage("保存成功");

      this.activeModal.close(this.addUrlReload);

    }, this.handleError);
  }


  purchse = new Purchse;
  natures = [];
  addUrlReload: boolean = false;
  onSavePurchase(edit: any, c: any) {
    var editone = new PurchaseAddParam();
    editone.Id = this.purchaseForm.value.id;
    editone.Url = this.purchaseForm.value.purchaseLink;
    editone.AmQuantityRratio = this.purchaseForm.value.AMZ;
    editone.QuantityRratio1688 = this.purchaseForm.value.one688;
    editone.Note = this.purchaseForm.value.remark;
    editone.Attr = this.purchaseForm.value.nature;
    editone.CompositeAttr = this.purchaseForm.value.componentPart;
    editone.SkuId = this.skuId;
    editone.IsBackupLink = this.purchaseForm.value.isBackUp;
    editone.GroupSortId = this.purchaseForm.value.groupSortId;
    editone.IsEdit = edit;
    editone.SupplierId = 0;
    this.skuService.AddPurchaseUrl(editone).subscribe(data => {
      this.OnUrlQuery();
      this.OnUrlGroupQuery();
      if (edit) {
        //this.addModalState = false;
        c();
        this.editModal = false;
        this.alertMessage('保存成功！');
      }
      else {
        this.purchaseForm.reset();
        //this.addModalState = false;
        c();
        this.alertMessage('保存成功！');
        this.addUrlReload = true;
      }
    }, this.handleError);
  }
  spareLinkGroup: Array<any> = [];
  edit(id: any, isbackupUrl: boolean, groupSortId: any, content: any) {
    var thisPurchase: any = {};
    if (!isbackupUrl) {
      for (let item of this.natures) {
        if (item.id == id) {
          thisPurchase = item;
        }
      }
    } else {
      const spareLinkitem = this.spareLinkGroup.find(s => s.groupSortId == groupSortId);
      if (spareLinkitem) {
        thisPurchase = spareLinkitem.purchaseUrls.find(f => f.id == id);
      }
    }
    if (thisPurchase) {
      this.purchaseForm.controls['id'].setValue(thisPurchase.id);
      this.purchaseForm.controls['isBackUp'].setValue(isbackupUrl);
      this.purchaseForm.controls['purchaseLink'].setValue(thisPurchase.url);
      this.purchaseForm.controls['nature'].setValue(thisPurchase.purchaseUrlAttr.join(';'))
      this.purchaseForm.controls['AMZ'].setValue(thisPurchase.amQuantityRratio);
      this.purchaseForm.controls['one688'].setValue(thisPurchase.quantityRratio1688);
      this.purchaseForm.controls['remark'].setValue(thisPurchase.note);
      this.componentPart = thisPurchase.compositeAttr;
      this.purchaseForm.controls['componentPart'].setValue(thisPurchase.compositeAttr);
      this.editModal = true;
      //this.addModalState = true;
      if (content) {
        this.modalSevice.open(content, { size: 'sm', backdrop: 'static' });
      }
    }
  }



  delUrl(id: any) {
    this.skuService.DeletePurchaseUrl(id).subscribe(data => {
      this.OnUrlQuery();
      this.OnUrlGroupQuery();
    }, this.handleError);
  }

  settingDefault(Id, IsDefault: boolean) {
    this.skuService.SetDefaultUrl(Id, !IsDefault).subscribe(data => {
      this.OnUrlQuery();
      this.OnUrlGroupQuery();
    }, this.handleError);
  }

  setMailPurchaseUrl(groupSort: any) {
    this.skuService.SetMailPurchaseUrl(this.skuId, groupSort).subscribe(data => {
      this.OnUrlQuery();
      this.OnUrlGroupQuery();
    }, this.handleError);
  }

  onChanged(data: { value: string[] }) {
    this.selectShippingAttributes = data.value;
  }

  openImgUploadModal() {
    const modal = this.modalSevice.open(ImgUploadModalComponent, { size: 'sm', backdrop: 'static' });
    modal.result.then(result => {
      console.info(result);
      if(!this.isNullOrEmpty(result)){
        this.basicInfoForm.controls['imageUrl'].setValue(result);
      }
    }, reason => {
    });
  }

}


export class Purchse {
  id: number;
  purchaseLink: string;
  natures: {}[];
  percentage: { AMZ: number, one688: number }[];
  remark: string;
  default: boolean;
}
