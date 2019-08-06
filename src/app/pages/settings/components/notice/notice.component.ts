import { NoticeModel, UpdataModel, StatusModel } from "../../../../shared/models/notice/notice.model";
import { RootComponent } from "../../../../shared/component/root.component";
import { NoticeService } from "../../../../shared/services/notice.service";
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import './ckeditor.loader';
import 'ckeditor';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityComponent} from "../../../../shared/component/authority.component";

@Component({
  selector: 'notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  providers: [NoticeService]
})

export class NoticeComponent extends AuthorityComponent implements OnInit {
  ckeditorContent: string = '<p>请输入您所要发布的公告！</p>';
  public config = {
    uiColor: '#F0F3F4',
    height: '600',
  };
  select = ['全部', '已发布', '草稿'];

  pageNumber: number = 1;
  pageSize: number = 10;
  total:number;

  modalShow: boolean = false;
  isEdit: boolean = false;

  noticeTitle: string;

  updataId: number;

  noticeList;

  addPage = new NoticeModel;
  updataPage = new UpdataModel;

  constructor(private noticeService: NoticeService,public activerouter: ActivatedRoute,public  router:Router) {
    super(activerouter,router);
  }

  ngOnInit() {
    this.loadData();
  }

  onSelect($event, i) {
    if (i === 0) {
      this.loadData();
    } else if (i === 1) {
      this.loadData(1,'Show');
    } else {
      this.loadData(1,'NoShow');
    }
  }

  loadData(pageNumber: number = 1,status: string = null) {
    this.noticeService.getAnnouncementPageList(pageNumber, this.pageSize, status).subscribe(data => {
      this.noticeList = data.content.items;
      this.pageNumber = data.content.pageInfo.pageIndex + 1;
      this.pageSize = data.content.pageInfo.pageSize;
      this.total = data.content.pageInfo.totalCount;
      //console.log(data.content);
    });
  }

  pageChanged(pN: number): void {
    this.loadData(pN);
  }

  addPages() {
    this.noticeService.addAnnouncementPage(this.addPage).subscribe(data => {
      this.alertMessage("保存成功");
      this.loadData();
    }, this.handleError);
  }

  deletePage(pageId) {
    //console.log(pageId);
    this.confirm("确定删除该公告？", () => {
      this.noticeService.deleteAnnouncementPage(pageId).subscribe(data => {
        this.loadData();
      });
    });
  }

  setStatus(pageId) {
    let statusInfo = new StatusModel;
    statusInfo.id = pageId;
    statusInfo.status = 'Show';
    this.noticeService.setStatus(statusInfo).subscribe(data => {
      this.alertMessage("成功");
      this.loadData();
    }, this.handleError);
  }

  updataPages() {
    this.noticeService.updateAnnouncementPage(this.updataPage).subscribe(data => {
      this.alertMessage("保存成功");
      this.loadData();
    }, this.handleError);
  }

  Release(status) {
    this.modalShow = false;
    if (this.isEdit) {
      this.updataPage.id = this.updataId;
      this.updataPage.title = this.noticeTitle;
      this.updataPage.content = this.ckeditorContent;
      this.updataPage.status = status;
      this.updataPage.publishTime = '';
      this.updataPages();
      this.isEdit = false;
    } else {
      this.addPage.title = this.noticeTitle;
      this.addPage.content = this.ckeditorContent;
      this.addPage.status = status;
      this.addPage.publishTime = '';
      this.addPages();
    }
  }

  addNotice() {
    this.modalShow = true;
    this.noticeTitle = '';
    this.ckeditorContent = '<p>请输入您所要发布的公告！</p>';
  }

  editNotice(pageId) {
    this.isEdit = true;
    this.noticeService.getAnnouncementPageDetail(pageId).subscribe(data => {
      //console.log(data.content.content);
      this.noticeTitle = data.content.title;
      this.ckeditorContent = data.content.content;
      this.updataId = pageId;
      this.modalShow = true;
    },
    error => {
    });
  }

  Cancel() {
    this.modalShow = false;
    this.isEdit = false;
  }

}
