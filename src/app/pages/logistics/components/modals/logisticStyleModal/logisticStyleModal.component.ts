import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddLogisticRuleComponent} from '../addLogisticRule/addLogisticRule.component';
import {ShippingMethodService} from "../../../../../shared/services/shipping-method-service";
import {RootComponent} from "../../../../../shared/component/root.component";

@Component({
  selector: 'app-logisticStyleModal',
  templateUrl: './logisticStyleModal.component.html',
  styleUrls: ['./logisticStyleModal.component.scss'],
  providers: [ShippingMethodService]
})

export class LogisticStyleModalComponent extends RootComponent implements OnInit {
  @Input()
  ssName: string;

  @Input()
  ssId: number;


  pageSize: number = 10;
  pageNumber: number = 1;
  total: number = 0;

  items: any[] = [];

  constructor(private packageModal: NgbActiveModal,
              private modalService: NgbModal,
              private shippingMethodService: ShippingMethodService) {
    super();
  }

  ngOnInit() {

    this.load();

  }

  load(pn:number=1) {
    this.shippingMethodService.getShippingRules(this.ssId, this.pageNumber, this.pageSize).subscribe(data => {
      this.items = data.content.items;
      this.pageSize = data.content.pageInfo.pageSize;
      this.pageNumber = data.content.pageInfo.pageIndex + 1;
      this.total = data.content.pageInfo.totalCount;
    }, this.handleError);
  }

  pageChanged(pn){
    this.pageNumber=pn;
    this.load();
  }
  closeModal() {
    this.packageModal.close()
  }

  openAddModal() {
    const searchModal = this.modalService.open(AddLogisticRuleComponent, {size: 'lg', backdrop: 'static'});
    searchModal.componentInstance.ssId = this.ssId;
    searchModal.componentInstance.modalTitle = '新增运费规则';
    searchModal.result.then((result) => {
      this.load();
    },(reason) => {});
  }

  openEditModal(ruleId: number) {
    const searchModal = this.modalService.open(AddLogisticRuleComponent, {size: 'lg', backdrop: 'static'});
    searchModal.componentInstance.ssId = this.ssId;
    searchModal.componentInstance.shippingFeeRuleId = ruleId;
    searchModal.componentInstance.modalTitle = '编辑运费规则';
    searchModal.result.then((result) => {
      //this.closeModal();
      this.load();
    },(reason) => {});
  }

  deleteShippingFeeRule(ruleId: number) {
    this.confirm("确定删除", () => {
      this.shippingMethodService.deleteShippingFeeRule(ruleId, this.ssId).subscribe(data => {
        this.alertMessage("删除成功");
        this.load();
      }, this.handleError);
    });

  }
}

