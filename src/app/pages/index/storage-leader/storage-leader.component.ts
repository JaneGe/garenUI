import { Component, OnInit } from '@angular/core';
import {BossDataService} from "../indexboss/bossData.service";

@Component({
  selector: 'app-storage-leader',
  templateUrl: './storage-leader.component.html',
  styleUrls: ['../todo.scss', '../public.scss','./storage-leader.component.scss']
})
export class StorageLeaderComponent implements OnInit {
  yesterdayAchievement:Array<any>;
  storagePeopleData:Array<any>;
  storageWork:Array<any>;
  pickUp:Array<any>;
  Time:any=new Date().toLocaleString();
  constructor(private bossData:BossDataService,) {
    this.yesterdayAchievement=this.bossData.yesterdayAchievement;
    this.storagePeopleData=this.bossData.storagePeopleData;
    this.storageWork=this.bossData.storageWork;
    this.pickUp=this.bossData.pickUp;
  }

  ngOnInit() {
  }

}
