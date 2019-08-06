import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fileTrees',
  templateUrl: './fileTrees.component.html',
  styleUrls: ['./fileTrees.component.scss']
})
export class FileTreesComponent implements OnInit {
  @Input() treesItem: Array<any> = [];

  constructor() { }

  ngOnInit() {
    // if (this.treesItem !== []) {
    //   this.treesItem.forEach(element => {
    //     element.toggle = false;
    //   });
    // }
  }

  ngDoCheck() {
    this.checkState(this.treesItem);
  }

  checkState(item) {
    for (let i in item) {
      if (item[i].children) {
        for (let index in item[i].children) {
          this.checkState(item[i].children);
          if (item[i].children[index].isChecked) {
            item[i].isChecked = true;
            break;
          } else {
            item[i].isChecked = false;
          }
        }
      }
    }
  }

  toggleItem(item) {
    item.toggle = !item.toggle;
  }

  CheckChange(item) {
    item.isChecked = !item.isChecked;
    if (item.children) {
      item.children.forEach(index => {
        index.isChecked = !item.isChecked;
        this.CheckChange(index);
      });
    }
  }

  onCheckChanged(item) {
    this.CheckChange(item);
  }

  onRadioChanged(item, index) {
    item.forEach(element => {
      element.isChecked = false;
    });
    item[index].isChecked = true;
  }
}
