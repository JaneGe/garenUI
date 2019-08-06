import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as Slide from '../../../../../shared/animations/modal-Slide';
import {RootComponent} from "../../../../../shared/component/root.component";

@Component({
  selector: 'app-import-supplier',
  templateUrl: './import-supplier.component.html',
  styleUrls: ['../modal-public.scss','./import-supplier.component.scss']
})
export class ImportSupplierComponent extends RootComponent implements OnInit {
  node:any;
  text:any;
  modalHeader:string='';

  constructor(private activeModal:NgbActiveModal) { super();}

  ngOnInit() {
    this.node=document.getElementById("form").parentNode.parentNode.parentNode;
    Slide.slideIn(this.node,"sm");
  }
  InputFile(){
    var input=$('#input');
    $(input).change(()=>{
      if($(input).val()!=''){
        var file=$(input).val().split('\\');
        var fileType=$(input).val().split('.');
        var filename=file[file.length-1];
        var fileTypename=fileType[fileType.length-1];
        if(fileTypename!='xls'){
          this.error("请上传xls格式的文件！");
          $(input).val('');
        }
        else{$('.text').html(filename);}
      }
      else{$('.text').html('');}
    })
  }
  closeModal(){
    Slide.slideLeft(this.node,this,"sm");
  }
  Onsubmit(){
    Slide.slideRight(this.node,this,'',"sm");
  }

}
