import { Component, OnInit } from '@angular/core';
import {NoticeService} from "../../../shared/services/notice.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NoticeModalComponent} from "../modals/noticeModal/noticeModal.component";

@Component({
  selector: 'app-storage-employee',
  templateUrl: './storage-employee.component.html',
  styleUrls: ['../todo.scss', '../public.scss','./storage-employee.component.scss']
})
export class StorageEmployeeComponent implements OnInit {
  noticeList:any;
  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.noticeService.getAnnouncementPageList(1, 15, 'Show').subscribe(data => {
      this.noticeList = data.content.items;
      // console.log(this.noticeList);
    });
  }
  openNoticeModal(i) {
    this.noticeService.getAnnouncementPageDetail(i).subscribe(data => {
        const activeModal = this.modalService.open(NoticeModalComponent,{ size: 'lg', backdrop: 'static' });
        activeModal.componentInstance.noticeInfo = data.content;
        activeModal.result.then((result) => {
        }, (reason) => {
          console.info(`Dismissed ${reason}`);
        });
      },
      error => {

      });
  }
}
