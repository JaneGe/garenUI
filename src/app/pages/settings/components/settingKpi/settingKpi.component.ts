import {Component, OnInit, Input,} from '@angular/core';
import 'rxjs/Rx';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddKpiModalComponent} from "../modals/addKpiModal/addKpiModal.component";
import {InKpiModalComponent} from "../modals/inKpiModal/inKpiModal.component";
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";
import {SettingKpiService} from './settingKpi.service';
import {EmployeeKPIService} from "app/shared/services/employee-KPI-service";


@Component({
  selector: 'app-settingKpi',
  templateUrl: './settingKpi.component.html',
  styleUrls: ['./settingKpi.component.scss', '../style.scss'],
  providers: [SettingKpiService, EmployeeKPIService]
})

export class SettingKpiComponent extends AuthorityComponent implements OnInit {
  screenYears;
  screenMonths;
  timeSpan;
  searchTypes;

  isCustom: boolean = false;

  pageSize: number = 10;
  pageNumber: number = 1;
  total: number = 1;

  timeSearchStart: any = new Date();
  timeSearchEnd: any = new Date();

  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  selectSearchYears: string;
  selectSearchMonths: string;
  selectSearchType: string = 'ByName';
  searchText: string = '';
  items: any[] = [];

  constructor(private modalService: NgbModal,
              public activerouter: ActivatedRoute,
              public router: Router,
              private _settingKpiService: SettingKpiService,
              private employeeKPIService: EmployeeKPIService,) {
    super(activerouter, router);
  }

  screen = [];

  dataState = false;

  ngOnInit() {
    this.timeSearchStart.setDate(this.timeSearchStart.getDate() - 1);

    this.screenYears = this._settingKpiService.screenYears;
    this.screenMonths = this._settingKpiService.screenMonths;
    this.timeSpan = this._settingKpiService.timeSpan;
    this.searchTypes = this._settingKpiService.searchTypes;

    this.loadData();
  }

  loadData(pageNumber: number = 1) {
    this.employeeKPIService.getPageList(this.selectSearchYears, this.selectSearchMonths, this.selectSearchType, this.searchText, pageNumber, this.pageSize).subscribe(data => {
      this.items = data.content.items;
      console.log(this.items);
      const pageInfo = data.content.pageInfo;
      this.pageSize = pageInfo.pageSize;
      this.pageNumber = pageInfo.pageIndex + 1;
      this.total = pageInfo.totalCount;
    }, this.handleError);

  }
  reload() {
    this.loadData(this.pageNumber);
  }

  doSearch() {
    this.loadData();
  }

  pageChanged(pN: number): void {
    this.dataState = false;
    this.loadData(pN);
  }

  onSelect($event, type, value) {
    if (type === 'screenYears') {
      this.selectSearchYears = value;
    }
    else if (type === 'screenMonths') {
      this.selectSearchMonths = value;
    }
    this.loadData();
  }

  onSelectSearchType(type: string) {
    this.selectSearchType = type;
  }

  openAddKpiModal(employeeKPIId: number) {
    const modal = this.modalService.open(AddKpiModalComponent, {size: 'sm', backdrop: 'static'});
    modal.componentInstance.employeeKPIId = employeeKPIId;
    modal.result.then(result => {
      if (result === 1) {
        this.reload();
      }
    }, reason => {
    })
  }

  openInKpiModal() {
    const modal = this.modalService.open(InKpiModalComponent, {size: 'sm', backdrop: 'static'});
    modal.result.then(result => {
      this.loadData();
    }, reason => {
    })
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


  deleteEmployeeKPI(id: number) {
    this.confirm('确定删除该KPI？', () => {
      this.employeeKPIService.deleteEmployeeKPI(id).subscribe(data => {
        this.alertMessage('删除成功');
        this.reload();
      }, this.handleError);
    });
  }
}

