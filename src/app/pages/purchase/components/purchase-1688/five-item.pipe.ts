import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fiveItem'
})
export class FiveItemPipe implements PipeTransform {

  transform(array: any): any {
    if(array.length!=0){
      let fiveItem:Array<any>=[];
      for(var i=0;i<5;i++){
        if(array[i]!=undefined)
        fiveItem.push(array[i]);
      }
      return fiveItem;
    }
    else{
      return array;
    }
  }

}
