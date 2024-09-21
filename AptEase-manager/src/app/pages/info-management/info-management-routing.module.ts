import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsListComponent } from './notification-list/notifications-list.component';
import { AnnouncementsComponent } from './announcements/announcements.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'announcement-list',
    pathMatch: 'full',
  },
  {
    path: 'announcement-list',
    component: AnnouncementsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoManagementRoutingModule { }

export const routedComponents = [
  NotificationsListComponent,
  AnnouncementsComponent
];
