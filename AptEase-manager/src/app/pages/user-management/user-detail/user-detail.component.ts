import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../../@core/helper/helper.service';
import { BillService } from '../../../@core/shared/bill.service';
import { UserService } from '../../../@core/shared/user.service';

@Component({
  selector: 'ngx-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {

  constructor(private router: Router, private service: UserService, private billService: BillService, private helper: HelperService) { }

  loading = false;
  user: any;

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    this.loading = true,
      this.service.getUser(this.helper.getUrlParameter('user_id'))
        .subscribe(
          res => {
            this.loading = false;
            this.user = res;
          },
          err => {
            this.loading = false;
            console.log(err);
          },
        )
  }

  settings = {
    columns: {
      billDescription: {
        title: 'Bill Description'
      },
      billAmount: {
        title: 'Bill Amount',
        valuePrepareFunction: (cell, row) => {
          return row.billAmount + ' ₺';
        },
      },
      createDate: {
        title: 'Create Date',
        valuePrepareFunction: (createDate: any) => {
          return this.helper.formatDate(createDate);
        }
      },
      isPaid: {
        title: 'Payment Status',
        type: 'html',
        valuePrepareFunction: (status: any) => {
          return status ? `Paid` : `Not paid`
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
    this.billService.getUserBills(this.helper.getUrlParameter('user_id')).subscribe(
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

  deleteUser() {
    if (confirm('This user and all connected data with this user including bills, transection and notifications will be deleted permanently!')) {
      this.service.removeUser(this.helper.getUrlParameter('user_id')).subscribe(
        res => {
          this.helper.toast('success', 'User Deleted', '');
          this.router.navigateByUrl('pages/user-management/user-list');
        },
        err => {
          this.helper.toast('danger', 'Fail', '');
          console.log(err);
        },
      );
    }
  }
}
