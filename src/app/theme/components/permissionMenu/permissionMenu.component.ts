import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'app/shared/services/global.service';

@Component({
  selector: 'permission-menu',
  templateUrl: './permissionMenu.component.html',
  styleUrls: ['./permissionMenu.component.scss'],
  providers: []
})
export class PermissionMenuComponent {
  @Input() treesItem: Array<any> = [];

  @Input() sidebarToggle;
  constructor(public _globalService: GlobalService) { }

  ngOnChanges() {
    this.treesItem.forEach(element => {
      element.isTarget = false;
      this.toggleItem(this.treesItem[0]);
    });
  }
  
  toggleItem(item) {
    this.treesItem.forEach(element => {
      element.isTarget = false;
    });
    item.isTarget = true;
    this._globalService._permission(item);
  }

}
