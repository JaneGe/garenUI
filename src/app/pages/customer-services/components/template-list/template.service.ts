import { Injectable } from "@angular/core";
import { ApiService } from "../../../../shared/services/api.service";
import { Observable } from "rxjs/Observable";
import { EndPointsConfig } from "../../../../shared/Config";
import { ApiResponseBaseModel } from "../../../../shared/models/api.response.basemodel";
import { URLSearchParams } from "@angular/http";
@Injectable()
export class templateService {
  constructor(public apiService: ApiService) { }

  platform = [{ Id: null, Name: '全部' }, { Id: 1, Name: 'Amazon' }]
  statusInt = [{ Id: null, Name: '全部' }, { Id: 0, Name: '未启用' }, { Id: 1, Name: '已启用' }]
  language = [{ Id: null, Name: '全部' }, { Id: 1, Name: '英语' }, { Id: 2, Name: '意大利' }, { Id: 3, Name: '德语' }, { Id: 4, Name: '法语' }, { Id: 5, Name: '西班牙语' }, { Id: 6, Name: '日语' }];
  timeChoose = [{ Id: 1, Name: '添加时间' }, { Id: 2, Name: '修改时间' }];
  timeSpan = [{ Id: null, Name: '全部' }, { Id: 1, Name: '今天' }, { Id: 2, Name: '昨天' }, { Id: 3, Name: '7天以内' }, {
    Id: 4,
    Name: '30天以内'
  }, { Id: 5, Name: '自定义' }];
  searchTypes = [{ Id: 1, Name: '模板名称' }, { Id: 2, Name: '账号' }, { Id: 3, Name: '添加人' }, { Id: 4, Name: '修改人' }];

  data = [
    {
      platform: 'Amazon',
      account: 'sx6c0nh0df8l24y@marketplace.amazon.es',
      name: '删除差评、包裹丢失',
      language: '英语',
      creatTime: '2018-02-02 12:20:05',
      editTime: '2018-02-02 18:20:05',
      creatPerson: '张周三',
      editPerson: '张周三'
    }
  ];

  getEmailTemplateAdvQuery(param: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Email_GetEmailTemplateAdvQuery, param);

  }
  EmailTemplateDeleteById(templateId: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('templateId', templateId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.EmailTemplate_EmailTemplateDeleteById, searchParams);
  }
  EmailTemplateEnableById(templateId: any, status: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('templateId', templateId.toString());
    searchParams.set('status', status);
    return this.apiService.get(EndPointsConfig.EndPoints.EmailTemplate_EmailTemplateEnableById, searchParams);
  }
}
