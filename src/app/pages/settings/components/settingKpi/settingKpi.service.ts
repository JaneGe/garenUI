import { Injectable } from "@angular/core";
@Injectable()
export class SettingKpiService {
    constructor() {
    }
    screenYears = [
        { Id: null, Name: '全部' },
        { Id: 0, Name: '2016' },
        { Id: 1, Name: '2017' },
        { Id: 2, Name: '2018' }
    ];
    screenMonths = [
        { Id: null, Name: '全部' },
        { Id: 0, Name: 'Jan' },
        { Id: 1, Name: 'Feb' },
        { Id: 2, Name: 'Mar' },
        { Id: 3, Name: 'Apr' },
        { Id: 4, Name: 'May' },
        { Id: 5, Name: 'Jun' },
        { Id: 6, Name: 'Jul' },
        { Id: 7, Name: 'Aug' },
        { Id: 8, Name: 'Sep' },
        { Id: 9, Name: 'Oct' },
        { Id: 10, Name: 'Nov' },
        { Id: 11, Name: 'Dec' },
    ];
    timeSpan = [
        { Id: 0, Name: '全部' },
        { Id: 1, Name: '今天' },
        { Id: 2, Name: '昨天' },
        { Id: 3, Name: '7天以内' },
        { Id: 4, Name: '30天以内' },
        { Id: 5, Name: '自定义' }
    ];

    searchTypes = [{ Id: 'ByName', Name: '员工姓名' }, { Id: 'ByWorkNumber', Name: '员工工号' }];


}
