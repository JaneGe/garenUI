import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'statuspipe'
})
export class StatuspipePipe implements PipeTransform {


  transform(list:Array<any>,filed:string): any {
   if(filed=='all'){
     return list;
   }
   if(filed=='on'){
     return list.filter(value =>{return value['status'].indexOf('已启用')!=-1});
   }
   else if(filed=='off'){
     return list.filter(value =>{return value['status'].indexOf('已停用')!=-1});
   }
  }
}
