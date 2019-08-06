import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OptionsService} from "../../options.Service";
import {RootComponent} from "../../../../shared/component/root.component";
import {SiteConst} from "../../../../shared/services/site-const";

@Component({
  selector: 'app-limitingPlatform',
  templateUrl: './limitingPlatform.component.html',
  styleUrls: ['./limitingPlatform.component.scss','../../public.scss']
})
export class LimitingPlatformComponent extends RootComponent implements OnInit {
  Platforms: any[] = [];

  @Input()
  modalHeader: string;

  @Input()
  seletedPlatform: string = null;
  constructor(private activeModal:NgbActiveModal) {
    super();
    this.Platforms = SiteConst.supportChannelTypes;
  }
  ngOnInit() {
    console.info(this.seletedPlatform);
  }
  closeModal(val?: any) {
    this.activeModal.close(val);
  }
}
