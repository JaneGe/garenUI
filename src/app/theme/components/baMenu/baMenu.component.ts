import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { BaMenuService } from '../../services';
import { GlobalState } from '../../../global.state';

import { MessageService } from 'app/message.service';
import { PurchaseOrder1688Service } from 'app/pages/purchase/components/purchase-1688/purchase-1688.service';
import {MenuCollapseService} from "../../menu-collapse.service";
@Component({
  selector: 'ba-menu',
  templateUrl: './baMenu.html',
  styleUrls: ['./baMenu.scss'],
  providers: [PurchaseOrder1688Service]
})
export class BaMenu implements OnDestroy {

  @Input() sidebarCollapsed: boolean = false;
  @Input() menuHeight: number;

  @Output() expandMenu = new EventEmitter<any>();

  public menuItems: any[];
  protected _menuItemsSub: Subscription;
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  protected _onRouteChange: Subscription;
  public outOfArea: number = -200;


  public ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
    if(this._onRouteChange) {
      this._onRouteChange.unsubscribe();
    }
    if(this._menuItemsSub) {
      this._menuItemsSub.unsubscribe();
    }

  }

  message: boolean = false;
  subscription: Subscription;

  constructor(private _router: Router,
    private _service: BaMenuService,
    private _state: GlobalState,
    private messageService: MessageService,
    private purchaseOrderService: PurchaseOrder1688Service,
    private menuCollapseService:MenuCollapseService ) {
    this.subscription = this.messageService.getMessage()
      .subscribe(message => {
        this.message = message;
      });
    this.loadStoreQuery();

  }

  loadStoreQuery() {
    this.purchaseOrderService.GetStorageData().subscribe(data => {
      for (let c of data.content) {
        if (c.ishasImportant) {
          this.message = true;
        }
      }
    });
  }

  public updateMenu(newMenuItems) {
    this.menuItems = newMenuItems;
    this.selectMenuAndNotify();
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      //this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
  }

  public ngOnInit(): void {
    this._onRouteChange = this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });

    this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));
  }

  public hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
  }

  public toggleSubMenu($event): boolean {
    let submenu = jQuery($event.currentTarget).next();
    let targetBar=jQuery($event.currentTarget).children('span').text();
    let statu=$event.item.expanded;
    this.menuCollapseService.sendMessage({targetBar:targetBar,statu:statu});
    // console.log(jQuery($event.currentTarget).children('span').text());
    // console.log($event.item.expanded);
    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle();
    }

    return false;
  }
}
