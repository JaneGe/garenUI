import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BrowerSupplierComponent} from "../modals/brower-supplier/brower-supplier.component";
import {EditSupplierComponent} from "../modals/edit-supplier/edit-supplier.component";
import {RootComponent} from "../../../../shared/component/root.component";
import {ImportSupplierComponent} from "../modals/import-supplier/import-supplier.component";
import {CommonOptionModel} from "../../../../shared/services/site-const";
import {SupplierService} from "../../../../shared/services/supplier-service";

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['../public.scss', './supplier-list.component.scss'],
  providers:[SupplierService]
})

export class SupplierListComponent extends RootComponent implements OnInit {
  pageSize: number = 20;
  totalCount: number = 0;
  pageIndex: number = 0;
  status: CommonOptionModel[] = [{text: "全部", value: ""}, {text: "可用", value: "true"}, {text: "停用", value: "false"}];
  selectedstatu: string = '';
  searchTypes: CommonOptionModel[]  =  [{text: "供应商名称", value: "ByName"}, {text: "联系人", value: "ByContactName"},
                  {text: "联系电话", value: "ByPhone"}, {text: "Email", value: "ByEmail"}];
  selectedSearchType: string = 'ByName';
  selectedThisPage: boolean = false;
  selectedSigleid: Array<any> = [];  //单个勾选的id
  supplierInfo: Array<any> = [];
  filterIsActive?: string = null;
  searchText: string = '';

  selectSupplierIds: number[] = [];

  // PageInfo:{pageIndex:number,pageSize:number,totalCount:number}={pageIndex:0,pageSize:10,totalCount:0};
  pageNumber:number;

  constructor(private ModalService: NgbModal,
              private supplierService: SupplierService) {
    super();
  }

  ngOnInit() {
    this.loadData();

  }

  pageChanged(pn: number) {
    $('html, body').animate({ scrollTop: 0 }, 0);
    this.loadData(pn);
  }

  loadData(pageIndex: number = 1) {
    this.selectSupplierIds = [];
     this.supplierService.getPageList(this.selectedstatu, this.searchText, this.selectedSearchType,
                  pageIndex, this.pageSize).subscribe(data => {
                   this.supplierInfo = data.content.items;
                   const pageInfo = data.content.pageInfo;
                   this.pageIndex = pageInfo.pageIndex + 1;
                   this.pageSize = pageInfo.pageSize;
                   this.totalCount = pageInfo.totalCount;

     });
  }

  doSearch() {
    this.loadData();
  }
  enterEvent(value:any) {
    if(value==13)
    {
      this.loadData();
    }
  }

  onCheckAllOrderChanged(checked: boolean) {
    if (checked) {
      this.selectSupplierIds = [];
      for (let o of this.supplierInfo) {
        this.selectSupplierIds.push(o.id);
      }
    }
    else {
      this.selectSupplierIds = [];
     // this.isCheckAllPages = false;
    }
    console.info(this.selectSupplierIds);
  }
  onCheckOrderChanged(isChecked: boolean, supplierId: number) {
    if (isChecked) {
      const orderIndex = this.selectSupplierIds.indexOf(supplierId);
      if (orderIndex >= 0) {
        return;
      }
      else {
        this.selectSupplierIds.push(supplierId);
      }
    }
    else {
      const orderIndex = this.selectSupplierIds.indexOf(supplierId);
      if (orderIndex >= 0) {
        this.selectSupplierIds.splice(orderIndex, 1);
      }
    //  this.isCheckAllPages = false;
    }
  }


  tolast(){
    let s;
    if( this.totalCount%this.pageSize==0){
       s=this.totalCount/this.pageSize;
    }
    else{
       s=(this.totalCount/this.pageSize)+1;
    }
     this.pageNumber=s^0;
   // this.loadData(this.pageNumber);
    return  this.pageNumber;

  }

  finalpage()
  {
    this.tolast();
    this.loadData(this.pageNumber);
  }

  topage(val: any) {
    this.tolast();
if(val>this.pageNumber)
{
  this.error("大于了总页数！");
  return;
}
    var r = /^\+?[1-9][0-9]*$/;
    if (r.test(val)) {
      this.pageIndex = val;
      this.loadData(this.pageIndex);
    }
    else {
      this.error("请输入正整数！");
    }
  }



  selectStatu(val: any) {
    this.selectedstatu = val;
    this.loadData();
  }

  selectsearchKind(val: any) {
    this.selectedSearchType = val;
  }

  SelectedThisPage() {     //选择本页checkbox
    this.selectedThisPage = this.selected(this.selectedThisPage);
    if (this.selectedThisPage) {
      var thisPageInfo = [];    //获取本页供应商名称
      $('#table tr:gt(0)').each(function () {
        var tr = $(this);
        var tdInfo = tr.find('td').eq(1).text();
        thisPageInfo.push(tdInfo);
      });
      var selectedThisPageid = [];
      this.supplierInfo.forEach((value) => {
        thisPageInfo.forEach(value2 => {
          if (value2 == value.name) {
            selectedThisPageid.push(value.id);
          }
        })
      });
      this.selectedSigleid = selectedThisPageid;
    }
    else {
      this.selectedSigleid = [];
    }
  }

  selectSigle(id: any) {    //选择单个checkbox
    let index = this.selectedSigleid.indexOf(id);
    if (index != -1) {
      this.selectedSigleid.splice(index, 1)
    }
    else {
      this.selectedSigleid.push(id)
    }
    // console.log(this.selectedSigleid);
  }

  selected(select: boolean) {
    if (select == false) {
      select = true;
    }
    else {
      select = false
    }
    return select;
  }

  TurnDead() {
    // this.toggelStatu(this.supplierInfo, this.selectedSigleid, '禁用');
    if(this.selectSupplierIds== null || this.selectSupplierIds.length == 0)
    {
      this.error("请选择供应商!");
      return;
    }
    this.confirm("确定启用？", () => {

      this.supplierService.supplierTurnDead(
        this.selectSupplierIds
      ).subscribe(data => {
        this.alertMessage("禁用成功!");
        this.loadData();
      }, this.handleError);

    });
  }

  TurnOn() {
    // this.toggelStatu(this.supplierInfo, this.selectedSigleid, '启用');
    if(this.selectSupplierIds== null || this.selectSupplierIds.length == 0)
    {
      this.error("请选择供应商!");
      return;
    }
    this.confirm("确定启用？", () => {

      this.supplierService.supplierTurnOn(
        this.selectSupplierIds
      ).subscribe(data => {
        this.alertMessage("启用成功!");
      this.loadData();
      }, this.handleError);

    });
  }

  toggelStatu(total: Array<any>, selectedid: Array<any>, statu: string) {
    if (selectedid.length != 0) {
      total.forEach(value => {
        selectedid.forEach(value2 => {
          if (value2 == value.id) {
            value.statu = statu;
          }
        });
      });
    }
    else {
      this.error("请勾选要禁用的供应商");
    }
  }

  ChangeStatu(id: any, toggel: any) {
    this.selectSupplierIds.push(id);
    if (toggel) {
      this.confirm("确定启用？", () => {

        this.supplierService.supplierTurnOn(
          this.selectSupplierIds
        ).subscribe(data => {
          this.alertMessage("启用成功!");
          this.loadData();
        }, this.handleError);

      });
    }
    if (!toggel) {
      this.confirm("确定禁用？", () => {

        this.supplierService.supplierTurnDead(
          this.selectSupplierIds
        ).subscribe(data => {
          this.alertMessage("禁用成功!");
          this.loadData();
        }, this.handleError);

      });
    }
  }

  openBrowserSupplierModal(id: any) {
    var Index = 0;
    this.supplierInfo.forEach((value, index) => {
      if (value.id == id) {
        Index = index;
      }
    });
    const activeModal = this.ModalService.open(BrowerSupplierComponent, {size: 'sm',backdrop:'static'});
    activeModal.componentInstance.modalHeader = "查看供应商";
    activeModal.componentInstance.info = this.supplierInfo[Index];
  }

  openEditSupplierModal(id: any) {
    var Index = 0;
    this.supplierInfo.forEach((value, index) => {
      if (value.id == id) {
        Index = index;
      }
    });
    const activeModal = this.ModalService.open(EditSupplierComponent, {size: 'lg',backdrop:'static'});
    activeModal.componentInstance.modalHeader = "编辑供应商";
    activeModal.componentInstance.info = this.supplierInfo[Index];
    activeModal.componentInstance.id = id;
    activeModal.result.then(result => {
      if (result != null) {
        if (result.success == true) {
          this.alertMessage("保存成功");
          this.loadData();
        }
      }
    })
  }

  addSupplierModal() {
    const activeModal = this.ModalService.open(EditSupplierComponent, {size: 'lg',backdrop:'static'});
    activeModal.componentInstance.modalHeader = "添加供应商";
    activeModal.result.then(result => {
      if (result != null) {
        if (result.success == true) {
          this.alertMessage("保存成功");
          this.loadData();
        }
      }

    })
  }

  importSupplierModal() {
    const activeModal = this.ModalService.open(ImportSupplierComponent, {size: 'sm',backdrop:'static'});
    activeModal.componentInstance.modalHeader = "导入供应商";
    activeModal.componentInstance.text = "供应商信息";
    activeModal.result.then(result => {
      if (result != undefined) {
        console.log(result);
      }
    })
  }
}
