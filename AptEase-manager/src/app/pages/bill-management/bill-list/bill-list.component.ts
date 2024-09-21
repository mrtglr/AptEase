import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../../@core/helper/helper.service';
import { BillService } from '../../../@core/shared/bill.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-bill-list',
  templateUrl: './bill-list.component.html',
  styles: []
})
export class BillListComponent {

  constructor(private service: BillService, private router: Router, private helper: HelperService) { }

  loading = false;
  bill = {
    billDescription: '',
    billAmount: 0,
    isPaid: false,
    createDate: new Date(0),
    cutOffDate: new Date(0),
    dueDate: new Date(0),
  };

  settings = {
    columns: {
      billDescription: {
        title: 'Bill Description',
        filter: false,
      },
      billAmount: {
        title: 'Bill Amount',
        filter: false,
        valuePrepareFunction: (cell, row) => {
          return row.billAmount + ' ₺';
        },
      },
      username: {
        title: 'User Name',
        filter: false,
        valuePrepareFunction: (cell, row) => {
          if (row.applicationUser)
            return row.applicationUser.fullName;
        },
      },
      doorNumber: {
        title: 'Door Number',
        filter: false,
        valuePrepareFunction: (cell, row) => {
          if (row.applicationUser)
            return row.applicationUser.doorNumber;
        },
      },
      cutOffDate: {
        title: 'Cut-Off Date',
        filter: false,
        valuePrepareFunction: (cutOffDate: any) => {
          return this.helper.formatDate(cutOffDate);
        }
      },
      dueDate: {
        title: 'Due Date',
        filter: false,
        valuePrepareFunction: (dueDate: any) => {
          return this.helper.formatDate(dueDate);
        }
      },
      isPaid: {
        title: 'Payment Status',
        filter: false,
        type: 'html',
        valuePrepareFunction: (status: any) => {
          return status ? `Paid` : `Not paid`
        }
      },
      dateOfPaid: {
        title: 'Date of Paid',
        filter: false,
        valuePrepareFunction: (dateOfPaid: any) => {
          return this.helper.formatDate(dateOfPaid);
        }
      }
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: 'Delete',
      add: false,
      edit: false,
      delete: true,
      position: 'left'
    },
  };

  data = [
    this.loading = true,
    this.service.getBills().subscribe(
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

  onSubmit(form: NgForm) {
    this.loading = true;

    this.bill.billAmount = form.value.billAmount;
    this.bill.billDescription = form.value.billDescription;
    this.bill.dueDate = form.value.dueDate;

    this.service.addBillForUsers(this.bill).subscribe(
      res => {
        this.helper.toast('success', 'Bill Created', '');
        this.data = [
          this.loading = true,
          this.service.getBills().subscribe(
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
      },
      err => {
        this.helper.toast('danger', 'Fail', '');
        this.loading = false;
      }
    );
  }

  onDelete(event) {
    if (confirm('This bill and and its transection will be deleted permanently!')) {
      this.service.removeBill(event.data.id).subscribe(
        res => {
          this.helper.toast('success', 'Bill Deleted', '');
          this.data = [
            this.loading = true,
            this.service.getBills().subscribe(
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
        },
        err => {
          this.helper.toast('danger', 'Fail', '');
          this.loading = false;
        }
      );
    }
  }

}
