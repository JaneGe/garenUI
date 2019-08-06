import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { GlobalState } from 'app/global.state';

@Component({
  selector: 'ba-menu-item',
  templateUrl: './baMenuItem.html',
  styleUrls: ['./baMenuItem.scss']
})
export class BaMenuItem {
  @Input()  menuItem: any;
  @Input() child: boolean = false;
  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  @Input() hasPurchase: boolean;
  public onHoverItem($event, item): void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event, item): boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }

  constructor(private _state: GlobalState) {
  }
  getPath(item) {
    item.selected = true;
    if(item.route.id==49){
      window.open('http://demarkt.iok.la:18012','blank');
    }
    this._state.notifyDataChanged('menu.activeLink', item);
    /* this._state.subscribe('menu.activeLink', (activeLink) => {
    }); */
  }
}
