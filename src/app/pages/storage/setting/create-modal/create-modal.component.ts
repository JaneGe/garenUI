import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss', '../../public.scss']
})
export class CreateModalComponent implements OnInit {

  @Input()
  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    document.getElementById("name").focus();
  }
  closeModal() {
    this.activeModal.close();
  }
}
