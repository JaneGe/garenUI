import { Component, OnInit } from '@angular/core';

import { BaMsgCenterService, NotificationModel } from './baMsgCenter.service';
import { OrderExceptionService } from "../../../shared/services/orderException-service";
import { OrderManualService } from "../../../pages/orderManual.service";
import { fromEvent } from "rxjs/observable/fromEvent";
import { Observable } from "rxjs/Observable";
import { GlobalState } from 'app/global.state';
@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService, OrderExceptionService],
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter implements OnInit {

  public notifications: Array<NotificationModel>;
  public messages: Array<Object>;
  errorList: Array<NotificationModel> = [];
  constructor(private _baMsgCenterService: BaMsgCenterService,
    private orderExceptionService: OrderExceptionService,
    private orderManualService: OrderManualService,
    private _state: GlobalState
  ) {
    this.notifications = this._baMsgCenterService.getNotifications();
    this.messages = this._baMsgCenterService.getMessages();
  }
  ngOnInit() {
    this.updateErrorList();
    this.orderManualService.getMessage().subscribe(data => {
      console.log('table触发更新异常订单');
      if (data.kill) {
        this.updateErrorList();
      }
    });
    let target = document.getElementById('msg-dd1');
    Observable.fromEvent(target, 'click').debounceTime(1000).subscribe(e => {
      //console.log('clicked');
      let attr = target.getAttribute('aria-expanded').toString();
      //console.log(attr);
      if (attr == 'true') {
        this.updateErrorList();
      }
    })
  }
  updateErrorList() {
    this.orderExceptionService.getAllOrderExceptionCount().subscribe(data => {
      //console.log(data);
      if (data.success) {
        console.log('errorList刷新成功');
        this.errorList = [];
        let temp = [];
        this.notifications.forEach((value, index) => {
          data.content.forEach((value1, index) => {
            if (value1.orderExceptionName == value.exceptionType && value1.orderExceptionCount == 1) {
              this.errorList.push(value);
              temp.push(value1);
            }
          })
        });
        console.log(temp);
      }
    })
  }
  openMenu(menuTitle) {
    this.orderManualService.sendUpdateMenu(menuTitle);
    this._state.notifyDataChanged('menu.activeLink', { title: menuTitle });
  }
}
