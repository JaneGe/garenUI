import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService
{
  StorageData = [
    {
      name:'东莞仓库',
      tel:'123',
      email:'123@qq.com',
      postcode:'5555',
      Eaddress:'london',
      remark:'随便备注一下',
      from:'本地仓',
      status:'正常'
    },
    {
      name:'深圳仓库',
      tel:'456',
      email:'456@qq.com',
      postcode:'777775',
      Eaddress:'shenzhen',
      remark:'这里也随便备注一下',
      from:'外地仓库',
      status:'正常'
    }
    ];
  constructor(){}
}
