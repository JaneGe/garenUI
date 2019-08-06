import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { NoticeService } from 'app/shared/services/notice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticeModalComponent } from 'app/pages/index/modals/noticeModal/noticeModal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NoticeService]
})
export class HomeComponent implements OnInit {
  homeData = new homeDataClass;
  noticeList: any;

  constructor(private _homeService: HomeService,
    private noticeService: NoticeService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this._homeService.getJSON().subscribe(data => {
      this.homeData.content = data.content;
      this.homeData.dateline = data.dateline;
      this.homeData.note = data.note;
      this.homeData.picture2 = data.picture2;
    });
    this.loadNote();
  }

  loadNote() {
    this.noticeService.getAnnouncementPageList(1, 15, 'Show').subscribe(data => {
      this.noticeList = data.content.items;
    });
  }

  openNoticeModal(i) {
    this.noticeService.getAnnouncementPageDetail(i).subscribe(data => {
      const activeModal = this.modalService.open(NoticeModalComponent, { size: 'lg', backdrop: 'static' });
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


export class homeDataClass {
  content: string;
  dateline: string;
  note: string;
  picture2: string;
}