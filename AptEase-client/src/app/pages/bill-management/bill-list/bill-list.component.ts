import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../../@core/helper/helper.service';
import { BillService } from '../../../@core/shared/bill.service';
import { TransectionService } from '../../../@core/shared/transection.service';

@Component({
  selector: 'ngx-bill-list',
  templateUrl: './bill-list.component.html',
  styles: []
})
export class BillListComponent {

  constructor(private transectionService: TransectionService, private billService: BillService, private router: Router, private helper: HelperService) { }

  loading = false;
  transectionModel = {
    billId: 0
  }

  billTableSettings = {
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
      cutOffDate: {
        title: 'Cut-Off Date',
        valuePrepareFunction: (cutOffDate: any) => {
          return this.helper.formatDate(cutOffDate);
        }
      },
      dueDate: {
        title: 'Due Date',
        valuePrepareFunction: (dueDate: any) => {
          return this.helper.formatDate(dueDate);
        }
      },
      isPaid: {
        title: 'Payment Status',
        type: 'html',
        valuePrepareFunction: (status: any) => {
          return status ? `Paid` : `Not paid`
        }
      },
      dateOfPaid: {
        title: 'Date of Paid',
        valuePrepareFunction: (dateOfPaid: any) => {
          return this.helper.formatDate(dateOfPaid);
        }
      },
    },
    delete: {
      deleteButtonContent: '<i class="nb-arrow-thin-right"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: 'Send',
      add: false,
      edit: false,
      delete: true,
      position: 'left'
    },
  };

  billData = [
    this.loading = true,
    this.billService.getBillsForUser().subscribe(
      res => {
        this.loading = false;
        this.billData = res;
      },
      err => {
        this.loading = false;
        console.log(err);
      },
    )
  ];

  transectionTableSettings = {
    columns: {
      transectionStatusToString: {
        title: 'Transection Status',
      },
      transectionDate: {
        title: 'Transection Date',
        valuePrepareFunction: (transectionDate: any) => {
          return this.helper.formatDate(transectionDate);
        }
      },
      billDescription: {
        title: 'Bill Description',
        valuePrepareFunction: (cell, row) => {
          if (row.bill)
            return row.bill.billDescription;
        },
      },
      billAmount: {
        title: 'Bill Amount',
        valuePrepareFunction: (cell, row) => {
          if (row.bill)
            return row.bill.billAmount + ' ₺';
        },
      },
      cutOffDate: {
        title: 'Bill Cut-Off Date',
        valuePrepareFunction: (cell, row) => {
          if (row.bill)
            return this.helper.formatDate(row.bill.cutOffDate);
        },
      }
    },
    actions: {
      columnTitle: '#',
      add: false,
      edit: false,
      delete: false,
      position: 'left'
    },
  };

  transectiondata = [
    this.loading = true,
    this.transectionService.getUserTransections().subscribe(
      res => {
        this.loading = false;
        this.transectiondata = res;
      },
      err => {
        this.loading = false;
        console.log(err);
      },
    )
  ];

  sendToApproval(event): void {
    if (confirm('Please confirm!\nThis bill will send to admin approval \n(You must be done with bill payment to open a transection)'))
    this.loading = true;
    this.transectionModel.billId = event.data.id;
    this.transectionService.createTransection(this.transectionModel).subscribe(
      res => {
        if (res.toString() === '0') {
          this.loading = false;
          this.helper.toast('warning', 'Transection with the bill is already created', '');
        }
        else {
          this.loading = false;
          this.helper.toast('success', 'Bill send to approval', 'Transection created');
          this.transectionService.getUserTransections().subscribe(
            res => {
              this.loading = false;
              this.transectiondata = res;
            },
            err => {
              this.loading = false;
              console.log(err);
            }
          )
        }
      },
      err => {
        this.loading = false;
        console.log(err);
      },
    );
  }

}
