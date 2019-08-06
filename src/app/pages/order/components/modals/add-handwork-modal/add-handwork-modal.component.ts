import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CountryNameService} from '../../../../../shared/services/countryName.service';
import {RootComponent} from "../../../../../shared/component/root.component";
import swal from 'sweetalert2';
import {ChooseSkuModalComponent} from "../choose-sku-modal/choose-sku-modal.component";
import {OrderService} from "../../../../../shared/services/order-service";

@Component({
  selector: 'app-add-handwork-modal',
  templateUrl: './add-handwork-modal.component.html',
  styleUrls: ['./add-handwork-modal.component.scss'],
  providers: [CountryNameService, OrderService]
})

export class AddHandworkModalComponent extends RootComponent implements OnInit {
  public value: string[];
  Countrys = [];
  countryName = [];
  goodsList = [];
  selectedCountry = '';

  orderNumber: string = '';
  totalAmount: Number = null;
  buyerName: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  city: string = '';
  stateOrProvince: string = '';
  countryCode: string = '';
  postalCode: string = '';
  phoneNumber1: number = null;

  constructor(private activeModal: NgbActiveModal,
              private countryNameService: CountryNameService,
              private modalService: NgbModal,
              private orderService: OrderService,) {
    super();
  }

  ngOnInit() {

    this.getCountry();

  }

  getCountry() {
    this.countryNameService.postCommonCountry().subscribe(data => {
      this.Countrys = data.content;
      // let cname = [];
      let j=0;
      for (let i of this.Countrys) {
        // const cName = (`${i.englishName}${i.chineseName}(${i.code})`);
        // cname.push(cName);
        // this.countryName = cname;
        if(j==0){
          this.selectedCountry=i.code;
        }
        const item = <any>{};
        item.id = i.code;
        item.text = `${i.chineseName}(${i.code})`;
        this.countryName.push(item);
        j++;
      }
    });
  }

  onChangeCountryChanged(data: { value: string }) {
    this.selectedCountry = data.value;
  }

  closeModal() {
    // this.activeModal.dismiss();
    this.activeModal.close();
  }

  addGoods() {
    this.goodsList.length++;
  }

  openChooseSkuModal(e) {

    const modal = this.modalService.open(ChooseSkuModalComponent, {size: 'sm', backdrop: 'static'});
    modal.result.then(result => {
      $(e).parent().parent().siblings('input').val(result.skuCode);
    }, reason => {
    });

  }


  removeGood() {
    let goodsList = this.goodsList;
    swal({
      title: '确定删除该商品?',
      type: 'warning',
      showCancelButton: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonText: '删除!',
      cancelButtonText: '取消'
    }).then(function () {
      goodsList.length--;
      swal(
        '成功!',
        '商品已删除.',
        'success'
      )
    })
  }

  onsubmit(value) {
    let goosInfo = [];
    let goods = $("#goods").children("tr");
    for (var i = 0; i < goods.length; i++) {
      let skuCode = $(goods[i]).find('.code').val();
      let num = $(goods[i]).find('.num').val();
      goosInfo.push({skuCode: skuCode, quantity: num});
    }
    value.countryCode = this.selectedCountry;
    value.items = goosInfo;

    if (value.items.length == 0) {
      this.error("请添加商品");
      return;
    }

    this.orderService.createManualOrders(value).subscribe(data => {

      this.alertMessage("添加手工订单成功");
      this.closeModal();

    }, this.handleError);


  }
}

