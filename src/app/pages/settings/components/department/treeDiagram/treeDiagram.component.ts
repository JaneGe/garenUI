import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentModalComponent } from '../department/department-modal.component';

@Component({
  selector: 'tree-diagram',
  templateUrl: './treeDiagram.component.html',
  styleUrls: ['./treeDiagram.component.scss']
})

export class TreeDiagramComponent implements OnInit {
  @Input() treesItem: any;

  @Output() _getTreesState = new EventEmitter<boolean>();


  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openEditDepartmentModal(departmentId: number) {
    const activeModal = this.modalService.open(DepartmentModalComponent,
      { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.modalHeader = '查看部门详情';
    activeModal.componentInstance.departmentId = departmentId;
    activeModal.result.then((result) => {
      if (result === 1) {
        this.getTreesState(true);
      }
    }, (reason) => {
      console.info(`Dismissed ${reason}`);
    });
  }

  getTreesState(item) {
    this._getTreesState.emit(item);
  }
}
