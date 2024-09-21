import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../@core/helper/helper.service';
import { TransectionService } from '../../../@core/shared/transection.service';

@Component({
  selector: 'ngx-transection-list',
  templateUrl: './transection-list.component.html',
  styleUrls: ['./transection-list.component.scss']
})
export class TransectionListComponent {

  constructor(private service: TransectionService, private helper: HelperService) { }

  loading = false;

  settings = {
    columns: {
      username: {
        title: 'User Name',
        valuePrepareFunction: (cell, row) => {
          if (row.bill && row.bill.applicationUser)
            return row.bill.applicationUser.fullName;
        },
      },
      doorNumber: {
        title: 'Door Number',
        valuePrepareFunction: (cell, row) => {
          if (row.bill && row.bill.applicationUser)
            return row.bill.applicationUser.doorNumber;
        },
      },
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
      },
      dueDate: {
        title: 'Bill Due Date',
        valuePrepareFunction: (cell, row) => {
          if (row.bill)
            return this.helper.formatDate(row.bill.dueDate);
        },
      }
    },
    actions: {
      custom: [
        {
          name: 'approve',
          title: '<i class="nb-checkmark-circle"></i>',
        },
        {
          name: 'reject',
          title: '<i class="nb-close-circled"></i>',
        },
      ],
      columnTitle: '#',
      add: false,
      edit: false,
      delete: false,
      position: 'left'
    },
  };

  data = [
    this.loading = true,
    this.service.list().subscribe(
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

  approveTransection(data: any) {
    this.loading = true,
    this.service.approveTransection(data.id).subscribe(
      res => {
        this.loading = false;
        this.helper.toast('success', 'Transection approved', '');
        this.service.list().subscribe(
          res => {
            this.loading = false;
            this.data = res;
          },
          err => {
            this.loading = false;
            console.log(err);
          },
        )
      },
      err => {
        this.loading = false;
        console.log(err);
      },
    )
  }

  rejectTransection(data: any) {
    this.loading = true,
    this.service.rejectTransection(data.id).subscribe(
      res => {
        this.loading = false;
        this.helper.toast('success', 'Transection rejected', '');
        this.service.list().subscribe(
          res => {
            this.loading = false;
            this.data = res;
          },
          err => {
            this.loading = false;
            console.log(err);
          },
        )
      },
      err => {
        this.loading = false;
        console.log(err);
      },
    )
  }

  transectionOperations(event) {
    if (event.action === 'approve') {
      this.approveTransection(event.data);
    }
    else {
      this.rejectTransection(event.data);
    }
  }
}
