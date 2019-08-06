import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {PickingService} from "../../../../shared/services/picking.service";

@Component({
  selector: 'app-taskEdit',
  templateUrl: './taskEdit.component.html',
  styleUrls: ['./taskEdit.component.scss'],
  providers: [PickingService]
})

export class TaskEditComponent implements OnInit {
  empName = [];
  selectValue:string='';
  pickId:number=0;

  constructor(private pickingService: PickingService,private editModal: NgbActiveModal) {}

  ngOnInit() {
  }

  closeModal() {
    this.editModal.close();
  }
  Save()  {
    this.pickingService.UpdatePickTask(this.pickId,this.selectValue).subscribe(data => {
      this.closeModal();
    });
  }
  onValueChanged(data: { value: string }) {
    this.selectValue = data.value;
  }
}
