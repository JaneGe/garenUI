import { Component, OnInit } from '@angular/core';
import { RootComponent } from 'app/shared/component/root.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { templateService } from 'app/pages/customer-services/components/template-list/template.service';
import { EmailQueryParam } from 'app/shared/models/commons/email-query-model';
import { TemplateEditComponent } from '../modals/template-edit/template-edit.component';
import {AuthorityComponent} from "../../../../shared/component/authority.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['../style.scss', './template-list.component.scss'],
  providers: [templateService]
})
export class TemplateListComponent extends AuthorityComponent implements OnInit {
  timeSearchStart: any = new Date();
  timeSearchEnd: any = new Date();
  DatepickerOptions: any = {
    minYear: 1970,
    maxYear: 2050,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY'
  };
  isCustom: boolean = false;
  PageInfo: { pageIndex: number, pageSize: number, totalCount: number } = { pageIndex: 0, pageSize: 10, totalCount: 0 };

  statusInt;
  platform;
  language;
  timeChoose;
  timeSpan;
  searchTypes;
  data=[];


  selectParams:any={channelType:null,language:null,timeType:1,timeChoose:null,beginTime:null,endTime:null,searchType:1,searchText:''};
  storeSearchKey:string='';

  constructor(private modalService: NgbModal,
    private _templateService: templateService,public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
  }

  ngOnInit() {
    this.statusInt = this._templateService.statusInt;
    this.platform = this._templateService.platform;
    this.language = this._templateService.language;
    this.timeChoose = this._templateService.timeChoose;
    this.timeSpan = this._templateService.timeSpan;
    this.searchTypes = this._templateService.searchTypes;
    //this.data = this._templateService.data;
    this.onQuery();
  }

  onQuery(pageNumber: number = 1) {
    this.selectParams.pageSize = this.PageInfo.pageSize;
    this.selectParams.pageIndex = pageNumber - 1;
    this.selectParams.searchText = this.storeSearchKey;
    this.selectParams.beginTime = this.timeSearchStart;
    this.selectParams.endTime = this.timeSearchEnd;
    this._templateService.getEmailTemplateAdvQuery(this.selectParams).subscribe(data => {
      this.data = data.content.items;
      this.PageInfo = data.content.pageInfo;
      this.PageInfo.pageIndex++;
    }, this.handleError);
  }

  pageChanged(pN: number): void {
  }

  onSelect($event, type, value) {
    if (type === 'timeSpan') {
      if ($event.innerText === '自定义') {
        this.isCustom = true;
        this.dateTransition();
        return;
      } else {
        this.isCustom = false;
      }
    }

    switch (type){
      case 'platform':
        this.selectParams.channelType=value;
        break;
      case 'language':
        this.selectParams.language=value;
        break;
      case 'timeChoose':
        this.selectParams.timeType=value;
        break;
      case 'timeSpan':
        this.selectParams.timeChoose=value;
        break;
      case 'noReply':
        this.selectParams.searchType=value;
        break;
    }
    this.onQuery();
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
  }

  openTemplateEditModal(id) {
    const modal = this.modalService.open(TemplateEditComponent,
      { size: 'sm', backdrop: 'static' });
    modal.componentInstance.templateId = id;
    modal.componentInstance.modalHeader = "模板编辑";
    modal.result.then(result => {
      this.onQuery();
    });
  }

  enableTemplate(id:any,status:number) {
    this.confirm("确定禁用该模板？", () =>{
      if(status==1){
        status=0;
      }else{
        status=1;
      }
      this._templateService.EmailTemplateEnableById(id,status).subscribe(data => {
        this.alertMessage('禁用除成功！');
        this.onQuery();
      }, this.handleError);
    });
  }

  deleteTemplate(id) {
    this.confirm("确定删除该模板？", () =>{
      this._templateService.EmailTemplateDeleteById(id).subscribe(data => {
        this.alertMessage('删除成功！');
        this.onQuery();
      }, this.handleError);
    });
  }
}
