import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfoService } from '../../@core/shared/info.service';
import { UserService } from '../../@core/shared/user.service';
import { BillService } from '../../@core/shared/bill.service';
import { AnnouncementService } from '../../@core/shared/announcement.service';

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
    private announcementService: AnnouncementService,
    private userService: UserService,) { }

  ngOnInit(): void {
    let that = this;

    this.loading = true;
    setTimeout(() => {
      that.show = true;
      that.loading = false;
    }, 3000);

    this.billService.getBillAnalisys().subscribe(response => {
      this.billService.billAnalisys = response;
    });

    this.announcementService.getAnnouncements().subscribe(response => {
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
