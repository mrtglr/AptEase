import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },

    {
      path: 'profile-management',
      loadChildren: () => import('./profile-management/profile-management.module')
        .then(m => m.ProfileManagementModule),
    },
    {
      path: 'bill-management',
      loadChildren: () => import('./bill-management/bill-management.module')
        .then(m => m.BillManagementModule),
    },
    {
      path: 'info-management',
      loadChildren: () => import('./info-management/info-management.module')
        .then(m => m.InfoManagementModule),
    },
    {
      path: 'chat',
      loadChildren: () => import('./chat/chat.module')
        .then(m => m.ChatModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
