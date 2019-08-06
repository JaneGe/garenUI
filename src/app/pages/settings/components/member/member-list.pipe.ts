import { Pipe, PipeTransform } from '@angular/core';
import {isString} from "@ng-bootstrap/ng-bootstrap/util/util";
import {isArray} from "rxjs/util/isArray";
import {isEmpty} from "ng2-tree/src/utils/fn.utils";

@Pipe({
  name: 'memberListFilter'
})
export class MemberListPipe implements PipeTransform {
  // transform(list:any[],filed:any,keyword:string,getroles:string[]): any {
  //  if(filed==''&&keyword==''&&isEmpty(getroles)){
  //    console.log("没有筛选条件");
  //    return list;
  //  }
  //  if(filed!==''&&keyword!==''){
  //    return list.filter(function (value) {
  //      let filedValue=value[filed];
  //      return filedValue.indexOf(keyword)>=0;
  //    })
  //  }
  //  if(getroles.length>0&&filed==''){
  //    console.log("开始角色筛选");
  //  }
  // }
  transform(list:any,filed:string): any {
    if(filed=='all'){
      return list;
    }
    if(filed=='on'){
      return list.filter(value =>{return value['status'].indexOf('Actived')>=0});
    }
    else{
      return list.filter(value =>{return value['status'].indexOf('Disabled')>=0});
    }
  }
}
