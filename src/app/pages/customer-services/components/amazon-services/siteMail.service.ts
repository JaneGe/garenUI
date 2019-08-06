import { Injectable } from "@angular/core";
import { ApiService } from "../../../../shared/services/api.service";
import { Observable } from "rxjs/Observable";
import { EndPointsConfig } from "../../../../shared/Config";
import { ApiResponseBaseModel } from "../../../../shared/models/api.response.basemodel";
import { URLSearchParams } from "@angular/http";
@Injectable()
export class siteMailService {
  constructor(public apiService: ApiService) {
  }

  GetEmailQuery(param: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Email_GetEmailQuery, param);
  }
  GetEmailDetailById(emailId: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('emailId', emailId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Email_GetEmailDetailById, searchParams);
  }
  GetEmailTemplateQuery(pageIndex: number, pageSize: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.EmailTemplate_GetEmailTemplateQuery, searchParams);
  }
  GetEmailTemplateById(templateId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('templateId', templateId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.EmailTemplate_GetEmailTemplateById, searchParams);
  }
  EmailTemplateOperation(template: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.EmailTemplate_EmailTemplateOperation, template);
  }
  EmailTemplateDeleteById(templateId: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('templateId', templateId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.EmailTemplate_EmailTemplateDeleteById, searchParams);
  }
  EmailTemplateEnableById(templateId: any,status:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('templateId', templateId.toString());
    searchParams.set('status', status);
    return this.apiService.get(EndPointsConfig.EndPoints.EmailTemplate_EmailTemplateEnableById, searchParams);
  }

  GetTemplateForEnable(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.EmailTemplate_GetTemplateForEnable);
  }
  GetTemplateByAccount(emailId:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('emailId', emailId);
    return this.apiService.get(EndPointsConfig.EndPoints.EmailTemplate_GetTemplateByAccount,searchParams);
  }
  GetChannelAccount(param: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Shop_Amazon_GetChannelAccount, param);
  }
  SendEmail(param: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Email_SendEmail, param);
  }
  SetEmailReadByIds(emailIds: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Email_SetEmailReadByIds, emailIds);
  }
  SetEmailStarByIds(emailIds: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Email_SetEmailStarByIds, emailIds);
  }
  SetEmailExceptionByIds(emailIds: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Email_SetEmailExceptionByIds, emailIds);
  }
  SetOnlyEmailSeen(emailId: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Email_SetOnlyEmailSeen, emailId);
  }

  SetEmailNoSeenByIds(emailIds: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Email_SetEmailNoSeenByIds, emailIds);
  }
  NoReplySumQuery(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Email_NoReplySumQuery);
  }
  CurrentReplySumQuery(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Email_CurrentReplySumQuery);
  }

  SaveNoteCate(emailId:number,bussinessType:number,note:string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('emailId', emailId.toString());
    searchParams.set('bussinessType', bussinessType.toString());
    searchParams.set('note', note.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Email_SaveNoteCate, searchParams);
  }

  mailTypes = [{ Id: null, Name: '全部' }, { Id: 0, Name: '未查看' }, { Id: 1, Name: '已查看' }, { Id: 3, Name: '星标邮件' }, { Id: 2, Name: '已回复邮件' }, { Id: 4, Name: '异常邮件' }];
  mailDefaultTypes = [{ Id: null, Name: '全部' }, { Id: 0, Name: '订单售前咨询' }, { Id: 1, Name: '订单产品咨询' }, { Id: 3, Name: '订单物流咨询' }, { Id: 2, Name: '退款退货' }, { Id: 4, Name: '系统通知' }, { Id: 5, Name: '无需回复' }, { Id: 6, Name: '其他' }];
  timeSpan = [{ Id: 0, Name: '全部' }, { Id: 1, Name: '今天' }, { Id: 2, Name: '昨天' }, { Id: 3, Name: '7天以内' }, {
    Id: 4,
    Name: '30天以内'
  }, { Id: 5, Name: '自定义' }];

  searchTypes = [{ Id: 1, Name: '发件人' }, { Id: 2, Name: '订单号' }];

  Data = [];

}
