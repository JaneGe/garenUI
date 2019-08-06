import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'receiveRecord'
})
export class ReceiveRecordPipe implements PipeTransform {

  transform(list: any, operator: string): any {
    if(operator=='全部'){return list;}
    else{return list.filter(value =>{return value['operator'].indexOf(operator)!=-1})}
  }
}
