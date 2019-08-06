import { Component, OnInit } from '@angular/core';
import { DeliverRulesListService } from "./deliverRulesList.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompleteSaleRuleModalComponent } from "./complete-sale-rule-edit-modal/complete-sale-rule-modal.component";
import { ActivatedRoute } from "@angular/router";
import { WarehouseOptionModel } from "../../../shared/models/warehouses/warehouse-option-model";
import { WarehouseService } from "../../../shared/services/warehouse-service";
import {CommonOptionModel, SiteConst} from "../../../shared/services/site-const";
import { OrderCompleteSaleRuleService } from "../../../shared/services/order-complete-sale-rule.service";
import { RootComponent } from "../../../shared/component/root.component";
import { OrderCompleteSaleListModel } from "../../../shared/models/orderrules/order-complete-sale-list-model";

@Component({
  selector: 'app-deliver-rules-list',
  templateUrl: './deliver-rules-list.component.html',
  styleUrls: ['./deliver-rules-list.component.scss'],
  providers: [DeliverRulesListService, WarehouseService, OrderCompleteSaleRuleService]
})
export class DeliverRulesListComponent extends RootComponent implements OnInit {
  plateForm: string;
  plateFormDisplayName: string;
  clicktop = 0;
  clickbottom = 0;
  warehouses: WarehouseOptionModel[] = [{ warehouseId: null, name: '全部' }];
  isActiveOptions: CommonOptionModel[] = [{ value: null, text: '全部' }, { value: 'true', text: '是' },
  { value: 'false', text: '否' }];
  searchKind: Array<any> = [{ id: 0, text: '规则名称' }, { id: 1, text: '优先级' }];

  allWarehouses: WarehouseOptionModel[] = [];

  selectedWarehouseId = null;
  selectedIsActive = null;
  selectedsearchKind: number = 0;
  searchText: string = '';

  rules: OrderCompleteSaleListModel[] = [];

  constructor(private orderCompleteSaleRuleService: OrderCompleteSaleRuleService,
    private modalService: NgbModal,
    private warehouseService: WarehouseService,
    private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(para => {
      const channelTypeInfo = SiteConst.supportChannelTypeNoManual.find(m=>m.code ==  para['plateForm']);
      if(channelTypeInfo != null) {
        this.plateForm = channelTypeInfo.code;
        this.plateFormDisplayName = channelTypeInfo.displayName;
      }
      this.OnQuery();
    });

    this.warehouseService.getAllOptions().subscribe(r => {
      this.allWarehouses = r.content;
      for (const item of this.allWarehouses) {
        this.warehouses.push(item)
      }
    });
  }

  toggle(val: any) {
    if (val == 0) {
      this.clicktop = 1;
    }
    else {
      this.clicktop = 0;
    }
    console.log(this.clicktop);
  }

  toggle1(val: any) {
    if (val == 0) {
      this.clickbottom = 1;
    }
    else {
      this.clickbottom = 0;
    }
  }

  selectWarehouse(val: any) {
    this.selectedWarehouseId = val;
    this.OnQuery();
  }

  selectifActive(val: any) {
    this.selectedIsActive = val;
    this.OnQuery();
  }


  selectsearchKind(val: any) {
    this.selectedsearchKind = val;
  }

  OnQuery(pn = 1) {
    this.orderCompleteSaleRuleService.getRuleList(this.plateForm, this.selectedIsActive, this.selectedWarehouseId,
      this.selectedsearchKind, this.searchText).subscribe(data => {
        this.rules = data.content;
      }, this.handleError);

  }

  addRules() {
    let modal = this.modalService.open(CompleteSaleRuleModalComponent, {
      backdrop: 'static',
      size: 'lg',
      windowClass: 'animated fadeIn'
    });
    modal.componentInstance.modalHeader = '添加发货规则';
    modal.componentInstance.allWarehouses = this.allWarehouses;
    modal.componentInstance.channelType = this.plateForm;
    modal.result.then(result => {
      if (result) {
        this.OnQuery();
      }
    }, () => {
    })
  }

  editRules(id: any) {
    let modal = this.modalService.open(CompleteSaleRuleModalComponent, {
      backdrop: 'static',
      size: 'lg',
      windowClass: 'animated fadeIn'
    });
    modal.componentInstance.modalHeader = '编辑发货规则';
    modal.componentInstance.allWarehouses = this.allWarehouses;
    modal.componentInstance.channelType = this.plateForm;
    modal.componentInstance.ruleId = id;
    modal.result.then(result => {
      if (result) {
        this.OnQuery();
      }
    }, () => {
    })
  }

  enableRule(id: any) {
    this.confirm("确定激活该规则?", () => {
      this.orderCompleteSaleRuleService.enableRule(id).subscribe(data => {
        this.alertMessage('激活成功');
        this.OnQuery();
      }, this.handleError);
    });
  }

  disableRule(id: any) {
    this.confirm("确定禁用该规则?", () => {
      this.orderCompleteSaleRuleService.disableRule(id).subscribe(data => {
        this.alertMessage('禁用成功');
        this.OnQuery();
      }, this.handleError);
    });
  }

  deleteRule(id: any) {
    this.confirm("确定删除该规则?", () => {
      this.orderCompleteSaleRuleService.deleteRule(id).subscribe(data => {
        this.alertMessage('删除成功');
        this.OnQuery();
      }, this.handleError);
    });
  }

  doEditPriority(target){
    $(target).parents('.show-wrap').toggle();
    $(target).parents('.show-wrap').next().toggle();
    $(target).parents('.show-wrap').next().children('input')[0].focus();
    $(target).parents('.show-wrap').next().children('input').val('');
  }
  cancelEdit(target){
    $(target).parents('.edit-wrap').toggle();
    $(target).parents('.edit-wrap').siblings('.show-wrap').toggle();
  }
  big: number = 0;
  changePriority(target:any,id:number){
    var reg = /^[1-9]\d*$/;
    var value=target.value;
    if(reg.test(value)){
      this.cancelEdit(target);
      this.orderCompleteSaleRuleService.UpdateRulePriority(value,id,this.plateForm).subscribe(data => {
        this.OnQuery();
      }, this.handleError);

    }
    else{
      this.error("优先级不符合规则！");
    }
  }
}
