import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthorityComponent} from 'app/shared/component/authority.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PurchaseOrder1688Service} from "../../../../purchase/components/purchase-1688/purchase-1688.service";
import {EmployeeKPIService} from "../../../../../shared/services/employee-KPI-service";

@Component({
  selector: 'app-addKpiModal',
  templateUrl: './addKpiModal.component.html',
  styleUrls: ['./addKpiModal.component.scss'],
  providers: [PurchaseOrder1688Service, EmployeeKPIService]
})
export class AddKpiModalComponent extends AuthorityComponent implements OnInit {

  public value = [];
  public current = [];

  isCustom: boolean = false;

  timeSearchStart: any = new Date();
  timeSearchEnd: any = new Date();

  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  employeeKPIId: number = 0;
  allUsers: any[] = [];
  selectPurchaseUserId: string = null;
  taskOrderQuantity: number;
  taskOrderAmount: number;

  isChanged: boolean = false;
  isPageChanged: boolean = false;

  constructor(private activeModal: NgbActiveModal,
              public activerouter: ActivatedRoute,
              public router: Router,
              private purchaseOrderService: PurchaseOrder1688Service,
              private employeeKPIService: EmployeeKPIService,) {
    super(activerouter, router);
  }

  ngOnInit() {
    this.timeSearchStart.setDate(this.timeSearchStart.getDate() - 1);
    this.timeSearchEnd.setDate(this.timeSearchEnd.getDate() - 1);
    this.dateTransition();

    this.purchaseOrderService.GetUserListQuery().subscribe(data => {
      let users = [{id: '0', text: '请选择'}];
      for (let c of data.content) {
        const item = <any>{};
        item.id = c.id;
        item.text = `${c.userName}-${c.workerNo}`;
        users.push(item);
      }
      this.allUsers = users;
    });

    if (this.employeeKPIId != null) {
      this.employeeKPIService.getEmployeeKPIDetail(this.employeeKPIId).subscribe(data => {
        console.log(data.content);
        var date = data.content;
        this.selectPurchaseUserId = date.userId;
        this.timeSearchStart = date.taskStartTime;
        this.timeSearchEnd = date.taskEndTime;
        this.taskOrderQuantity = date.taskOrderQuantity;
        this.taskOrderAmount = date.taskOrderAmount;
      }, this.handleError);
    }

  }

  closeModal() {
    //this.activeModal.close();
    if(this.isPageChanged){
      this.activeModal.close(1);
    }
    else{
       this.activeModal.dismiss();
     }
  }

  onChangePurchaseUserChanged(data: any) {
    if (this.isChanged) {
      this.selectPurchaseUserId = data.value;
      if (this.selectPurchaseUserId == (0).toString()) {
        this.selectPurchaseUserId = null;
      }
    }
    this.isChanged = true;
  }

  dateTransition() {
    if (typeof this.timeSearchStart !== 'string') {
      this.timeSearchStart.setDate(this.timeSearchStart.getDate() + 1);
      this.timeSearchStart = this.timeSearchStart.toJSON().toString().slice(0, 10);
    }
    if (typeof this.timeSearchEnd !== 'string') {
      this.timeSearchEnd.setDate(this.timeSearchEnd.getDate() + 1);
      this.timeSearchEnd = this.timeSearchEnd.toJSON().toString().slice(0, 10);
    }
  }

  doTimeSearch() {
    this.dateTransition();
    if ((this.timeSearchStart == null || this.timeSearchStart.length < 1) && (this.timeSearchEnd == null || this.timeSearchEnd.length < 1)) {
      this.error("开始时间,和结束时间不能同时为空");
      return;
    }
    if (this.timeSearchStart > this.timeSearchEnd) {
      this.error("开始时间不能大于结束时间");
      return;
    }

  }

  save() {
    console.log(this.selectPurchaseUserId);
    console.log(111111+   this.timeSearchStart);
    console.log(222222+   this.timeSearchEnd);
    console.log(this.taskOrderQuantity);
    console.log(this.taskOrderAmount);

    if (this.selectPurchaseUserId == null || this.selectPurchaseUserId == (0).toString()) {
      this.error("请选择员工");
      return;
    }
    if (this.taskOrderQuantity == null || this.taskOrderAmount == null) {
      this.error("请完善数据");
      return;
    }
    this.doTimeSearch();

    let employeeKPIData = {
      id: this.employeeKPIId,
      userId: this.selectPurchaseUserId,
      taskStartTime: this.timeSearchStart,
      taskEndTime: this.timeSearchEnd,

      taskOrderQuantity: this.taskOrderQuantity,
      taskOrderAmount: this.taskOrderAmount,
    };
    if (this.employeeKPIId == null) {
      this.employeeKPIService.saveEmployeeKPI(employeeKPIData).subscribe(data => {
        this.alertMessage("添加成功");
        this.isPageChanged=true;
        this.closeModal()
      }, this.handleError);
    }
    else {
      this.employeeKPIService.saveEmployeeKPI(employeeKPIData).subscribe(data => {
        this.alertMessage("修改成功");
        this.isPageChanged=true;
        this.closeModal()
      }, this.handleError);
    }

  }
}
