import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OptionsService} from "../../options.Service";
import {RootComponent} from "../../../../shared/component/root.component";

@Component({
  selector: 'app-limitingattr',
  templateUrl: './limitingattr.component.html',
  styleUrls: ['./limitingattr.component.scss','../../public.scss']
})
export class limitingattrComponent extends RootComponent implements OnInit {
  Attrs:Array<any>=[];
  @Input()
  selectedAttrs:Array<any>=[];
  modalHeader: string = "";
  selectAttrsId:Array<any>=[];
  constructor(private activeModal:NgbActiveModal,
              private _optionsService:OptionsService) {
    super();
    this.Attrs=_optionsService.Attrs;
  }
  ngOnInit() {

  }
  closeModal() {
    this.activeModal.close();
  }
  OnSubmit(){
    this.activeModal.close(this.selectedAttrs);
  }
  selectAttr(selectedItem:any){
    let index=this.selectedAttrs.indexOf(selectedItem);
    // console.log(selectedItem);
    // console.log(index);
    if(index==-1){
      this.selectedAttrs.push(selectedItem);
    }
    else{
      this.selectedAttrs.splice(index,1);
    }
  }
}
