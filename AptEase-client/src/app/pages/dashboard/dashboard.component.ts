import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfoService } from '../../@core/shared/info.service';
import { UserService } from '../../@core/shared/user.service';
import { BillService } from '../../@core/shared/bill.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  announcements: any[] = [];
  users: any[] = [];
  show: boolean = false;
  loading = false;

  constructor(
    private billService: BillService,
    private infoService: InfoService,
    private userService: UserService,) { }

  ngOnInit(): void {
    let that = this;

    this.loading = true;
    setTimeout(() => {
      that.show = true;
      that.loading = false;
    }, 2000);

    this.billService.getBillsForUser().subscribe(response => {
      response.forEach(e => {
        if (!e.isPaid) {
          if (e.billDescription.includes('Due')) {
            this.billService.billAnalisys[0].value += e.originalBillAmount;
          }
          if (!e.billDescription.includes('Due')) {
            this.billService.billAnalisys[1].value += e.billAmount;
          }
          if (e.billDescription.includes('Due') && (e.billAmount - e.originalBillAmount > 0)) {
            this.billService.billAnalisys[2].value += e.billAmount - e.originalBillAmount;
          }
        }
      });
    });

    this.infoService.getAnnouncements().subscribe(response => {
      this.announcements = response;
    });

    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });
  }

  ngOnDestroy(): void {
    this.billService.billAnalisys.forEach((e: any) => {
      e.value = 0;
    });
  }
}
