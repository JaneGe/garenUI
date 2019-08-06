import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CommonData} from "../../shared/common-data";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  constructor(private routeInfo: ActivatedRoute) { }

  errorItem = [
    { errorText: '无法判断您的权限，请重新登录。', buttonText: '重新登录', routerLink: '/login' },
    { errorText: '无权限访问当前页面！', buttonText: '返回首页', routerLink: '/pages/home' },
    { errorText: '无法访问所需页面，请正确操作！', buttonText: '返回首页', routerLink: '/pages/home', pId: 0 },
  ];

  errorInfo;

  ngOnInit() {
    this.errorInfo = this.errorItem[this.routeInfo.snapshot.params['errorCode']];
  }

}
