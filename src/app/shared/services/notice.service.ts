import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { EndPointsConfig } from "../Config";
import { ApiResponseBaseModel } from "../models/api.response.basemodel";
import { NoticeModel, UpdataModel, StatusModel } from "../models/notice/notice.model";
import { URLSearchParams } from '@angular/http';
import { ApiPageList } from 'app/shared/models/page-list.model';
@Injectable()
export class NoticeService {

  constructor(public apiService: ApiService) {

  }

  getAnnouncementPageList(pageNumber: number, pageSize: number, status:string):
                          Observable<ApiResponseBaseModel<ApiPageList<any>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    let searchParams = new URLSearchParams();
    searchParams.set('status', status);
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Announcement_Page_List, searchParams);

  }

  getAnnouncementPageDetail(pageId: number): Observable<ApiResponseBaseModel<any>> {

    let searchParams = new URLSearchParams();
    searchParams.set('id', pageId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Announcement_Page_Detail, searchParams);

  }

  addAnnouncementPage(noticeInfo: NoticeModel): Observable<ApiResponseBaseModel<any>> {
    const data = {
      title: noticeInfo.title,
      content:noticeInfo.content,
      status:noticeInfo.status,
      publishTime:noticeInfo.publishTime,
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Announcement_Page_Add, data);
  }

  deleteAnnouncementPage(pageId: number): Observable<ApiResponseBaseModel<any>> {

    let deleteParams = new URLSearchParams();
    deleteParams.set('id', pageId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Announcement_Page_Delete, null, deleteParams);

  }

  updateAnnouncementPage(updataInfo: UpdataModel): Observable<ApiResponseBaseModel<any>> {
    const data = {
        id: updataInfo.id,
        title: updataInfo.title,
        content:updataInfo.content,
        status:updataInfo.status,
        publishTime:updataInfo.publishTime,
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Announcement_Page_Update, data);
  }

  setStatus(StatusInfo: StatusModel): Observable<ApiResponseBaseModel<any>> {
    const data = {
        id: StatusInfo.id,
        status:StatusInfo.status,
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Announcement_Page_SetStatus, data);
  }

}
