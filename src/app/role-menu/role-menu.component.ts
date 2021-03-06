import { Component, OnInit } from '@angular/core';
import {SimplifiedMenuAllocation} from '../entity';
import {UserRoleMenuService} from '../userRoleMenu.service';
declare var $: any;

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.css']
})
export class RoleMenuComponent implements OnInit {

  private roleMenus: any[];
  private roleMenu: any;
  private simRM: SimplifiedMenuAllocation;
  constructor(private roleMenuService: UserRoleMenuService) { }
  ngOnInit() {
    // console.log(this.roleMenuService.getUserRole());
    this.getUserRole();
    // this.popdiv = false; // 所有角色的div是否显示
  }
  getUserRole(): void {
    this.roleMenuService.getRoleMenu().subscribe(res =>  {this.roleMenus = res,
      this.roleMenu = this.roleMenus[0]; }
    );
    console.log(this.roleMenus);
  }
  // 点击某个用户的分配角色按钮
  updateUserRole(uMenu: any): void {
    this.roleMenu = uMenu;
    // this.popdiv = true; // 弹出角色分配框
  }
  // 改变复选框的勾选
  changeCheck(value: boolean, key: number) {
    this.roleMenu.menuAllocationStatusSet[key].allocated = value;
    console.log(this.roleMenu);
  }
  saveUserRole() {
    const arr = new Array(0);
    // 配置用户拥有的角色
    console.log(this.roleMenu.menuAllocationStatusSet);
    // tslint:disable-next-line:for in
    for (const i in this.roleMenu.menuAllocationStatusSet) {
      // tslint:disable-next-line:no-unused-expression
      if (this.roleMenu.menuAllocationStatusSet[i].allocated === true) {
        // alert(this.userRole.roleAllocationStatusSet[i].id);
        arr.push(this.roleMenu.menuAllocationStatusSet[i].menu.id);
      }
    }
    // @ts-ignore
    this.simRM = {roleId: this.roleMenu.role.id, menuIds: arr};
    // alert(this.simRM.menuIds.toString());
    this.roleMenuService.updateRoleMenu(this.simRM).subscribe(res => {
      alert(res.message); // 弹出后台给的消息
    });
  }

  delete(user: any): void {
    this.roleMenus = this.roleMenus.filter(h => h !== user);
    // this.userroleService.deleteUser(user).subscribe(res =>{
    //  alert(res.message); // 弹出后台给的消息
    // });
  }

  drag(): void {
    // @ts-ignore
    // $('#myModal').draggable();
  }
  filter(): void {
    // console.log($('#filterName').val());
    $('table tr').hide()
      .filter(':contains(\'' + ($('#filterName').val()) + '\')')
      .show();
    $('#doNotHide').show();
  }
}
