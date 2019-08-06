import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as $ from 'jquery';

@Component({
  selector: 'app-noticeModal',
  templateUrl: './noticeModal.component.html',
  styleUrls: ['./noticeModal.component.scss']
})
export class NoticeModalComponent implements OnInit {
  @Input()
  noticeInfo;
  constructor(private noticeModal: NgbActiveModal,) { }

  ngOnInit() {
    console.log(this.noticeInfo);
    $('.content').append(this.noticeInfo.content);
    console.log($('.content'));
    
  }
  
  closeModal() {
    this.noticeModal.close();
  }
}