import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, args:{arrowdown:boolean,key:string}): any {
    if(!args.arrowdown){
      return  this.arrowupvaluesort(value,args.key);
    }
    else{
      return this.arrowdownvaluesort(value,args.key);
    }
  }
  arrowdownvaluesort(value:Array<any>,key:string){
    value.sort((a,b)=>{
      if(a[key]>b[key]){
        return 1;
      }
      else if(a[key]<b[key]){
        return -1;
      }
      return 0;
    });
    return value;
  }
  arrowupvaluesort(value:Array<any>,key:string){
    value.sort((a,b)=>{
      if(a[key]<b[key]){
        return 11;
      }
      else if(a[key]>b[key]){
        return -1;
      }
      return 0;
    });
    return value;
  }
}
