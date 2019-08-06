import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  
  constructor(private printModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.printModal.close();
  }

}
