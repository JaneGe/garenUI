import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'storagepipe'
})
export class StoragepipePipe implements PipeTransform {

  transform(list:Array<any>,filed:string): any {
    return list.filter(value =>{return value['wareHouseName'].indexOf(filed)!=-1});
  }
}
