import { Injectable } from "@angular/core";

@Injectable()
export class DataService {
  constructor() {
  }

  warehouse = [{ Id: 0, Name: '全部' }, { Id: 1, Name: '东莞' }, { Id: 2, Name: '深圳' }];
  planStatuss = [{ Id: 20, Name: '全部' }, { Id: 0, Name: '异常件' }, { Id: 1, Name: '已完成' }];
  timeChoose = ["创建时间", "完成时间"];
  timeSpan = [{ Id: 0, Name: '全部' }, { Id: 1, Name: '今天' }, { Id: 2, Name: '昨天' }, { Id: 3, Name: '7天以内' }, {
    Id: 4,
    Name: '30天以内'
  }, { Id: 5, Name: '自定义' }];

  Data = [
    { id: 16, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已创建' },
    { id: 15, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已完成' },
    { id: 14, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已创建' },
    { id: 13, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已完成' },
    { id: 12, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已创建' },
    { id: 11, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已创建' },
    { id: 10, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已完成' },
    { id: 9, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已创建' },
    { id: 8, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已完成' },
    { id: 7, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已创建' },
    { id: 6, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已完成' },
    { id: 5, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已完成' },
    { id: 4, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已创建' },
    { id: 3, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已完成' },
    { id: 2, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已创建' },
    { id: 1, rack: 'M061207', startTime: '2017/9/26 上午7:28:30', endTime: '2017/9/26 上午9:28:30', state: '已创建' },
  ];

}
