export class TaskService{
  taskArray:Array<any>=[
    {packageNum:'123',
      skus:[
        {id:'1',skuCode:'abc',num:'5',place:'A30-B12'},
        {id:'2',skuCode:'def',num:'1',place:'A30-B12'},
        {id:'3',skuCode:'ghi',num:'2',place:'A30-B12'},
        {id:'4',skuCode:'jkl',num:'6',place:'A30-B12'},
        {id:'5',skuCode:'jkl',num:'6',place:'A30-B12'},
        {id:'6',skuCode:'jkl',num:'6',place:'A30-B12'},
        {id:'7',skuCode:'jkl',num:'6',place:'A30-B12'},
      ]
    },
    {packageNum:'456',
      skus:[
        {id:'1',skuCode:'mno',num:'5',place:'A30-B12'},
        {id:'2',skuCode:'rst',num:'1',place:'A30-B12'},
        {id:'3',skuCode:'uvw',num:'2',place:'A30-B12'},
        {id:'4',skuCode:'xyz',num:'6',place:'A30-B12'},
        {id:'5',skuCode:'xyz',num:'6',place:'A30-B12'},
        {id:'6',skuCode:'xyz',num:'6',place:'A30-B12'},
      ]
    },
  ];
  getAllSku(){
    let skus=[];
    this.taskArray.forEach(value => {
      value.skus.forEach(value2=>{
        if(skus.findIndex(value3 => value3.skuCode==value2.skuCode)==-1){  //去除重复的sku
          skus.push({skuCode:value2.skuCode,place:value2.place});
        }
      })
    });
    return  skus;
  }
}
