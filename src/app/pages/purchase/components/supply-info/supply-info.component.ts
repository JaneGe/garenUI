import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-supply-info',
  templateUrl: './supply-info.component.html',
  styleUrls: ['../public.scss','./supply-info.component.scss']
})
export class SupplyInfoComponent implements OnInit {
  togglepage:number=1;
  constructor() {}
  ngOnInit() {
  }
  togglePage(val:any){
    this.togglepage=val;
  }
}
