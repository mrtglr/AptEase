import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsListComponent } from './notification-list/notifications-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'notification-list',
    pathMatch: 'full',
  },
  {
    path: 'notification-list',
    component: NotificationsListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoManagementRoutingModule { }

export const routedComponents = [
  NotificationsListComponent
];