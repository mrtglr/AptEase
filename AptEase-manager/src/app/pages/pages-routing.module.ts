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
      path: 'user-management',
      loadChildren: () => import('./user-management/user-management.module')
        .then(m => m.UserManagementModule),
    },
    {
      path: 'bill-management',
      loadChildren: () => import('./bill-management/bill-management.module')
        .then(m => m.BillManagementModule),
    },
    {
      path: 'apartment-management',
      loadChildren: () => import('./apartment-management/apartment-management.module')
        .then(m => m.ApartmentManagementModule),
    },
    {
      path: 'info-management',
      loadChildren: () => import('./info-management/info-management.module')
        .then(m => m.InfoManagementModule),
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
