import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CountryNameService } from '../../../../../shared/services/countryName.service';
import { RootComponent } from "../../../../../shared/component/root.component";
import swal from 'sweetalert2';
import {
  OrderDetailModel,
  OrderLineEditModel,
  OrderShippingAddress
} from "../../../../../shared/models/orders/order-detail-model";
import { ShippingMethodService } from "../../../../../shared/services/shipping-method-service";
import { WarehouseService } from "../../../../../shared/services/warehouse-service";
import { CommonService } from "../../../../../shared/services/common-service";
import { OrderService } from "../../../../../shared/services/order-service";
import { forEach } from "@angular/router/src/utils/collection";
import { ChooseSkuModalComponent } from "../choose-sku-modal/choose-sku-modal.component";

@Component({
  selector: 'app-reissue-modal',
  templateUrl: './reissue-modal.component.html',
  styleUrls: ['./reissue-modal.component.scss'],
  providers: [CountryNameService, ShippingMethodService, WarehouseService, CommonService, OrderService]
})

export class ReissueModalComponent extends RootComponent implements OnInit {
  public value: string[];

  country;
  countryName = [];
  goodsList = [];
  orderLines = [];

  orderDetail: OrderDetailModel;

  selectedWarehouseId: number = null;
  warehouseAllShippingService;
  allWarehouses;
  selectSsId: number = null;

  buyerAddress: OrderShippingAddress = <OrderShippingAddress>{};
  allCountries: any[] = [];
  reissueReason: string;

  orderLineChanged: boolean = false;

  constructor(private activeModal: NgbActiveModal,
    private countryNameService: CountryNameService,
    private shippingMethodService: ShippingMethodService,
    private warehouseService: WarehouseService,
    private commonService: CommonService,
    private orderService: OrderService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit() {
    this.warehouseService.getAllOptions().subscribe(data => {
      this.allWarehouses = data.content;
      this.selectedWarehouseId = this.allWarehouses[0].warehouseId;
      this.loadWarehouseShippingService();
    }, this.handleError);

    this.getCountry();


  }

  getCountry() {

    this.countryNameService.postCommonCountry().subscribe(data => {
      this.country = data.content;
      for (let i of this.country) {
        const item = <any>{};
        item.id = i.code;
        item.text = (`${i.englishName}${i.chineseName}(${i.code})`)
        this.allCountries.push(item);
      }
    });

  }

  onChangeCountryChanged(data: { value: string }) {
    this.buyerAddress.countryCode = data.value;
  }

  onWarehouseChanged($event) {
    this.loadWarehouseShippingService();
  }

  loadWarehouseShippingService() {

    if (this.selectedWarehouseId > 0) {
      // this.selectSsId = null;
      this.shippingMethodService.getWarehouseAllSelectedShippingService(this.selectedWarehouseId).subscribe(data => {

        this.warehouseAllShippingService = data.content;
        this.selectSsId = this.orderDetail.allocatedShippingServiceId;
        $('.country-select').children('select').attr('disabled','true');
      }, e => {
        this.handleError(e);
      });
    }

  }

  onShippingServiceChanged($event) {
  }

  isNull(str) {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  }

  validMessages = [
    { key: 'buyerName', message: '收件人未填写或填写错误，请检查' },
    { key: 'addressLine1', message: '地址1为填写或填写错误，请检查' },
    { key: 'city', message: '城市未填写或填写错误，请检查' },
    { key: 'stateOrProvince', message: '省州未填写或填写错误，请检查' },
    { key: 'countryCode', message: '国家未填写或填写错误，请检查' },
    { key: 'postalCode', message: '邮编未填写或填写错误，请检查' },
    { key: 'phoneNumber1', message: '电话1未填写或填写错误，请检查' },
    { key: 'reissueReason', message: '备注未填写或填写错误，请检查' },
  ];

  saveReissue() {
    let isValid = true;

    if ((this.selectedWarehouseId != 0 && this.selectSsId == 0) || (this.selectedWarehouseId == 0 && this.selectSsId != 0)) {
      this.error("请选择正确的仓库和物流方式！");
      return;
    }

    if (this.goodsList.length == 0) {
      this.error("商品为空,请添加商品！");
      return;
    }

    for (let i of this.goodsList) {
      if (i.skuCode == null || i.quantity == null) {
        this.error("商品信息为空,请添加商品信息！");
        return;
      }
      if (i.quantity <= 0) {
        this.error("商品数量必须大于0！");
        return;
      }
    }

    let data = {
      OrderNumber: this.orderDetail.orderNumber,
      Site: this.orderDetail.site,
      channelName: this.orderDetail.channelName,
      TotalAmount: this.orderDetail.totalAmount,
      relatedOrderId: this.orderDetail.id,
      reissueReason: this.reissueReason,
      warehouseId: this.selectedWarehouseId,
      shippingServiceId: this.selectSsId,
      buyerName: this.buyerAddress.buyerName,
      addressLine1: this.buyerAddress.addressLine1,
      addressLine2: 'addressLine2',
      city: this.buyerAddress.city,
      stateOrProvince: this.buyerAddress.stateOrProvince,
      postalCode: this.buyerAddress.postalCode,
      countryCode: this.buyerAddress.countryCode,
      phoneNumber1: this.buyerAddress.phoneNumber1,
      phoneNumber2: 'phoneNumber2',
      items: this.goodsList
    }

    if(this.isNull(this.reissueReason)) {
      this.error('补发货原因不得全部为空格！');
      isValid = false;
    }

    for (let key in data) {
      if (data[key] === undefined || null) {
        for (let a in this.validMessages) {
          if (this.validMessages[a].key === key) {
            this.error(this.validMessages[a].message)
            break;
          }
        }
        isValid = false;
        break;
      }
    }

    if (isValid) {
      data.addressLine2 = this.buyerAddress.addressLine2;
      data.phoneNumber2 = this.buyerAddress.phoneNumber2;
      this.orderService.orderReissue(data).subscribe(data => {
        this.activeModal.close();
        this.alertMessage("补发货成功");
      }, e => {
        this.handleError(e);
      });
    }

  }

  openChooseSkuModal(index) {
    console.log(index);

    const modal = this.modalService.open(ChooseSkuModalComponent, { size: 'sm', backdrop: 'static' });
    modal.result.then(result => {
      this.goodsList[index].skuCode = result.skuCode;
    }, reason => {
    });

  }


  closeModal() {
    this.activeModal.close();
  }

  addGoods() {
    let _good = new Good;
    this.goodsList.push(_good);
  }

  removeGood(rIndex) {
    this.confirm('确定删除该商品?', () => {
      this.goodsList.splice(rIndex, 1);
    });
  }
}

export class Good {
  skuCode: string;
  quantity: string;
}
