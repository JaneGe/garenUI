import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Ali1688AccountService} from "../../../../../shared/services/ali1688-account-service";
import {RootComponent} from "../../../../../shared/component/root.component";
import {PurchaseSkuOrderService} from "../../../../../shared/services/purchaseSkuOrder-service";

@Component({
  selector: 'app-set-1688order-modal',
  templateUrl: './set-1688order-modal.component.html',
  styleUrls: ['./set-1688order-modal.component.scss'],
  providers: [Ali1688AccountService, PurchaseSkuOrderService]
})
export class Set1688orderModalComponent extends RootComponent implements OnInit {

  supplierId: number;
  purchaseIds: number[] = [];


  accounts: any[];
  accountId: number = null;

  constructor(private purchaseOrdeModal: NgbActiveModal,
              private ali1688AccountService: Ali1688AccountService,
              private purchaseSkuOrderService: PurchaseSkuOrderService) {
    super();
    this.ali1688AccountService.getAllAliAccounts().subscribe(data => {
      let items = data.content;

      this.accounts = [];
      for (const a of items) {
        const item = <any>{};
        item.id = a.id;
        item.text = a.accountName;
        this.accounts.push(item);
      }
    }, this.handleError);

  }

  ngOnInit() {
  }

  closeModal() {
    this.purchaseOrdeModal.dismiss();
  }

  onChangeAccountChanged(data: any) {
    this.accountId = data.value;
  }

  createOrder() {
    if (this.accountId == null) {
      this.error("请选择账号");
      return;
    }
    if (!(this.supplierId > 0)) {
      this.error("缺失供应商");
      return;
    }
    if (!(this.purchaseIds && this.purchaseIds.length > 0)) {
      this.error("没有采购的商品");
      return;
    }
    const orderData = {
      supplerId:  this.supplierId,
      purchaseIds: this.purchaseIds,
      accountId: this.accountId
    };
    this.purchaseSkuOrderService.create1688Order(orderData).subscribe(data => {
          this.alertMessage(data.content);
          this.purchaseOrdeModal.close();
    }, this.handleError);
  }
}
