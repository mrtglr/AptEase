import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/shared/user.service';
import { BillService } from '../../../@core/shared/bill.service';
import { HttpClient } from '@angular/common/http';
import { NotificationsListComponent } from '../../../pages/info-management/notification-list/notifications-list.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  cutOffCheckInterval: any;
  billCreateInterval: any;

  billPaymentRule: any;
  cutOffDate: Date;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'dark';

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserService,
    private layoutService: LayoutService,
    private dialogService: NbDialogService,
    private router: Router,
    private billService: BillService) {
  }

  ngOnInit() {
    this.changeTheme('dark');

    let that = this;
    updateUserSession(that);
    setInterval(function () { updateUserSession(that); }, 30000);
    this.cutOffCheckInterval = setInterval(function () { getCutOffDate(that); }, 30000);
    this.billCreateInterval = setInterval(function () { CreateBillsGeneric(that); }, 1000);

    this.userService.getCurrentUser()
      .subscribe((users: any) => this.user = users);
  }

  ngOnDestroy() {
    clearInterval(this.cutOffCheckInterval);
    clearInterval(this.billCreateInterval);
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  openNotifications() {
    this.dialogService.open(NotificationsListComponent, {
      context: {
        title: 'Notifications',
      },
    });
  }

  logout() {
    this.router.navigateByUrl('/auth/logout');
  }
}

function updateUserSession(that: any) {
  that.userService.updateUserSession().subscribe(res => { });
}

function getCutOffDate(that: any) {
  that.billService.getBillPaymentRule().subscribe(
    res => {
      that.billPaymentRule = res;
      that.cutOffDate = new Date(that.billPaymentRule.cutOffDate);
      console.log(that.cutOffDate);
    },
    err => {
      console.log(err);
    },
  );
}

function CreateBillsGeneric(that: any) {

  let currentDate = new Date();
  if (that.cutOffDate) {
    if (currentDate.getMonth() + 1 === that.cutOffDate.getMonth() + 1
      && currentDate.getDate() === that.cutOffDate.getDate()
      && currentDate.getHours() === that.cutOffDate.getHours()
      && currentDate.getMinutes() === that.cutOffDate.getMinutes()
      && currentDate.getSeconds() === that.cutOffDate.getSeconds()) {

      const billGenericModel = {
        'billAmount': that.billPaymentRule.billAmount,
        'cutOffDate': new Date(that.billPaymentRule.cutOffDate),
        'dueDate': new Date(that.billPaymentRule.dueDate),
      };

      that.billService.createBillsGeneric(billGenericModel)
        .subscribe(
          res => {
            // toast and notifications...
          },
          err => {
            console.log(err);
          },);
    }
  }
}