import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/shared/user.service';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent {

  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(private router: Router, private service: UserService) { }

  loading = false;

  settings = {
    columns: {
      userName: {
        title: 'Username'
      },
      fullName: {
        title: 'Full Name'
      },
      email: {
        title: 'Email'
      },
      phoneNumber: {
        title: 'PhoneNumber'
      },
      userRole: {
        title: 'User Role',
        type: 'html',
        valuePrepareFunction: (status: any) => {
          return status ? `Admin` : `User`
        }
      },
    },
    actions: {
      columnTitle: 'Detay',
      add: false,
      edit: false,
      delete: false,
      position: 'left'
    },
  };

  data = [
    this.loading = true,
    this.service.getUsers().subscribe(
      res => {
        this.loading = false;
        this.data = res;
      },
      err => {
        this.loading = false;
        console.log(err);
      },
    )
  ];

  onUserRowSelect(event): void {
    this.router.navigateByUrl('pages/user-management/user-detail?user_id=' + event.data.id);
  }

  addNew() {
    this.router.navigateByUrl('pages/user-management/user-register');
  }
}
