import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-updating-system',
  templateUrl: './updating-system.component.html',
  styleUrls: ['./updating-system.component.scss'],
})
export class UpdatingSystemComponent implements OnInit{
  expectedDay:Date=new Date(2018,1,2);
  LeftTime:string;
  constructor(){
  }
  ngOnInit(){
    window.setInterval(()=>{
      let now=new Date();
      let nowtime=now.getTime();
      let expectedtiem=this.expectedDay.getTime();
      let leftTime=expectedtiem-nowtime;
      let d=0, h=0, m=0, s=0;
      if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
      }
      this.LeftTime=`${d}天:${h}时:${m}分:${s}秒`;
      console.log(1);
    },1000);
    $('#content').css({width:0,height:'8px'}).animate({
      width:'600px'
    },1000,function () {
      $(this).animate({
        height:'300px'
      },1000)
    });
  }
}
