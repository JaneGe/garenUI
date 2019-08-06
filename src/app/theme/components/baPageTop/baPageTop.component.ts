import { Component } from '@angular/core';

import { GlobalState } from '../../../global.state';
import { UserService } from "../../../shared/services/user.service";
import { Router } from '@angular/router';
import { ApiService } from "../../../shared/services/api.service";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
  providers: [UserService, ApiService]
})
export class BaPageTop {

  public avatar: string;

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState, private userService: UserService, private router: Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });


    this.userService.getUsrInfoById().subscribe(d => {
      if (d.content.url === null) {
        this.avatar = 'assets/img/default-avatar.png';
      } else {
        this.avatar = d.content.url;
      }
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public signOut() {
    console.info("signOut");
    this.userService.purgeAuth();
    this.router.navigate(['/login']);
  }

  public userInfo() {
    this.router.navigate(['/pages/settings/userInfo']);
  }

}
