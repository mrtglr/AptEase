import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../../@core/helper/helper.service';
import { InfoService } from '../../../@core/shared/info.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent {

  @Input() title: string;

  constructor(private service: InfoService, private router: Router, private helper: HelperService, protected ref: NbDialogRef<NotificationsListComponent>) { }

  loading = false;

  data = [
    this.loading = true,
    this.service.getNotifications().subscribe(
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

  dismiss () {
    this.ref.close();
  }

  redirectTo (route: any, notification: any) {
    this.setReaded(notification)
    this.router.navigateByUrl('/pages/' + route);
    this.dismiss();
  }

  setReaded (notification: any) {
    this.service.setNotificationReaded(notification).subscribe(
      res => {
      },
      err => {
        console.log(err);
      },
    )
  }
}
