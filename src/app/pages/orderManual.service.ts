import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {OrderExceptionService} from "../shared/services/orderException-service";
@Injectable()
export class OrderManualService{
  private subject = new Subject<any>();
  private updateMenuSubject = new Subject<any>();
  orderException:any;
  constructor(orderExceptionService:OrderExceptionService){
    this.orderException=orderExceptionService;
  }
  sendMessage(mes:{kill:boolean,errType:string}) {
    this.subject.next(mes);
    // this.orderException.getAllOrderExceptionCount().subscribe(data=>{
    //   console.log(data.content);
    //   data.content.forEach(value=>{
    //     if(value.orderExceptionName==exception){
    //       //console.log(value.orderExceptionCount);
    //       if(value.orderExceptionCount==0){
    //
    //       }
    //     }
    //   })
    // });
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  getUpdateMenu(): Observable<any> {
    return this.updateMenuSubject.asObservable();
  }
  sendUpdateMenu(menuTitle){
    this.updateMenuSubject.next(menuTitle);
  }
}
export class orderErrorList{
  NeedManualAudit:number=0;
  OrderExpired:number=0;
  AddressInvalid:number=0;
  NeedTrcukNumber:number=0;
  ItemNoMapSku:number=0;
  DeclarationMissed:number=0;
  WarehouseAllocateFailed:number=0;
  CalcShippingFeeFaile:number=0;
  LowProfitAudit:number=0;
  OutOfStock:number=0;
  TrackingNumberFectchFailed:number=0;
  Failed:number=0;
  ConsolidateOrders:number=0;
  NeedMerge:number=0;
}
