import { Component, OnInit } from '@angular/core';
import { siteMailService } from './siteMail.service';
import { RootComponent } from 'app/shared/component/root.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateManagementComponent } from '../modals/template-management/template-management.component';
import { EmailQueryParam } from "../../../../shared/models/commons/email-query-model";
import { MailDetailModalComponent } from 'app/pages/customer-services/components/modals/mail-detail-modal/mail-detail-modal.component';
import { AmountService } from 'app/shared/services/declared-amount.service';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorityComponent } from "../../../../shared/component/authority.component";

@Component({
  selector: 'app-amazon-services',
  templateUrl: './amazon-services.component.html',
  styleUrls: ['../style.scss', './amazon-services.component.scss'],
  providers: [siteMailService, AmountService]
})
export class AmazonServicesComponent extends AuthorityComponent implements OnInit {
  country;
  undoneStatistics = [{ Id: null, Name: '全部', Count: 0 }];
  todayReStatistics = [{ Id: null, Name: '全部', Count: 0 }];

  timeSearchStart: any = new Date();
  timeSearchEnd: any = new Date();

  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };

  mailTypes;
  mailDefaultTypes;
  data;
  searchParam: EmailQueryParam;
  isCustom: boolean = false;
  timeSpan;
  searchTypes;
  storeSearchKey: string = '';

  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };

  constructor(private modalService: NgbModal,
    private _siteMailService: siteMailService,
    private amountService: AmountService, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
    this.searchParam = new EmailQueryParam();
    this.searchParam.timeSpan = 0;
    this.searchParam.mailSearchType = 1;
    this.searchParam.operationType = null;
    this.mailTypes = _siteMailService.mailTypes;
    this.mailDefaultTypes = _siteMailService.mailDefaultTypes;
    this.data = _siteMailService.Data;
    this.timeSpan = _siteMailService.timeSpan;
    this.searchTypes = _siteMailService.searchTypes;
  }

  ngOnInit() {
    this.timeSearchStart.setDate(this.timeSearchStart.getDate() - 1);
    this.onQuery();
    this.onNoReplySum();
    this.onCurrentReplySum();
  }

  pageChanged(pN: number): void {
    this.onQuery(pN);
  }

  onNoReplySum() {
    this.undoneStatistics = [{ Id: null, Name: '全部', Count: 0 }];
    this._siteMailService.NoReplySumQuery().subscribe(data => {
      for (let i = 0; i < data.content.length; i++) {
        let noReplyItem: any = {};
        noReplyItem.Name = data.content[i].userName;
        noReplyItem.Id = data.content[i].userId;
        noReplyItem.Count = data.content[i].count;
        this.undoneStatistics.push(noReplyItem);
      }
    }, this.handleError);
  }

  onCurrentReplySum() {
    this.todayReStatistics = [{ Id: null, Name: '全部', Count: 0 }];
    this._siteMailService.CurrentReplySumQuery().subscribe(data => {
      for (let i = 0; i < data.content.length; i++) {
        let ReplyItem: any = {};
        ReplyItem.Name = data.content[i].userName;
        ReplyItem.Id = data.content[i].userId;
        ReplyItem.Count = data.content[i].count;
        this.todayReStatistics.push(ReplyItem);
      }
    }, this.handleError);
  }
  reloadData() {
    this.onQuery();
  }
  changeAllBox($event) {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].isCheck = $event.target.checked;
    }
  }
  onSelect($event, type, value) {
    if (type === 'timeSpan') {
      if ($event.innerText === '自定义') {
        this.isCustom = true;
        this.searchParam.timeSpan = value;
        this.dateTransition();
        return;
      } else {
        this.isCustom = false;
      }
    }
    switch (type) {
      case 'mailType':
        this.searchParam.operationType = value;
        break;
      case 'timeSpan':
        this.searchParam.timeSpan = value;
        break;
      case 'noReply':
        this.searchParam.noReplyUserId = value;
        break;
      case 'Reply':
        this.searchParam.replyUserId = value;
        break;
      case 'searchType':
        this.searchParam.mailSearchType = value;
        return;
      case 'mailDefaultTypes':
        this.searchParam.businessType = value;
    }
    this.onQuery();
  }

  SetEmailReadByIds() {
    let readIds = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].isCheck) {
        readIds.push(this.data[i].id);
      }
    }
    this._siteMailService.SetEmailReadByIds(readIds).subscribe(data => {
      this.onQuery();
    });
  }

  setEmailRead(id) {
    let readIds = [];
    readIds.push(id);
    this._siteMailService.SetEmailReadByIds(readIds).subscribe(data => {
      this.onQuery(this.PageInfo.pageIndex);
    }, this.handleError);
  }
  setEmailStar(id) {
    let readIds = [];
    readIds.push(id);
    this._siteMailService.SetEmailStarByIds(readIds).subscribe(data => {
      this.onQuery(this.PageInfo.pageIndex);
    }, this.handleError);
  }
  setEmailException(id) {
    let readIds = [];
    readIds.push(id);
    this._siteMailService.SetEmailExceptionByIds(readIds).subscribe(data => {
      this.onQuery(this.PageInfo.pageIndex);
    }, this.handleError);
  }

  SetEmailNoSeen(id) {
    let readIds = [];
    readIds.push(id);
    this._siteMailService.SetEmailNoSeenByIds(readIds).subscribe(data => {
      this.onQuery(this.PageInfo.pageIndex);
    }, this.handleError);
  }

  onQuery(pageNumber: number = 1) {
    this.country = this.amountService.getCountry();

    this.searchParam.pageSize = this.PageInfo.pageSize;
    this.searchParam.pageIndex = pageNumber - 1;
    this.searchParam.searchText = this.storeSearchKey;
    this.searchParam.beginTime = this.timeSearchStart;
    this.searchParam.endTime = this.timeSearchEnd;

    this._siteMailService.GetEmailQuery(this.searchParam).subscribe(data => {
      this.data = data.content.items;

      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    }, this.handleError);
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
      this.alertMessage("开始时间,和结束时间不能同时为空");
      return;
    }
    this.onQuery();
  }

  openTemplateManagementModal() {
    const modal = this.modalService.open(TemplateManagementComponent,
      { size: 'sm', backdrop: 'static' });
    modal.componentInstance.modalHeader = "回复模板管理";
  }

  openMailDetailModal(id: number) {
    const modal = this.modalService.open(MailDetailModalComponent,
      { size: 'sm', backdrop: 'static' });
    modal.componentInstance.mailId = id;
    modal.result.then(result => {
      this.onQuery(this.PageInfo.pageIndex);
    }, reason => {
    })

    let mailIdItem = [];
    this.data.forEach(element => {
      mailIdItem.push(element.id);
    });
    modal.componentInstance.mailIdItem = mailIdItem;
  }

}
