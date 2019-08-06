import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseSkuOrderService } from "../../../../../shared/services/purchaseSkuOrder-service";

class SelectOptionModel {
  value: string;
  name: string;
}
@Component({
  selector: 'app-purchase-history-modal',
  templateUrl: './purchase-history-modal.component.html',
  styleUrls: ['./purchase-history-modal.component.scss', '../../../style.scss'],
  providers: [PurchaseSkuOrderService]
})
export class PurchaseHistoryModalComponent implements OnInit {

  is1688Order = false;

  types: SelectOptionModel[] = [
    { name: '供应商', value: 'BySupplier' },
    { name: 'SKU', value: 'BySkuCode' }
  ];
  searchType: string = 'BySupplier';

  platformOrderItems: any[];
  skuItems = [];

  purchaseHistoryList: any[];
  supplierId: number;
  skuId: number;
  allUsers: any[] = [];
  eliminationPurchaseOrderUesrItems: any[] = [];
  selectPurchaseUserId: string = null;
  selectEliminationPurchaseOrderUesrId: string = null;
  isChanged: boolean = false;
  isUserChanged: boolean = false;

  theMaxMin = [];

  constructor(private InventoryModal: NgbActiveModal,
    protected purchaseSkuOrderService: PurchaseSkuOrderService) {
  }

  ngOnInit() {
    this.loadData(this.skuId);
    if (this.platformOrderItems !== undefined) {
      for (let i of this.platformOrderItems) {
        var skuinfo = <any>{};
        skuinfo.id = i.skuId;
        skuinfo.text = i.skuName;
        this.skuItems.push(skuinfo);
      }
    }
  }
  
  loadData(skuId, orderBy: number = 0) {
    this.purchaseSkuOrderService.getPurchaseHistoryList(
      this.supplierId, skuId,
      this.selectPurchaseUserId, this.selectEliminationPurchaseOrderUesrId).subscribe(data => {
        function compare(property, isReverse = false) {
          return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            if (isReverse) {
              return value1 - value2;
            } else {
              return value2 - value1;
            }
          }
        }

        if (orderBy === 0) {
          this.purchaseHistoryList = data.content.items;
          console.log(this.purchaseHistoryList);
          
          this.theMaxMin = data.content.items.sort(compare('skuOrderPrice', true));
        } else if (orderBy === 1) {
          this.purchaseHistoryList = data.content.items.sort(compare('skuOrderPrice', true));
        
        } else if (orderBy === 2) {
          this.purchaseHistoryList = data.content.items.sort(compare('skuOrderPrice', false));
        
        }

        let users = [{ id: '0', text: '全部' }];
        for (let c of data.content.creatPurchaseOrderUesrNameItems) {
          const item = <any>{};
          item.id = c.id;
          item.text = `${c.name}`;
          users.push(item);
        }
        this.allUsers = users;

        let eliminationPurchaseOrderUesr = [{ id: '0', text: '全部' }];
        for (let c of data.content.eliminationPurchaseOrderUesrNameItems) {
          const item = <any>{};
          item.id = c.id;
          item.text = `${c.name}`;
          eliminationPurchaseOrderUesr.push(item);
        }
        this.eliminationPurchaseOrderUesrItems = eliminationPurchaseOrderUesr;

        // console.log(this.purchaseHistoryList);
        // console.log(data);
      });


  }

  doSearch(skuId: number = this.skuId) {
    this.loadData(skuId);
  }

  onSkuChanged(data: any) {
    this.doSearch(data.value);
  }

  onChangePurchaseUserChanged(data: any) {
    if (this.isUserChanged) {
      this.selectPurchaseUserId = data.value;
      if (this.selectPurchaseUserId == '全部') {
        this.selectPurchaseUserId = null;
      }
      this.doSearch();
    }
    this.isUserChanged = true
  }

  onChangeEliminationPurchaseOrderUesrChanged(data: any) {
    if (this.isChanged) {
      this.selectEliminationPurchaseOrderUesrId = data.value;
      if (this.selectEliminationPurchaseOrderUesrId == '全部') {
        this.selectEliminationPurchaseOrderUesrId = null;
      }
      this.doSearch();
    }
    this.isChanged = true
  }


  closeModal() {
    this.InventoryModal.close();
  }

  onSearchTypeSelect($event, selectSearchType: string) {
    this.searchType = selectSearchType;
  }

}
