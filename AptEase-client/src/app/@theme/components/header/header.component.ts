import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/shared/user.service';
import { NotificationsListComponent } from '../../../pages/info-management/notification-list/notifications-list.component';
import { ChatService } from '../../../@core/shared/chat.service';
import { HelperService } from '../../../@core/helper/helper.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
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

  currentTheme = 'default';

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserService,
    private layoutService: LayoutService,
    private dialogService: NbDialogService,
    private chatService: ChatService,
    private helper: HelperService,
    private router: Router,) {
  }

  ngOnInit() {
    this.changeTheme('default');

    let that = this;
    updateUserSession(that);
    setInterval(function () { updateUserSession(that); }, 30000);

    this.userService.getCurrentUser()
      .subscribe((users: any) => {
        this.user = users;
        localStorage.setItem('authorized_user',JSON.stringify(this.user));
      });

    this.chatService.retrieveMappedObject().subscribe( res => {this.sendMessageNotification()} );
  }

  ngOnDestroy() {
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

  openUserProfile() {
    this.router.navigateByUrl('/pages/profile-management/edit-user-profile');
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

  sendMessageNotification() {
    if (this.router.url !== '/pages/chat/public-chat') {
      this.helper.toast('info', 'You have new messages.', 'Apartment Chat', 'message-square-outline', true);
    }
  }
}

function updateUserSession(that: any) {
  that.userService.updateUserSession().subscribe(res => { });
}
