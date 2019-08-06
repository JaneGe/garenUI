import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RootComponent} from "../../../../shared/component/root.component";
import {MemberDetailModel} from "../../../../shared/models/members/member.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RoleService} from "../../../../shared/services/role.service";
import {DepartmentService} from "../../../../shared/services/department.service";
import {DepartmentOptionModel} from "../../../../shared/models/departments/department.model";
import {RoleOptionModel} from "../../../../shared/models/roles/role.model";
import {MemberService} from "../../../../shared/services/member.service";
import {UserStatus} from "../../../../shared/models/members/member-list.model";
import swal from 'sweetalert2';
import {Select2OptionData} from "ng2-select2";
import {AccountLiteListModel} from "../../../../shared/models/channels/account-lite-list-model";

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss'],
  providers: [RoleService, DepartmentService, MemberService]
})
export class MemberModalComponent extends RootComponent implements OnInit {
  @Input()
  memberId?: number;
  @Input()
  modalHeader: string;

  form: FormGroup;
  memberInfo: MemberDetailModel = {id:1,userName:'',roles:[] ,workerNo:'',departmentId:1,passWord:'',roleId:1,warehouses:[],channels:[],phoneNumber:'',email:'',status:0,channelType:0};
  allDepartments: DepartmentOptionModel[] = [];
  userRoles: RoleOptionModel[] = [];
  // selectedRoleIds: number[] = [];
  selectedRoleId: number=0;
  Warehouse: any[]= [{id:'1',name:'东莞'},{id:'2',name:'深圳'},{id:'3',name:'海外'},{id:'4',name:'其他'}];
  selectedWarehouseIds: number[] = [];

  warehouseList: any[]= [];

  allChannels:AccountLiteListModel[] =[];
  plateformList=[{id:1,name:'Amazon'},{id:2,name:'SMT'}];
  selectedChannels: Select2OptionData[] = [];
  allDropChannels: Array<Select2OptionData>=[{id:'-1',text:'请选择'}];
  selectedChannelIds: string[] = [];

  allPurchase:AccountLiteListModel[] =[];
  selectedPurchase: Select2OptionData[] = [];
  allDropPurchase: Array<Select2OptionData>=[{id:'_Choice_',text:'请选择'},{id:'_All_',text:'全部'},{id:'1',text:'test1'},{id:'2',text:'test2'}];
  selectedPurchaseIds: string[] = [];

  selectedPlatform:number;

  submitted: boolean = false;

  constructor(private activeModal: NgbActiveModal,
              fb: FormBuilder,
              private roleService: RoleService,
              private memberService: MemberService,
              private departmentService: DepartmentService) {
    super();

    this.form = fb.group({
      'workerNo': ['',Validators.compose([Validators.required, Validators.maxLength(16)])],
      'userName': ['', Validators.compose([Validators.maxLength(16)])],
      'email': ['', Validators.compose([Validators.maxLength(32)])],
      "department": ['', Validators.compose([Validators.required])],
      "passWord": ['', Validators.compose([Validators.required])],
      "selectAccount": ['', Validators.compose([Validators.required])]
    });




    this.departmentService.getAllDepartmentOptionList().subscribe(data => {
      this.allDepartments = data.content;
      //console.log(this.allDepartments);

      if (this.memberId > 0) {
        this.memberService.getOneMember(this.memberId).subscribe(data => {
          const memberInfo = data.content;
          //console.log(memberInfo.roles);
          this.form.controls["workerNo"].setValue(memberInfo.workerNo);
          this.form.controls["userName"].setValue(memberInfo.userName);
          this.form.controls["email"].setValue(memberInfo.email);
          this.form.controls["department"].setValue(memberInfo.departmentId);
          for(let i=0;i<memberInfo.userInChannels.length;i++){
            let _tempData: Select2OptionData = {
              id:memberInfo.userInChannels[i].channelId,
              text:memberInfo.userInChannels[i].channelName
            };
            this.selectedChannels.push(_tempData);
            this.selectedChannelIds.push(memberInfo.userInChannels[i].channelId);
          }
          this.selectedPlatform=memberInfo.channelType;
          this.GetChannelAccount();
          if(memberInfo.roles.length>0){
            this.selectedRoleId=memberInfo.roles[0].id;
          }
          for(let i=0;i<memberInfo.userInWarehouses.length;i++){
            this.selectedWarehouseIds.push(memberInfo.userInWarehouses[i].warehouseId);
          }
          // this.selectedChannels=memberInfo.userInChannelIds;


          // for (const role of memberInfo.roles) {
          //   this.selectedRoleIds.push(role.id);
          // }
        });
      }
    });

    this.roleService.getAllRoleOptionList().subscribe(data => {
      this.userRoles = data.content;
    });

    this.getAllWarehouse();
  }

  //人员对应帐号
  cleanSelectChannels(el:any) {
    this.selectedChannelIds = [];
    this.selectedChannels = [];
    el.setElementValue('_Choice_');
  }
  deleteChannel(channelId) {
    console.log(channelId);
    let cIndex = this.selectedChannelIds.findIndex(m => m == channelId);
    console.log(cIndex);
    if (cIndex >= 0) {
      this.selectedChannelIds.splice(cIndex, 1);
      this.refreshDisplayChannels()
    }
  }

  getAllWarehouse(){
    this.Warehouse=[];
    this.departmentService.getAllWarehouse().subscribe(data => {

      for(let i=0;i<data.content.length;i++){
        let _tempData={
          id:data.content[i].warehouseId,
          name:data.content[i].name
        };
        // _tempData.id=data.content[i].id;
        // _tempData.text=data.content[i].displayName;
        this.Warehouse.push(_tempData);
      }
    });
  }

  onChannelChange(val,el:any) {
    el.setElementValue('_Choice_');
    const channelId = val.value;
    if(channelId == '-1'||channelId==null){
      return;
    }
      const cIndex = this.selectedChannelIds.findIndex(m => m == channelId);
      if (cIndex < 0) {
        this.selectedChannelIds.push(channelId);
        this.refreshDisplayChannels();
    }
  }
  refreshDisplayChannels() {
    if(this.selectedChannelIds!=null){
      this.selectedChannels = this.allDropChannels.filter(m =>
        this.selectedChannelIds.findIndex(x => x == m.id) >= 0);
    }
  }

//采购对应帐号
  cleanSelectPurchase(el:any) {
    this.selectedChannelIds = [];
    this.selectedPurchase = [];
    el.setElementValue('_Choice_');
  }
  deletePurchase(PurchaseId) {
    console.log(PurchaseId);
    let cIndex = this.selectedPurchaseIds.findIndex(m => m == PurchaseId);
    console.log(cIndex);
    if (cIndex >= 0) {
      this.selectedPurchaseIds.splice(cIndex, 1);
      this.refreshDisplayPurchase();
    }
  }
  onPurchaseChange(val,el:any) {
    el.setElementValue('_Choice_');
    const PurchaseId = val.value;
    if(PurchaseId == '_Choice_'){
      return;
    }
    if(PurchaseId == '_All_'){
      this.selectedPurchaseIds = [];
      let tempArr = [];
      for(let c of this.allPurchase){
        tempArr.push(c.channelId.toString());
      }
      this.selectedPurchaseIds = tempArr;
      this.refreshDisplayPurchase();
    }
    else{
      const cIndex = this.selectedPurchaseIds.findIndex(m => m == PurchaseId);
      if (cIndex < 0) {
        this.selectedPurchaseIds.push(PurchaseId);
        this.refreshDisplayPurchase();
        console.log(this.selectedPurchaseIds);
      }
    }
  }
  refreshDisplayPurchase() {
    if(this.selectedPurchaseIds!=null){
      this.selectedPurchase = this.allDropPurchase.filter(m =>
        this.selectedPurchaseIds.findIndex(x => x == m.id) >= 0);
    }
  }



  GetChannelAccount(){
    let datas={
      currentChannelType:this.selectedPlatform,
      ChannelIds:null
    };
    this.allDropChannels=[];
    this.departmentService.GetChannelAccount(datas).subscribe(data => {
      this.allDropChannels=[{id:'-1',text:'请选择'}];
      for(let i=0;i<data.content.length;i++){
        let _tempData: Select2OptionData = {
          id:data.content[i].id,
          text:data.content[i].displayName
        };
        // _tempData.id=data.content[i].id;
        // _tempData.text=data.content[i].displayName;
        this.allDropChannels.push(_tempData);
      }
    });
  }

  ngOnInit() {
    this.refreshDisplayChannels();
    this.refreshDisplayPurchase();
    if (this.memberId > 0) {
      this.form.removeControl('passWord');
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit(value) {
    this.submitted = true;
    console.info("save");
    console.info(value);


    this.memberInfo.departmentId = value.department;
    this.memberInfo.email = value.email;
    this.memberInfo.passWord = value.passWord;
    this.memberInfo.userName = value.userName;
    this.memberInfo.channelType=this.selectedPlatform;
   //this.memberInfo.warehouseIds=this.selectedWarehouseIds;

    for(let i=0;i<this.selectedWarehouseIds.length;i++){
     const selectW = this.Warehouse.find(f=>f.id==this.selectedWarehouseIds[i]);
     if(selectW) {
       const _warehouse = {
         WarehouseId: selectW.id,
         WarehouseName: selectW.name
       };
       this.memberInfo.warehouses.push(_warehouse);
     }
    }
    for(let i=0;i<this.selectedChannels.length;i++){

      const _channel = {
        ChannelId:this.selectedChannels[i].id,
        ChannelName:this.selectedChannels[i].text
      };
      this.memberInfo.channels.push(_channel);
    }
    this.memberInfo.roleId=this.selectedRoleId;
    this.memberInfo.workerNo = value.workerNo;


    if (this.memberId > 0) {
      this.memberInfo.id = this.memberId;
      this.memberService.updateMember(this.memberInfo).subscribe(data => {
        //this.alertMessage("保存成功");
        swal({
          title: '成功!',
          text: "保存成功",
          type: 'success',
          confirmButtonText: '关闭'
        })
        this.activeModal.close(1);
      }, error => {
        this.submitted = false;
        if (error.error) {
          //this.alertMessage(error.error.message);
          swal({
            title: '错误!',
            text: error.error.message,
            type: 'error',
            confirmButtonText: '关闭'
          })
        } else {
          //this.alertMessage("网络连接出错");
          swal({
            title: '错误!',
            text: "网络连接出错",
            type: 'error',
            confirmButtonText: '关闭'
          })
        }
      });

    } else {
      this.memberService.addMember(this.memberInfo).subscribe(data => {
        //this.alertMessage("保存成功");
        swal({
          title: '成功!',
          text: "保存成功",
          type: 'success',
          confirmButtonText: '关闭'
        })
        this.activeModal.close(1);
      }, error => {
        this.submitted = false;

        if (error.error) {
          //this.alertMessage(error.error.message);
          swal({
            title: '错误!',
            text: error.error.message,
            type: 'error',
            confirmButtonText: '关闭'
          })
        } else {
          //this.alertMessage("网络连接出错");
          swal({
            title: '错误!',
            text: "网络连接出错",
            type: 'error',
            confirmButtonText: '关闭'
          })
        }
      });
    }
  }

  isWarehouseChecked(id: number) {
    return this.selectedWarehouseIds.indexOf(id) >= 0;
  }

  onWarehouseCheckChanged(isChecked: boolean, roleId: number): void {
    if (isChecked) {
      const isExists = this.selectedWarehouseIds.indexOf(roleId) >= 0;
      if (!isExists) {
        this.selectedWarehouseIds.push(roleId);
      }
    } else {
      const dataIndex = this.selectedWarehouseIds.indexOf(roleId);
      if (dataIndex >= 0) {
        this.selectedWarehouseIds.splice(dataIndex, 1);
      }
    }
  }
}

