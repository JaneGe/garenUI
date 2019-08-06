import { Component } from '@angular/core';

import { GlobalState } from '../../../global.state';
import { AuthorityComponent } from 'app/shared/component/authority.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop extends AuthorityComponent {

  public activePageTitle: string = '';
  public activePageDesc: string = '';

  constructor(private _state: GlobalState, public activerouter: ActivatedRoute, public router: Router) {
    super(activerouter, router);
    
    if (this.PAGE_CURRENTOPEATIONS) {
      this.activePageTitle = this.PAGE_CURRENTOPEATIONS.title;
    }

    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.title;
        this.activePageDesc = activeLink.desc;
      }
    });
  }
}
