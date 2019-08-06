import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as Slide from '../../../../../shared/animations/modal-Slide';
import { SupplierService } from "../../../../../shared/services/supplier-service";
import { RootComponent } from "../../../../../shared/component/root.component";
import { PurchaseOrder1688Service } from "../../purchase-1688/purchase-1688.service";

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['../modal-public.scss', './edit-supplier.component.scss'],
  providers: [SupplierService, PurchaseOrder1688Service]
})
export class EditSupplierComponent extends RootComponent implements OnInit {
  @Input()
  modalHeader: string;
  node: any;

  errorPage: boolean;
  alertClose: boolean = true;
  selectPurchaseUserId: number = 0;

  id: any;
  allUsers: any[] = [];

  info: infoClass = {
    id: '', name: '', contacts: '', contactNum: '', Email: '',
    address: '', statu: '启用', website: '', desciption: '', maintainMan: '', createOrderUserId: null,
    contactName:'',phone:null,url:'',note:''
  };

  constructor(private activeModal: NgbActiveModal,
    private purchaseOrderService: PurchaseOrder1688Service,
    private supplierService: SupplierService) {
    super();
  }

  ngOnInit() {
    this.selectPurchaseUserId = this.info.createOrderUserId;
    if (this.selectPurchaseUserId == null) {
      this.selectPurchaseUserId = 0;
    }


    this.purchaseOrderService.GetUserListQuery().subscribe(data => {
      let users = [{ id: 0, text: '请选择' }];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.id;
        item.text = `${c.userName}-${c.workerNo}`;
        users.push(item);
      }
      this.allUsers = users;
    }, this.handleError);

    this.node = document.getElementById("form").parentNode.parentNode.parentNode;
    Slide.slideIn(this.node);
  }


  closeModal() {
    //Slide.slideLeft(this.node, this);
    this.activeModal.close();
  }

  closeAlert() {
    this.alertClose = false;
  }

  check(target: any) {
    $(target).change(function () {
      $(this).blur(function () {
        $(this).removeClass("red");
      })
    })
  }

  Onsubmit(name: any, contacts: any, contactNum: any, email: any, website: any, address: any, desciption: any) {
    var danger = function (jq: JQuery) {
      jq.addClass('has-error');
      jq.addClass('red');
      setTimeout(() => {
        jq.removeClass('has-error')
      }, 1500);
    };

    this.info.id = this.id;
    this.info.name = name;
    this.info.contacts = contacts;
    this.info.contactNum = contactNum;
    this.info.Email = email;
    this.info.website = website;
    this.info.address = address;
    this.info.desciption = desciption;
    if (this.info.name == '') {
      this.errorPage = true;
      this.alertClose = true;
      if (this.info.name == '') danger($('#name'));
      if (this.info.contacts == '') danger($('#contacts'));
      if (this.info.contactNum == '') danger($('#contactNum'));
    }
    // else {
    //   Slide.slideRight(this.node, this, this.info);
    // }
    let date;
    if (this.info.id != null) {
      date = {
        id: this.info.id,
        name: this.info.name,
        url: this.info.website,
        contactName: this.info.contacts,
        address: this.info.address,
        email: this.info.Email,
        phone: this.info.contactNum,
        note: this.info.desciption,
        createOrderUserId: this.selectPurchaseUserId
      }
    }
    else {
      date = {
        name: this.info.name,
        url: this.info.website,
        contactName: this.info.contacts,
        address: this.info.address,
        email: this.info.Email,
        phone: this.info.contactNum,
        note: this.info.desciption,
        createOrderUserId: this.selectPurchaseUserId
      }
    }

    if (date.createOrderUserId == 0) {
      date.createOrderUserId = '';
    }

    this.supplierService.saveSupplierInfo(date).subscribe(data => {
      Slide.slideRight(this.node, this, data);
    }, this.handleError);

  }

  onChangePurchaseUserChanged(data: any) {
    this.selectPurchaseUserId = data.value;
  }
}

export class infoClass {
  id: string;
  name: string;
  contacts: string;
  contactNum: string;
  Email: string;
  address: string;
  statu: string;
  website: string;
  desciption: string;
  maintainMan: string;
  createOrderUserId: number;
  contactName:string;
  phone:null;
  url:string;
  note:string;
}
