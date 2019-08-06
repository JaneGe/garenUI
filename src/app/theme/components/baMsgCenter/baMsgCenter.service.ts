import {Injectable} from '@angular/core'

@Injectable()
export class BaMsgCenterService {

  private _notifications:Array<NotificationModel> = [
    {
      number:33,
      exceptionType:'NeedManualAudit',
      text:'需人工审核',
      link:'needmanual',
      pid:18
    },
    {
      number:33,
      exceptionType:'OrderExpired',
      text:'有超期风险',
      link:'outtimerisk',
      pid:19
    },
    {
      number:33,
      exceptionType:'AddressInvalid',
      text:'收货信息不全',
      link:'lossinfo',
      pid:20
    },
    {
      number:33,
      exceptionType:'NeedTrcukNumber',
      text:'需跟踪号',
      link:'needtracenum',
      pid:21
    },
    {
      number:33,
      exceptionType:'ItemNoMapSku',
      text:'商品关联失败',
      link:'nosku',
      pid:22
    },
    {
      number:33,
      exceptionType:'DeclarationMissed',
      text:'报关信息缺失',
      link:'lossedcustoms',
      pid:23
    },
    {
      number:33,
      exceptionType:'WarehouseAllocateFailed',
      text:'分配失败',
      link:'failedallocate',
      pid:24
    },
    {
      number:33,
      exceptionType:'CalcShippingFeeFaile',
      text:'运费计算失败',
      link:'failedfreight',
      pid:25
    },
    {
      number:33,
      exceptionType:'LowProfitAudit',
      text:'订单利润过低',
      link:'lowprofit',
      pid:26
    },
    {
      number:33,
      exceptionType:'OutOfStock',
      text:'缺货',
      link:'nostorage',
      pid:27
    },
    {
      number:33,
      exceptionType:'TrackingNumberFectchFailed',
      text:'物流异常',
      link:'errorlogistics',
      pid:28
    },
    {
      number:33,
      exceptionType:'Failed',
      text:'回传失败',
      link:'failedback',
      pid:29
    },
    {
      number:33,
      exceptionType:'NeedMerge',
      text:'合并订单',
      link:'mergeorder',
      pid:30
    },
    {
      number:33,
      exceptionType:'ShipmentsFailed',
      text:'仓库取消发货',
      link:'canceldeliver',
      pid:31
    },
    {
      number:33,
      exceptionType:'ManualFeedBack',
      text:'需人工回传',
      link:'manualFeedBack',
      pid:98
    },
  ];

  private _messages = [
    {
      name: 'Nasta',
      text: 'After you get up and running, you can place Font Awesome icons just about...',
      time: '1 min ago'
    },
    {
      name: 'Vlad',
      text: 'You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.',
      time: '2 hrs ago'
    }
  ];

  public getMessages():Array<Object> {
    return this._messages;
  }

  public getNotifications():Array<NotificationModel> {
    return this._notifications;
  }
}
export class NotificationModel{
  number:number;
  exceptionType:string;
  text:string;
  link:string;
  pid:number;
}
