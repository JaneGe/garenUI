import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-productEdit',
  templateUrl: './productEdit.component.html',
  styleUrls: ['./productEdit.component.scss'],
})
export class ProductEditComponent implements OnInit{
  Url:string;
  sku:string;
  title:string;
  Data= {id:1,url:'',sku:'',title:'',imgs:[
      {src:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1410690053,1513032913&fm=27&gp=0.jpg',resolution:'800*800'},
      {src:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1410690053,1513032913&fm=27&gp=0.jpg',resolution:'800*800'},
      {src:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1410690053,1513032913&fm=27&gp=0.jpg',resolution:'800*800'},
      {src:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1410690053,1513032913&fm=27&gp=0.jpg',resolution:'800*800'},
      {src:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1410690053,1513032913&fm=27&gp=0.jpg',resolution:'800*800'},
      ],
    attrs:[
      {id:1,text:'20*10cm;红色'},
      {id:2,text:'20*10cm;黄色'},
      {id:3,text:'20*10cm;绿色'},
      {id:4,text:'20*15cm;红色'},
    ],
  };
  constructor(private activeModal:NgbActiveModal){}
  ngOnInit(){
  }
  closeModal(){
    this.activeModal.close();
  }
  delAttr(id){
    let index=this.Data.attrs.findIndex(v=>v.id==id);
    if(index!=-1){
      this.Data.attrs.splice(index,1);
    }
  }
  transfer(){
    let str=this.title.toString().split(/\s+/);
    str.forEach((v,index)=>{
      str[index]=str[index][0].toUpperCase()+str[index].substring(1);
    });
    this.title=str.join(" ");
    console.log(str)
  }
}
